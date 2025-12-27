from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.models.user_model import UserModel
from app.models.patient_model import PatientModel
from app.schemas.auth_schema import (
    ProfileCompleteSchema,
    ProfileUpdateSchema
)

router = APIRouter(prefix="/auth/profile", tags=["Auth"])


# =========================
# GET CURRENT USER PROFILE
# =========================
@router.get("/me")
def get_my_profile(user=Depends(get_current_user)):
    db_user = UserModel.get_by_id(user["_id"])

    if not db_user:
        raise HTTPException(404, "User not found")

    return {
        "email": db_user.get("email"),
        "role": db_user.get("role"),
        "profile": db_user.get("profile"),
        "profile_completed": db_user.get("profile_completed", False),
        "created_at": db_user.get("created_at")
    }


# =========================
# COMPLETE PROFILE (ONE-TIME)
# =========================
@router.post("/complete")
def complete_profile(
    payload: ProfileCompleteSchema,
    user=Depends(get_current_user)
):
    if user.get("profile_completed"):
        raise HTTPException(
            status_code=409,
            detail="Profile already completed. Use /update instead."
        )

    updated = UserModel.update_profile(
        user_id=user["_id"],
        profile_data=payload.dict()
    )

    if not updated:
        raise HTTPException(400, "Profile update failed")

    # ✅ AUTO-CREATE PATIENT (INDIVIDUAL ONLY, ONCE)
    if user["role"] == "INDIVIDUAL":
        existing = PatientModel.get_by_user(user["_id"])
        if not existing:
            patient = PatientModel.create_patient(
                data={
                    "name": payload.name,
                    "age": payload.age,
                    "gender": payload.gender
                },
                created_by=user["_id"]
            )

            return {
                "status": "PROFILE_COMPLETED",
                "patient_id": patient["_id"]
            }

    return {"status": "PROFILE_COMPLETED"}


# =========================
# UPDATE PROFILE (PARTIAL)
# =========================
@router.patch("/update")
def update_profile(
    payload: ProfileUpdateSchema,
    user=Depends(get_current_user)
):
    update_data = payload.dict(exclude_unset=True)

    if not update_data:
        raise HTTPException(400, "No fields provided for update")

    updated = UserModel.update_profile(
        user_id=user["_id"],
        profile_data=update_data
    )

    if not updated:
        raise HTTPException(400, "Profile update failed")

    return {
        "status": "PROFILE_UPDATED",
        "updated_fields": list(update_data.keys())
    }
