from app.models.report_model import ReportModel
from app.services.pdf_service import PDFService
from app.services.ipfs_service import IPFSService

class MLService:

    @staticmethod
    def generate_report(patient_id: str, prediction: str, confidence: float):
        report = ReportModel.create_report({
            "patient_id": patient_id,
            "prediction": prediction,
            "confidence": confidence,
            "ipfs_cid": None
        })

        pdf_path = PDFService.generate_report_pdf(report)

        try:
            cid = IPFSService.upload_file(pdf_path)
            ReportModel.update_cid(report["_id"], cid)
            report["ipfs_cid"] = cid
        except Exception as e:
            # 🔥 DO NOT CRASH ML FLOW
            print("⚠️ IPFS upload failed:", str(e))

        return report
