from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.services.ml_inference_service import MLInferenceService
from app.services.ml_service import MLService

router = APIRouter(prefix="/ml", tags=["ML"])


@router.post("/infer")
def run_inference(
    patient_id: str,
    audio_path: str,
    user=Depends(get_current_user)
):
    # 🔒 Role-based access
    if user["role"] not in ["INDIVIDUAL","ASHA_WORKER", "CLINICIAN"]:
        raise HTTPException(403, "Access denied")

    # 1️⃣ RUN MODEL INFERENCE
    inference = MLInferenceService.predict(audio_path)

    prediction = inference["prediction"]
    confidence = inference["confidence"]

    # 2️⃣ GENERATE REPORT (STORE IN DB)
    report = MLService.generate_report(
        patient_id=patient_id,
        prediction=prediction,
        confidence=confidence,
        user_id=user["_id"]   # ✅ CORRECT
    )

    # 3️⃣ RETURN COMBINED RESPONSE
    return {
        "prediction": prediction,
        "confidence": confidence,
        "risk": inference["risk"],
        "probabilities": inference["probabilities"],
        "report": report
    }
