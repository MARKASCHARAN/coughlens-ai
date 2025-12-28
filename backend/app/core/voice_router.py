from app.services.voice_service import VoiceService

INTENT_HANDLER_MAP = {
    "HELP": VoiceService.help,
    "CHANGE_LANGUAGE": VoiceService.change_language,
    "START_COUGH_TEST": VoiceService.start_cough_test,
    "GET_MY_REPORTS": VoiceService.get_my_reports,
}
