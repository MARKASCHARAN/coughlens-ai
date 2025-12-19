from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.services.ml_service import MLService

router = APIRouter(prefix="/ml", tags=["ML"])

@router.post("/infer")
def run_inference(
    patient_id: str,
    audio_path: str,
    user=Depends(get_current_user)
):
    # ML mocked but flow is real
    prediction = "POSSIBLE_ASTHMA"
    confidence = 0.87

    report = MLService.generate_report(
        patient_id=patient_id,
        prediction=prediction,
        confidence=confidence
    )

    return {
        "prediction": prediction,
        "confidence": confidence,
        "report_id": report["_id"]
    }
