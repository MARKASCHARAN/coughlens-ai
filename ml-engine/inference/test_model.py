import torch
import pandas as pd
from preprocess.pipeline import preprocess_audio
from models.crnn.model import CoughCRNN

# -------------------------
# CONFIG
# -------------------------
MODEL_PATH = "models/crnn/cough_crnn_best.pth"
CSV_PATH = "data/processed/final_labels.csv"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

labels = ["Healthy", "Asthma", "Pneumonia"]

# -------------------------
# LOAD MODEL
# -------------------------
model = CoughCRNN().to(DEVICE)
model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
model.eval()

# -------------------------
# LOAD SAMPLE
# -------------------------
df = pd.read_csv(CSV_PATH)
row = df[df["label"] == 2].sample(1).iloc[0]  # 2 = Pneumonia


mel = preprocess_audio(row["audio_path"])

# ---- ENSURE TENSOR + SHAPE ----
if not isinstance(mel, torch.Tensor):
    mel = torch.from_numpy(mel)

# Expected shape: (B, C, MELS, TIME)
mel = mel.unsqueeze(0).unsqueeze(0).float().to(DEVICE)

# -------------------------
# INFERENCE
# -------------------------
with torch.no_grad():
    logits = model(mel)
    probs = torch.softmax(logits, dim=1)[0].cpu().numpy()

print("True Label :", labels[int(row["label"])])
print("Predicted  :", labels[probs.argmax()])
print("Confidence :", probs)
