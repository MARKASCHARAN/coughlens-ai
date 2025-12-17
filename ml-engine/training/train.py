import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd
import numpy as np

from torch.utils.data import DataLoader, Subset
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, classification_report, f1_score

from training.dataset import CoughDataset
from models.crnn.model import CoughCRNN


# -------------------------
# CONFIG
# -------------------------
CSV_PATH = "data/processed/final_labels.csv"
BATCH_SIZE = 16
EPOCHS = 15
LR = 3e-4

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


# -------------------------
# CLASS WEIGHTS
# -------------------------
def compute_class_weights(csv_path):
    df = pd.read_csv(csv_path)
    counts = df["label"].value_counts().sort_index()

    weights = 1.0 / counts
    weights = weights / weights.sum()

    return torch.tensor(weights.values, dtype=torch.float32)


# -------------------------
# DATASET + STRATIFIED SPLIT
# -------------------------
dataset = CoughDataset(CSV_PATH)
df = pd.read_csv(CSV_PATH)

indices = np.arange(len(df))

train_idx, val_idx = train_test_split(
    indices,
    test_size=0.2,
    stratify=df["label"],
    random_state=42
)

train_ds = Subset(dataset, train_idx)
val_ds = Subset(dataset, val_idx)

train_loader = DataLoader(
    train_ds,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=0
)

val_loader = DataLoader(
    val_ds,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0
)


# -------------------------
# MODEL
# -------------------------
model = CoughCRNN().to(DEVICE)

class_weights = compute_class_weights(CSV_PATH).to(DEVICE)
criterion = nn.CrossEntropyLoss(weight=class_weights)

optimizer = optim.Adam(model.parameters(), lr=LR)


# -------------------------
# TRAINING LOOP
# -------------------------
best_macro_f1 = 0.0

for epoch in range(EPOCHS):
    # ---- TRAIN ----
    model.train()
    running_loss = 0.0

    for x, y in train_loader:
        x, y = x.to(DEVICE), y.to(DEVICE)

        optimizer.zero_grad()
        outputs = model(x)
        loss = criterion(outputs, y)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    train_loss = running_loss / len(train_loader)

    # ---- VALIDATION ----
    model.eval()
    correct = total = 0
    all_preds, all_labels = [], []

    with torch.no_grad():
        for x, y in val_loader:
            x, y = x.to(DEVICE), y.to(DEVICE)
            outputs = model(x)
            preds = outputs.argmax(1)

            correct += (preds == y).sum().item()
            total += y.size(0)

            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(y.cpu().numpy())

    val_acc = 100 * correct / total
    macro_f1 = f1_score(all_labels, all_preds, average="macro")

    print(f"\nEpoch {epoch+1}/{EPOCHS}")
    print(f"Train Loss: {train_loss:.4f}")
    print(f"Val Accuracy: {val_acc:.2f}%")
    print(f"Macro F1: {macro_f1:.4f}")
    print("Confusion Matrix:")
    print(confusion_matrix(all_labels, all_preds))
    print(
        classification_report(
            all_labels,
            all_preds,
            target_names=["Healthy", "Asthma", "Pneumonia"],
            digits=4
        )
    )

    # ---- SAVE BEST MODEL ----
    if macro_f1 > best_macro_f1:
        best_macro_f1 = macro_f1
        torch.save(
            model.state_dict(),
            "models/crnn/cough_crnn_best.pth"
        )
        print(f"✅ Best model updated (Macro F1 = {best_macro_f1:.4f})")


print("\n🏁 Training complete")
print(f"🏆 Best Macro F1 achieved: {best_macro_f1:.4f}")
