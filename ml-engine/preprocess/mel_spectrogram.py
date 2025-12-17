# preprocess/mel_spectrogram.py

import numpy as np
import librosa

from utils.constants import SAMPLE_RATE, N_MELS, FFT_WINDOW, HOP_LENGTH


def extract_mel_spectrogram(audio: np.ndarray) -> np.ndarray:
    mel = librosa.feature.melspectrogram(
        y=audio,
        sr=SAMPLE_RATE,
        n_fft=FFT_WINDOW,
        hop_length=HOP_LENGTH,
        n_mels=N_MELS,
        power=2.0
    )
    mel_db = librosa.power_to_db(mel, ref=np.max)
    return mel_db


def normalize_mel(mel: np.ndarray) -> np.ndarray:
    """
    Mean-variance normalization (CNN friendly).
    """
    mean = np.mean(mel)
    std = np.std(mel) + 1e-6
    return (mel - mean) / std


def get_mel_spectrogram(audio: np.ndarray) -> np.ndarray:
    mel = extract_mel_spectrogram(audio)
    mel = normalize_mel(mel)
    return mel
