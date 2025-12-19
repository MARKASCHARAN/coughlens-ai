from fastapi import APIRouter, Depends, HTTPException
from app.core.auth import get_current_user
from app.services.ml_service import MLService
from app.services.whatsapp_service import WhatsAppService
from app.models.report_model import ReportModel



router = APIRouter(prefix="/reports", tags=["Reports"])

@router.post("/generate")
def generate_report(
    patient_id: str,
    user=Depends(get_current_user)
):
    report = MLService.generate_report(
        patient_id=patient_id,
        prediction="POSSIBLE_ASTHMA",
        confidence=0.87
    )

    return {
        "report_id": report["_id"],
        "ipfs_cid": report["ipfs_cid"],
        "ipfs_url": f"https://gateway.pinata.cloud/ipfs/{report['ipfs_cid']}"
    }

@router.get("/patient/{patient_id}")
def get_patient_reports(
    patient_id: str,
    user=Depends(get_current_user)
):
    reports = ReportModel.get_by_patient(patient_id)
    if not reports:
        raise HTTPException(status_code=404, detail="No reports found")
    return reports

@router.post("/share/whatsapp")
def share_report_whatsapp(
    report_id: str,
    phone: str,
    user=Depends(get_current_user)
):
    report = ReportModel.get_by_id(report_id)

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

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
