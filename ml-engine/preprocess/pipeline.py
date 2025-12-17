import numpy as np

from utils.audio_utils import load_audio, pad_or_trim
from preprocess.audio_cleaner import clean_audio
from preprocess.mel_spectrogram import get_mel_spectrogram
from preprocess.mfcc_extractor import get_mfcc
from utils.constants import NUM_SAMPLES


def preprocess_audio(file_path: str):
    """
    Full preprocessing pipeline.
    Returns mel spectrogram (primary feature).
    """

    # 1️⃣ Load audio
    audio = load_audio(file_path)

    # 🔐 Absolute fallback (corrupt / missing files)
    if audio is None or len(audio) == 0:
        audio = np.zeros(NUM_SAMPLES, dtype=np.float32)

    # 2️⃣ Clean (silence + normalize)
    audio = clean_audio(audio)

    # 🔐 Safety after silence removal
    if audio is None or len(audio) == 0:
        audio = np.zeros(NUM_SAMPLES, dtype=np.float32)

    # 3️⃣ Enforce fixed length (5 seconds)
    audio = pad_or_trim(audio)

    # 4️⃣ Numerical safety
    if np.isnan(audio).any() or np.isinf(audio).any():
        audio = np.zeros(NUM_SAMPLES, dtype=np.float32)

    # 5️⃣ Feature extraction
    mel = get_mel_spectrogram(audio)

    # (Optional — keep for future CRNN / fusion)
    # mfcc = get_mfcc(audio)

    return mel
