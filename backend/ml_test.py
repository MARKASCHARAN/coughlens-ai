from app.services.ml_inference_service import run_inference

AUDIO_PATH = "./cough.wav"  # put a real wav here

result = run_inference(AUDIO_PATH)

print("ML OUTPUT:")
print(result)
