# preprocess/audio_cleaner.py

import numpy as np
import librosa
from utils.constants import NUM_SAMPLES


def remove_silence(audio: np.ndarray, top_db: int = 25) -> np.ndarray:
    """
    Remove leading and trailing silence.
    """
    audio, _ = librosa.effects.trim(
        audio,
        top_db=top_db
    )
    return audio


def normalize_audio(audio: np.ndarray) -> np.ndarray:
    # Handle empty audio
    if audio is None or len(audio) == 0:
        return audio

    max_val = np.max(np.abs(audio))

    # Avoid division by zero
    if max_val < 1e-6:
        return audio

    return audio / max_val

def clean_audio(audio: np.ndarray) -> np.ndarray:
    audio = remove_silence(audio)

    # 🔐 CRITICAL SAFETY NET
    if audio is None or len(audio) == 0:
        audio = np.zeros(NUM_SAMPLES, dtype=np.float32)

    audio = normalize_audio(audio)
    return audio