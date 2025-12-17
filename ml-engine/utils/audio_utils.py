# utils/audio_utils.py

import librosa
import numpy as np

from utils.constants import SAMPLE_RATE, NUM_SAMPLES


def load_audio(file_path: str) -> np.ndarray:
    """
    Load audio, resample to 16kHz, mono.
    """
    audio, _ = librosa.load(
        file_path,
        sr=SAMPLE_RATE,
        mono=True
    )
    return audio


def pad_or_trim(audio: np.ndarray) -> np.ndarray:
    """
    Force fixed length (5 seconds).
    """
    if len(audio) < NUM_SAMPLES:
        padding = NUM_SAMPLES - len(audio)
        audio = np.pad(audio, (0, padding), mode="constant")

    elif len(audio) > NUM_SAMPLES:
        start = (len(audio) - NUM_SAMPLES) // 2
        audio = audio[start:start + NUM_SAMPLES]

    return audio
