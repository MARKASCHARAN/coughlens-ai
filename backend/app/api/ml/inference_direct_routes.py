from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.core.security import get_current_user
from app.services.ml_inference_service import MLInferenceService
from app.services.ml_service import MLService
from app.models.patient_model import PatientModel
import uuid
import os

router = APIRouter(prefix="/ml", tags=["ML"])


@router.post("/infer/direct")
def run_inference_direct(
    file: UploadFile = File(...),
    patient_id: str | None = None,
    user=Depends(get_current_user)
):
    # =========================
    # 1️⃣ ROLE VALIDATION
    # =========================
    if user["role"] not in ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"]:
        raise HTTPException(403, "Access denied")

    if user["role"] in ["ASHA_WORKER", "CLINICIAN"] and not patient_id:
        raise HTTPException(400, "patient_id required for this role")

    # =========================
    # 2️⃣ RESOLVE PATIENT
    # =========================
    if user["role"] == "INDIVIDUAL":
        patient = PatientModel.get_by_user(user["_id"])
        if not patient:
            raise HTTPException(404, "Patient not found for user")
        patient_id = patient["_id"]
    else:
        patient = PatientModel.get_by_id(patient_id)
        if not patient:
            raise HTTPException(404, "Patient not found")

    # =========================
    # 3️⃣ SAVE TEMP AUDIO
    # =========================
    temp_path = f"/tmp/infer_{uuid.uuid4()}_{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(file.file.read())

    try:
        # =========================
        # 4️⃣ RUN ML
        # =========================
        inference = MLInferenceService.predict(temp_path)

        # =========================
        # 5️⃣ CREATE REPORT
        # =========================
        report = MLService.generate_report(
            patient_id=patient_id,
            prediction=inference["prediction"],
            confidence=inference["confidence"],
            user_id=user["_id"]
        )

        return {
            "prediction": inference["prediction"],
            "confidence": inference["confidence"],
            "risk": inference["risk"],
            "probabilities": inference["probabilities"],
            "report": report
        }

    finally:
        # =========================
        # 6️⃣ CLEANUP
        # =========================
        if os.path.exists(temp_path):
            os.remove(temp_path)
