import torch
import librosa
import numpy as np
import os

from app.ml_models.crnn.model import CRNN
from app.ml_models.cnn_baseline.model import CNN  # adjust class name if needed

BASE_DIR = os.path.dirname(__file__)

CRNN_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "ml_models", "crnn", "cough_crnn_best.pth")
)

CNN_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "ml_models", "cnn_baseline", "cough_cnn_best.pth")
)

DEVICE = torch.device("cpu")
LABELS = ["HEALTHY", "ASTHMA", "PNEUMONIA"]

# ---------------- LOAD MODELS ONCE ----------------
crnn_model = CRNN().to(DEVICE)
crnn_model.load_state_dict(torch.load(CRNN_PATH, map_location=DEVICE))
crnn_model.eval()

cnn_model = CNN().to(DEVICE)
cnn_model.load_state_dict(torch.load(CNN_PATH, map_location=DEVICE))
cnn_model.eval()


class MLInferenceService:

    @staticmethod
    def preprocess(audio_path: str):
        y, sr = librosa.load(audio_path, sr=16000)

        mel = librosa.feature.melspectrogram(
            y=y,
            sr=sr,
            n_mels=128,
            n_fft=1024,
            hop_length=512
        )

        mel_db = librosa.power_to_db(mel, ref=np.max)
        mel_db = (mel_db - mel_db.mean()) / (mel_db.std() + 1e-6)

        return torch.tensor(mel_db).unsqueeze(0).unsqueeze(0).float()

    @staticmethod
    def _run_model(model, features):
        with torch.no_grad():
            logits = model(features)
            probs = torch.softmax(logits, dim=1)[0]
        return probs

    @staticmethod
    def predict(audio_path: str):
        features = MLInferenceService.preprocess(audio_path).to(DEVICE)

        # -------- RUN MODELS --------
        crnn_probs = MLInferenceService._run_model(crnn_model, features)
        cnn_probs  = MLInferenceService._run_model(cnn_model, features)

        # -------- ENSEMBLE --------
        final_probs = (
            0.80 * crnn_probs 
            + 0.20 * cnn_probs
        )

        pred_idx = final_probs.argmax().item()
        confidence = final_probs[pred_idx].item()
    
        # -------- RISK LOGIC --------
        if confidence >= 0.75:
            risk = "HIGH"
        elif confidence >= 0.45:
            risk = "MODERATE"
        else:
            risk = "LOW"

        return {
            "prediction": LABELS[pred_idx],
            "confidence": round(confidence, 4),
            "risk": risk,

            "probabilities": {
                LABELS[i]: round(final_probs[i].item(), 4)
                for i in range(len(LABELS))
            },

            # 🔍 optional but VERY useful
            "model_breakdown": {
                "crnn": {
                    LABELS[i]: round(crnn_probs[i].item(), 4)
                    for i in range(len(LABELS))
                },
                "cnn": {
                    LABELS[i]: round(cnn_probs[i].item(), 4)
                    for i in range(len(LABELS))
                }
            }
        }
