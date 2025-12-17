import torch
import pandas as pd
import numpy as np

from preprocess.pipeline import preprocess_audio
from models.cnn_baseline.model import CoughCNN

# -------------------------
# CONFIG
# -------------------------
CSV_PATH = "data/processed/final_labels.csv"
MODEL_PATH = "models/cnn_baseline/cough_cnn_best.pth"

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

LABELS = {0: "Healthy", 1: "Asthma", 2: "Pneumonia"}

# -------------------------
# LOAD MODEL
# -------------------------
model = CoughCNN().to(DEVICE)
model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
model.eval()

# -------------------------
# PICK SAMPLE (CHANGE LABEL HERE)
# -------------------------
df = pd.read_csv(CSV_PATH)

# 0 = Healthy | 1 = Asthma | 2 = Pneumonia
row = df[df["label"] == 1].sample(1).iloc[0]   # ← change here

true_label = LABELS[row["label"]]
audio_path = row["audio_path"]

# -------------------------
# PREPROCESS
# -------------------------
features = preprocess_audio(audio_path)

if isinstance(features, dict):
    mel = features["mel"]
else:
    mel = features

mel = torch.tensor(mel, dtype=torch.float32)
mel = mel.unsqueeze(0).unsqueeze(0).to(DEVICE)

# -------------------------
# INFERENCE
# -------------------------
with torch.no_grad():
    logits = model(mel)
    probs = torch.softmax(logits, dim=1)[0].cpu().numpy()

pred_label = LABELS[int(np.argmax(probs))]

# -------------------------
# OUTPUT
# -------------------------
print(f"\nTrue Label : {true_label}")
print(f"Predicted  : {pred_label}")
print(f"Confidence : {probs}")
