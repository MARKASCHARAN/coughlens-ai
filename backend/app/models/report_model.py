from app.config.database import report_collection
from datetime import datetime
import uuid

class ReportModel:

    @staticmethod
    def create_report(data: dict):
        report = {
            "_id": str(uuid.uuid4()),
            "patient_id": data["patient_id"],
            "prediction": data["prediction"],
            "confidence": data["confidence"],
            "created_by": data["created_by"],
            "created_at": datetime.utcnow(),

            # 🔐 IPFS state
            "ipfs_cid": None,
            "ipfs_status": "PENDING",  # PENDING | SUCCESS | FAILED
            "ipfs_error": None,
        }
        report_collection.insert_one(report)
        return report

    @staticmethod
    def update_ipfs(report_id: str, cid: str):
     report_collection.update_one(
        {"_id": report_id},
        {
            "$set": {
                "ipfs_cid": cid,
                "ipfs_status": "SUCCESS"
            }
        }
    )


    @staticmethod
    def fail_ipfs(report_id: str, error: str):
        report_collection.update_one(
            {"_id": report_id},
            {"$set": {
                "ipfs_status": "FAILED",
                "ipfs_error": error
            }}
        )

    @staticmethod
    def get_by_id(report_id: str):
        return report_collection.find_one({"_id": report_id})

    @staticmethod
    def get_by_patient(patient_id: str):
        return list(report_collection.find({"patient_id": patient_id}))

    @staticmethod
    def get_all():
        return list(report_collection.find({}))

    @staticmethod
    def get_by_patients(patient_ids: list):
        return list(
            report_collection.find({"patient_id": {"$in": patient_ids}})
        )

