# utils/constants.py

# =========================
# AUDIO CONFIGURATION
# =========================

SAMPLE_RATE = 16000          # 16 kHz
AUDIO_DURATION = 5           # seconds
NUM_SAMPLES = SAMPLE_RATE * AUDIO_DURATION

# =========================
# FEATURE EXTRACTION
# =========================

N_MELS = 128
N_MFCC = 40
FFT_WINDOW = 2048
HOP_LENGTH = 512

# =========================
# CLASS LABELS
# =========================

LABEL_MAP = {
    "healthy": 0,
    "asthma": 1,
    "pneumonia": 2
}

REVERSE_LABEL_MAP = {
    0: "Healthy",
    1: "Asthma",
    2: "Pneumonia"
}

# =========================
# DATASETS
# =========================

DATASETS = ["coughvid", "coswara", "icbhi"]
