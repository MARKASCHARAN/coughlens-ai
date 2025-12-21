class VoiceService:

    # ------------------
    # SYSTEM
    # ------------------
    @staticmethod
    def help(user, payload=None):
        return {
            "speak": "You can start a cough test, add a patient, get reports, or ask about asthma.",
            "action": "HELP"
        }

    @staticmethod
    def stop(user, payload=None):
        return {
            "speak": "Okay, stopping. What would you like to do next?",
            "action": "STOP"
        }

    @staticmethod
    def repeat_last(user, payload=None):
        return {
            "speak": "Repeating the last message.",
            "action": "REPEAT"
        }

    @staticmethod
    def change_language(user, payload):
        language = payload.get("language", "en")
        return {
            "speak": f"Language changed to {language}",
            "language": language,
            "action": "LANGUAGE_SET"
        }

    # ------------------
    # PATIENT
    # ------------------
    @staticmethod
    def add_patient(user, payload):
        return {
            "speak": "Patient details saved successfully.",
            "action": "PATIENT_CREATED"
        }

    # ------------------
    # COUGH TEST
    # ------------------
    @staticmethod
    def start_cough_test(user, payload=None):
        return {
            "speak": "Please cough for ten seconds after the beep.",
            "action": "RECORD_COUGH"
        }

    # ------------------
    # REPORTS
    # ------------------
    @staticmethod
    def generate_report(user, payload=None):
        return {
            "speak": "Your report is being generated.",
            "action": "REPORT_GENERATING"
        }

    @staticmethod
    def get_my_reports(user, payload=None):
        return {
            "speak": "Fetching your previous reports.",
            "action": "LIST_REPORTS"
        }

    # ------------------
    # SHARING
    # ------------------
    @staticmethod
    def send_report_whatsapp(user, payload):
        phone = payload.get("phone")
        return {
            "speak": f"Report sent to WhatsApp number {phone}",
            "action": "WHATSAPP_SENT"
        }
