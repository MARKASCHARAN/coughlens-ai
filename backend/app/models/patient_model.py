from app.config.database import patient_collection
from datetime import datetime
import uuid


class PatientModel:

    # =====================================
    # CREATE AUTO PATIENT (INDIVIDUAL)
    # =====================================
    @staticmethod
    def create_self_patient(user_id: str):
        patient = {
            "_id": str(uuid.uuid4()),

            # LINK TO USER
            "user_id": user_id,          # 🔗 INDIVIDUAL only
            "name": None,
            "age": None,
            "gender": None,

            # OWNERSHIP
            "created_by": "SELF",

            # ASSIGNMENTS
            "assigned_asha": None,
            "assigned_clinician": None,

            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        patient_collection.insert_one(patient)
        return patient


    # =====================================
    # CREATE MANAGED PATIENT (ASHA / CLINICIAN)
    # =====================================
    @staticmethod
    def create_managed_patient(
        data: dict,
        created_by_role: str,
        asha_id: str = None,
        clinician_id: str = None
    ):
        patient = {
            "_id": str(uuid.uuid4()),

            "user_id": None,   # 🚫 not a platform user
            "name": data.get("name"),
            "age": data.get("age"),
            "gender": data.get("gender"),

            "created_by": created_by_role,  # ASHA | CLINICIAN

            "assigned_asha": asha_id,
            "assigned_clinician": clinician_id,

            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        patient_collection.insert_one(patient)
        return patient


    # =====================================
    # GETTERS (FOR RBAC & ANALYTICS)
    # =====================================
    @staticmethod
    def get_by_id(patient_id: str):
        return patient_collection.find_one({"_id": patient_id})

    @staticmethod
    def get_by_user(user_id: str):
        return patient_collection.find_one({
            "user_id": user_id,
            "created_by": "SELF"
        })

    @staticmethod
    def get_by_asha(asha_id: str):
        return list(patient_collection.find({
            "assigned_asha": asha_id
        }))

    @staticmethod
    def get_by_clinician(clinician_id: str):
        return list(patient_collection.find({
            "assigned_clinician": clinician_id
        }))
