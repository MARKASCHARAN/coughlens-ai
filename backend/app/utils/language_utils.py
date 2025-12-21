LANGUAGE_KEYWORDS = {
    "en": ["english"],
    "hi": ["hindi", "हिंदी"],
    "te": ["telugu", "తెలుగు"]
}

def detect_language(spoken_text: str) -> str | None:
    text = spoken_text.lower()
    for lang, keywords in LANGUAGE_KEYWORDS.items():
        if any(word in text for word in keywords):
            return lang
    return None
