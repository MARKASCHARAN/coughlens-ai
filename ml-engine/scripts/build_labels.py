import os
import json
import pandas as pd

# =============================
# CONFIG
# =============================
COSWARA_ROOT = "data/raw/coswara"
COUGHVID_ROOT = "data/raw/coughvid"
ICBHI_ROOT = "data/raw/ICBHI"

OUTPUT_CSV = "data/processed/final_labels.csv"

rows = []

# =========================================================
# 1️⃣ ICBHI DATASET (HIGHEST PRIORITY)
# =========================================================
print("Processing ICBHI dataset...")

diagnosis_path = os.path.join(
    ICBHI_ROOT,
    "Respiratory_Sound_Database",
    "patient_diagnosis.csv"
)

diagnosis_df = pd.read_csv(
    diagnosis_path,
    names=["patient_id", "diagnosis"]
)

ICBHI_LABEL_MAP = {
    "Healthy": 0,
    "Asthma": 1,
    "COPD": 1,
    "Bronchiectasis": 1,
    "Bronchiolitis": 1,
    "URTI": 1,
    "LRTI": 2,
    "Pneumonia": 2
}

audio_dir = os.path.join(
    ICBHI_ROOT,
    "Respiratory_Sound_Database",
    "audio_and_txt_files"
)

for _, row in diagnosis_df.iterrows():
    try:
        pid = int(row.patient_id)
    except:
        continue

    diagnosis = str(row.diagnosis).strip()
    if diagnosis not in ICBHI_LABEL_MAP:
        continue

    label = ICBHI_LABEL_MAP[diagnosis]

    for file in os.listdir(audio_dir):
        if file.startswith(f"{pid}_") and file.endswith(".wav"):
            rows.append({
                "sample_id": file.replace(".wav", ""),
                "audio_path": os.path.join(audio_dir, file),
                "label": label,
                "source": "ICBHI",
                "patient_id": pid
            })

# =========================================================
# 2️⃣ COSWARA DATASET (ACTUAL STRUCTURE – FINAL FIX)
# =========================================================
print("Processing Coswara dataset...")

coswara_csv_dir = os.path.join(COSWARA_ROOT, "csvs")
coswara_audio_root = os.path.join(COSWARA_ROOT, "coswara_data")

for csv_file in os.listdir(coswara_csv_dir):
    if not csv_file.endswith(".csv"):
        continue

    csv_path = os.path.join(coswara_csv_dir, csv_file)
    df = pd.read_csv(csv_path)

    for _, row in df.iterrows():
        pid = str(row.get("id", "")).strip()
        if not pid:
            continue

        status = str(row.get("covid_status", "")).lower()
        asthma = str(row.get("asthma", "")).lower()

        # ===== LABEL LOGIC =====
        if "healthy" in status and asthma != "true":
            label = 0
        elif asthma == "true":
            label = 1
        elif "infected" in status or "positive" in status:
            label = 2
        else:
            continue

        # ===== SEARCH THROUGH DATE FOLDERS =====
        for date_dir in os.listdir(coswara_audio_root):
            date_path = os.path.join(coswara_audio_root, date_dir)
            if not os.path.isdir(date_path):
                continue

            patient_dir = os.path.join(date_path, pid)
            if not os.path.isdir(patient_dir):
                continue

            for fname in os.listdir(patient_dir):
                if fname.lower().startswith("cough") and fname.endswith(".wav"):
                    rows.append({
                        "sample_id": f"{pid}_{fname.replace('.wav','')}",
                        "audio_path": os.path.join(patient_dir, fname),
                        "label": label,
                        "source": "Coswara",
                        "patient_id": pid
                    })

# =========================================================
# 3️⃣ COUGHVID
# =========================================================
print("Processing CoughVid dataset...")

COUGHVID_WAV_DIR = "data/processed/coughvid_wav"

for file in os.listdir(COUGHVID_ROOT):
    if not file.endswith(".json"):
        continue

    json_path = os.path.join(COUGHVID_ROOT, file)

    with open(json_path) as f:
        meta = json.load(f)

    status = str(meta.get("status", "")).lower()
    resp = str(meta.get("respiratory_condition", "false")).lower()

    if status == "healthy" and resp != "true":
        label = 0
    elif resp == "true":
        label = 1
    elif status in ["infected", "covid_positive"]:
        label = 2
    else:
        continue

    sample_id = file.replace(".json", "")
    audio_path = os.path.join(COUGHVID_WAV_DIR, sample_id + ".wav")

    if not os.path.exists(audio_path):
        continue

    rows.append({
        "sample_id": sample_id,
        "audio_path": audio_path,
        "label": label,
        "source": "CoughVid",
        "patient_id": sample_id
    })

# =========================================================
# SAVE FINAL CSV
# =========================================================
final_df = pd.DataFrame(rows)
final_df.to_csv(OUTPUT_CSV, index=False)

print("\n✅ Final label file created:", OUTPUT_CSV)
print("\nLabel distribution:")
print(final_df["label"].value_counts())
print("\nSources:")
print(final_df["source"].value_counts())
