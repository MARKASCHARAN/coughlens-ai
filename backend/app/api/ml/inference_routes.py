from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.services.ml_inference_service import MLInferenceService
from app.services.ml_service import MLService
from app.models.patient_model import PatientModel

router = APIRouter(prefix="/ml", tags=["ML"])


@router.post("/infer")
def run_inference(
    audio_path: str,
    patient_id: str = None,
    user=Depends(get_current_user)
):
    role = user["role"]

    # ============================
    # RESOLVE PATIENT (RBAC SAFE)
    # ============================

    if role == "INDIVIDUAL":
        # 🔒 Self-only
        patient = PatientModel.get_by_user(user["_id"])
        if not patient:
            raise HTTPException(400, "Patient profile not found")

        resolved_patient_id = patient["_id"]

    elif role == "ASHA_WORKER":
        if not patient_id:
            raise HTTPException(400, "patient_id required")

        patient = PatientModel.get_by_id(patient_id)
        if not patient:
            raise HTTPException(404, "Patient not found")

        if patient.get("assigned_asha") != user["_id"]:
            raise HTTPException(403, "Patient not assigned to this ASHA")

        resolved_patient_id = patient_id

    elif role == "CLINICIAN":
        if not patient_id:
            raise HTTPException(400, "patient_id required")

        patient = PatientModel.get_by_id(patient_id)
        if not patient:
            raise HTTPException(404, "Patient not found")

        resolved_patient_id = patient_id

    else:
        raise HTTPException(403, "Access denied")

    # ============================
    # RUN MODEL INFERENCE
    # ============================
    inference = MLInferenceService.predict(audio_path)

    # ============================
    # STORE REPORT
    # ============================
    report = MLService.generate_report(
        patient_id=resolved_patient_id,
        prediction=inference["prediction"],
        confidence=inference["confidence"],
        user_id=user["_id"]
    )

    # ============================
    # RESPONSE
    # ============================
    return {
        "prediction": inference["prediction"],
        "confidence": inference["confidence"],
        "risk": inference["risk"],
        "probabilities": inference["probabilities"],
        "report": report
    }