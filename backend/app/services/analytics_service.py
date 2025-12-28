from app.models.report_model import ReportModel
from app.models.patient_model import PatientModel


class AnalyticsService:

    @staticmethod
    def individual_dashboard(user):
        patient = PatientModel.get_by_user(user["_id"])
        reports = ReportModel.get_by_patient(patient["_id"])

        return {
            "total_tests": len(reports),
            "high_risk": len([r for r in reports if r["prediction"] != "HEALTHY"]),
            "reports": reports  # 👈 Added this
        }

    @staticmethod
    def dashboard(user):
        if user["role"] == "CLINICIAN":
            reports = ReportModel.get_all()

        elif user["role"] == "ASHA_WORKER":
            patients = PatientModel.get_by_asha(user["_id"])
            patient_ids = [p["_id"] for p in patients]
            reports = ReportModel.get_by_patients(patient_ids)

        else:
            raise Exception("Invalid role")

        return {
            "total_tests": len(reports),
            "high_risk": len([r for r in reports if r["prediction"] != "HEALTHY"]),
        }
