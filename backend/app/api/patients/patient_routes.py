from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.core.permissions import require_role
from app.models.patient_model import PatientModel

router = APIRouter(prefix="/patients", tags=["Patients"])


# =========================
# CREATE PATIENT
# =========================
@router.post("")
def create_patient(
    name: str,
    age: int,
    gender: str,
    user=Depends(get_current_user)
):
    # Only ASHA or CLINICIAN can create patients
    require_role("ASHA_WORKER", "CLINICIAN")(user)

    patient = PatientModel.create_managed_patient(
        data={
            "name": name,
            "age": age,
            "gender": gender
        },
        created_by_role=user["role"],
        clinician_id=user["_id"] if user["role"] == "CLINICIAN" else None,
        asha_id=user["_id"] if user["role"] == "ASHA_WORKER" else None
    )

    return {
        "_id": patient["_id"],
        "name": patient["name"],
        "age": patient["age"],
        "gender": patient["gender"]
    }
