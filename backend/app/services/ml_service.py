from app.models.report_model import ReportModel
from app.services.pdf_service import PDFService
from app.services.ipfs_service import IPFSService


class MLService:

    @staticmethod
    def generate_report(
        patient_id: str,
        prediction: str,
        confidence: float,
        user_id: str
    ):
        report = ReportModel.create_report({
            "patient_id": patient_id,
            "prediction": prediction,
            "confidence": confidence,
            "created_by": user_id,
            "ipfs_status": "PENDING"
        })

        pdf_path = PDFService.generate_report_pdf(report)

        # 🔒 IPFS = BEST-EFFORT
        cid = IPFSService.upload_file(pdf_path)

        if cid:
            # ✅ REAL SUCCESS
            ReportModel.update_ipfs(report["_id"], cid)
            report["ipfs_cid"] = cid
            report["ipfs_status"] = "SUCCESS"
        else:
            # ❌ REAL FAILURE (NO LIES)
            ReportModel.fail_ipfs(report["_id"], "IPFS skipped or failed")
            report["ipfs_cid"] = None
            report["ipfs_status"] = "FAILED"

        return report
