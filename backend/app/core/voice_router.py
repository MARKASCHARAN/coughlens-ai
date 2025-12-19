from app.services.voice_service import VoiceService

INTENT_HANDLER_MAP = {
    "START_COUGH_TEST": VoiceService.start_cough_test,
    "ADD_PATIENT": VoiceService.add_patient,
    "CHANGE_LANGUAGE": VoiceService.change_language,
}
