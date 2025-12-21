from app.services.voice_prompts import VOICE_PROMPTS

class AwarenessService:

    @staticmethod
    def what_is_asthma(user=None, payload=None):
        lang = user.get("language", "en") if user else "en"

        return {
            "speak": VOICE_PROMPTS[lang]["WHAT_IS_ASTHMA"],
            "lang": lang,
            "action": "AWARENESS_ASTHMA"
        }

    @staticmethod
    def what_is_pneumonia(user=None, payload=None):
        lang = user.get("language", "en") if user else "en"

        return {
            "speak": VOICE_PROMPTS[lang]["WHAT_IS_PNEUMONIA"],
            "lang": lang,
            "action": "AWARENESS_PNEUMONIA"
        }

    @staticmethod
    def prevention_tips(user=None, payload=None):
        lang = user.get("language", "en") if user else "en"

        return {
            "speak": VOICE_PROMPTS[lang]["PREVENTION_TIPS"],
            "lang": lang,
            "action": "AWARENESS_PREVENTION"
        }

    @staticmethod
    def when_to_see_doctor(user=None, payload=None):
        lang = user.get("language", "en") if user else "en"

        return {
            "speak": VOICE_PROMPTS[lang]["WHEN_TO_SEE_DOCTOR"],
            "lang": lang,
            "action": "AWARENESS_DOCTOR"
        }
