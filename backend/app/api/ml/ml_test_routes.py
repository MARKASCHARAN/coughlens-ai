from fastapi import APIRouter
from app.services.ml_inference_service import MLInferenceService

router = APIRouter(prefix="/ml", tags=["ML"])

@router.post("/infer-test")
def infer_test(audio_path: str):
    return MLInferenceService.predict(audio_path)
