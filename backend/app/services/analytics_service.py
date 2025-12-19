from app.models.patient_model import PatientModel
from app.models.report_model import ReportModel

class AnalyticsService:

    @staticmethod
    def clinician_dashboard(user_id: str):
        patients = PatientModel.get_by_creator(user_id)
        reports = ReportModel.get_recent()

        return {
            "total_patients": len(patients),
            "recent_reports": reports
        }
