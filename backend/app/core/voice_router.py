from app.services.voice_service import VoiceService
from app.services.analytics_service import AnalyticsService
from app.services.awareness_service import AwarenessService

INTENT_HANDLER_MAP = {

    # ======================
    # SYSTEM
    # ======================
    "HELP": VoiceService.help,
    "CHANGE_LANGUAGE": VoiceService.change_language,
    "STOP": VoiceService.stop,
    "REPEAT_LAST": VoiceService.repeat_last,

    # ======================
    # PATIENT
    # ======================
    "ADD_PATIENT": VoiceService.add_patient,

    # ======================
    # COUGH / ML
    # ======================
    "START_COUGH_TEST": VoiceService.start_cough_test,

    # ======================
    # REPORTS
    # ======================
    "GENERATE_REPORT": VoiceService.generate_report,
    "GET_MY_REPORTS": VoiceService.get_my_reports,

    # ======================
    # SHARING
    # ======================
    "SEND_REPORT_WHATSAPP": VoiceService.send_report_whatsapp,

    # ======================
    # ANALYTICS (CLINICIAN)
    # ======================
    "GET_ANALYTICS_DASHBOARD": AnalyticsService.dashboard,

    # ======================
    # AWARENESS
    # ======================
    "WHAT_IS_ASTHMA": AwarenessService.what_is_asthma,
    "WHAT_IS_PNEUMONIA": AwarenessService.what_is_pneumonia,
}
