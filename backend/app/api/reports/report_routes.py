from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.core.permissions import check_ownership, require_role
from app.services.whatsapp_service import WhatsAppService
from app.models.report_model import ReportModel

router = APIRouter(prefix="/reports", tags=["Reports"])


# =========================
# ❌ GENERATE REPORT (DISABLED FOR INDIVIDUAL)
# =========================
@router.post("/generate")
def generate_report(
    patient_id: str,
    user=Depends(get_current_user)
):
    # 🔒 INDIVIDUAL must use /ml/infer
    if user["role"] == "INDIVIDUAL":
        raise HTTPException(
            status_code=403,
            detail="INDIVIDUAL must use /ml/infer to generate reports"
        )

    require_role("ASHA_WORKER", "CLINICIAN")(user)

    raise HTTPException(
        status_code=410,
        detail="Manual report generation is deprecated"
    )


# =========================
# GET PATIENT REPORTS
# =========================
@router.get("/patient/{patient_id}")
def get_patient_reports(
    patient_id: str,
    user=Depends(get_current_user)
):
    reports = ReportModel.get_by_patient(patient_id)

    if not reports:
        raise HTTPException(status_code=404, detail="No reports found")

    # 🔐 Ownership enforcement
    if user["role"] != "CLINICIAN":
        for report in reports:
            check_ownership(report["created_by"], user["_id"])

    return reports


# =========================
# SHARE REPORT VIA WHATSAPP
# =========================
@router.post("/share/whatsapp")
def share_report_whatsapp(
    report_id: str,
    phone: str,
    user=Depends(get_current_user)
):
    require_role("INDIVIDUAL", "ASHA_WORKER")(user)

    report = ReportModel.get_by_id(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    check_ownership(report["created_by"], user["_id"])

    ipfs_url = (
        f"https://gateway.pinata.cloud/ipfs/{report['ipfs_cid']}"
        if report.get("ipfs_cid")
        else "Your report is ready. IPFS upload is pending."
    )

    sid = WhatsAppService().send_message(phone, ipfs_url)

    return {
        "status": "SENT",
        "whatsapp_sid": sid
    }


# =========================
# GET SINGLE REPORT
# =========================
@router.get("/{report_id}")
def get_report_by_id(
    report_id: str,
    user=Depends(get_current_user)
):
    report = ReportModel.get_by_id(report_id)
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    # 🔐 Access Control
    if user["role"] != "CLINICIAN":
        # Allow if user created it (Individual self-test or ASHA)
        # OR if user is the patient (if we stored patient_user_id?) - Assuming created_by covers self-test
        check_ownership(report["created_by"], user["_id"])

    return report
