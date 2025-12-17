# preprocess/mfcc_extractor.py

import numpy as np
import librosa

from utils.constants import SAMPLE_RATE, N_MFCC, FFT_WINDOW, HOP_LENGTH


def extract_mfcc(audio: np.ndarray) -> np.ndarray:
    mfcc = librosa.feature.mfcc(
        y=audio,
        sr=SAMPLE_RATE,
        n_mfcc=N_MFCC,
        n_fft=FFT_WINDOW,
        hop_length=HOP_LENGTH
    )
    return mfcc


def normalize_mfcc(mfcc: np.ndarray) -> np.ndarray:
    mean = np.mean(mfcc, axis=1, keepdims=True)
    std = np.std(mfcc, axis=1, keepdims=True) + 1e-6
    return (mfcc - mean) / std


def get_mfcc(audio: np.ndarray) -> np.ndarray:
    mfcc = extract_mfcc(audio)
    mfcc = normalize_mfcc(mfcc)
    return mfcc
