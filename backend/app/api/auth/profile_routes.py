from fastapi import APIRouter, Depends, HTTPException
from app.core.auth import get_current_user
from app.models.user_model import UserModel
from app.schemas.auth_schema import ProfileCompleteSchema

router = APIRouter(prefix="/auth/profile", tags=["Auth"])


@router.post("/complete")
def complete_profile(
    payload: ProfileCompleteSchema,
    user=Depends(get_current_user)
):
    updated = UserModel.update_profile(
        user_id=user["id"],
        profile_data=payload.dict()
    )

    if not updated:
        raise HTTPException(400, "Profile update failed")

    return {
        "status": "PROFILE_COMPLETED"
    }
