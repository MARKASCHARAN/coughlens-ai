from app.models.user_model import UserModel

class VoiceService:

    @staticmethod
    def help(user, payload=None):
        return {
            "speak": "You can start a cough test, view reports, or ask about asthma.",
            "action": "HELP"
        }

    @staticmethod
    def change_language(user, payload):
        language = payload.get("language", "en")
        UserModel.update_language(user["_id"], language)
        return {
            "speak": f"Language changed to {language}",
            "language": language,
            "action": "LANGUAGE_SET"
        }

    @staticmethod
    def start_cough_test(user, payload=None):
        return {
            "speak": "Please cough for ten seconds after the beep.",
            "action": "RECORD_COUGH"
        }

    @staticmethod
    def get_my_reports(user, payload=None):
        return {
            "speak": "Fetching your reports.",
            "action": "LIST_REPORTS"
        }
