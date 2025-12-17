import os
import subprocess
from pathlib import Path

RAW_DIR = "data/raw/COUGHVID"
OUT_DIR = "data/processed/coughvid_wav"

os.makedirs(OUT_DIR, exist_ok=True)

SUPPORTED_EXTS = [".webm", ".ogg"]

def convert_to_wav(input_path, output_path):
    cmd = [
        "ffmpeg",
        "-y",
        "-i", input_path,
        "-ac", "1",        # mono
        "-ar", "16000",    # 16 kHz
        output_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

count = 0

for file in os.listdir(RAW_DIR):
    ext = Path(file).suffix.lower()
    if ext not in SUPPORTED_EXTS:
        continue

    input_path = os.path.join(RAW_DIR, file)
    output_name = Path(file).stem + ".wav"
    output_path = os.path.join(OUT_DIR, output_name)

    if os.path.exists(output_path):
        continue

    convert_to_wav(input_path, output_path)
    count += 1

print(f"✅ Converted {count} COUGHVID files to WAV")
    