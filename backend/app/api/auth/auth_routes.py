from fastapi import APIRouter, HTTPException
from app.core.security import create_access_token
from app.models.user_model import UserModel

router = APIRouter(prefix="/auth", tags=["Auth"])


# =========================
# DEV / SWAGGER LOGIN (SAFE)
# =========================
@router.post("/login")
def login(email: str | None = None, phone: str | None = None):
    """
    ⚠️ DEV / SWAGGER ONLY
    Logs in an EXISTING user (created via OTP)
    """

    if not email and not phone:
        raise HTTPException(400, "Email or phone required")

    # 🔍 FIND REAL USER
    if email:
        user = UserModel.get_or_create_email_user(email=email, role="INDIVIDUAL")
    else:
        user = UserModel.get_by_phone(phone)

    if not user:
        raise HTTPException(404, "User not found. Complete OTP login first.")

    # 🔐 ISSUE TOKEN
    token = create_access_token({
        "sub": user["_id"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user["_id"],
        "role": user["role"]
    }
