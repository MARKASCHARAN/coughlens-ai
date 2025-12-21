from fastapi import APIRouter, Depends, HTTPException
from app.core.auth import get_current_user
from app.core.permissions import check_ownership, require_role
from app.services.ml_service import MLService
from app.services.whatsapp_service import WhatsAppService
from app.models.report_model import ReportModel

router = APIRouter(prefix="/reports", tags=["Reports"])


# =========================
# Generate Report
# =========================
@router.post("/generate")
def generate_report(
    patient_id: str,
    user=Depends(get_current_user)
):
    require_role("INDIVIDUAL", "ASHA_WORKER")(user)  # 🔒 FIXED

    report = MLService.generate_report(
        patient_id=patient_id,
        prediction="POSSIBLE_ASTHMA",
        confidence=0.87,
        user_id=user["id"]
    )

    return {
        "report_id": report["_id"],
        "ipfs_cid": report.get("ipfs_cid"),
        "ipfs_url": (
            f"https://gateway.pinata.cloud/ipfs/{report['ipfs_cid']}"
            if report.get("ipfs_cid")
            else None
        ),
        "ipfs_status": report.get("ipfs_status", "PENDING")
    }


# =========================
# Get Patient Reports
# =========================
@router.get("/patient/{patient_id}")
def get_patient_reports(
    patient_id: str,
    user=Depends(get_current_user)
):
    reports = ReportModel.get_by_patient(patient_id)

    if not reports:
        raise HTTPException(status_code=404, detail="No reports found")

    if user["role"] != "CLINICIAN":
        for report in reports:
            check_ownership(report["created_by"], user["id"])

    return reports


# =========================
# Share Report via WhatsApp
# =========================
@router.post("/share/whatsapp")
def share_report_whatsapp(
    report_id: str,
    phone: str,
    user=Depends(get_current_user)
):
    require_role("INDIVIDUAL", "ASHA_WORKER")(user)  # 🔒 FIXED

    report = ReportModel.get_by_id(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    check_ownership(report["created_by"], user["id"])

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
