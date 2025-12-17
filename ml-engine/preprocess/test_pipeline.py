# preprocess/test_pipeline.py

from preprocess.pipeline import preprocess_audio

SAMPLES = {
    "healthy": "data/samples/healthy.wav",
    "asthma": "data/samples/asthma.wav",
    "pneumonia": "data/samples/pneumonia.wav"
}

for label, path in SAMPLES.items():
    features = preprocess_audio(path)
    
    mel = features["mel"]
    mfcc = features["mfcc"]

    print(f"\n[{label.upper()}]")
    print("Mel shape :", mel.shape)
    print("MFCC shape:", mfcc.shape)
