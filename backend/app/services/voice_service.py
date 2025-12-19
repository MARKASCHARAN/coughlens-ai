from app.models.patient_model import PatientModel

class VoiceService:

    @staticmethod
    def start_cough_test(user, payload):
        return {
            "next_step": "RECORD_COUGH",
            "instruction": "Please record your cough for 10 seconds"
        }

    @staticmethod
    def add_patient(user, payload):
        patient = PatientModel.create_patient(
            data=payload,
            created_by=user.id
        )
        return {
            "status": "PATIENT_CREATED",
            "patient_id": patient["_id"]
        }

    @staticmethod
    def change_language(user, payload):
        language = payload.get("language", "en")
        return {
            "language": language,
            "message": f"Language changed to {language}"
        }
