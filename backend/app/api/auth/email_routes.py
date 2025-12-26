# app/api/auth/email_routes.py

from fastapi import APIRouter, HTTPException
from app.services.otp_service import OTPService
from app.services.email_service import EmailService
from app.models.user_model import UserModel
from app.core.security import create_access_token

router = APIRouter(prefix="/auth/email", tags=["Auth"])


@router.post("/request")
def request_email_otp(email: str, role: str):
    if role not in ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"]:
        raise HTTPException(400, "Invalid role")

    otp = OTPService.generate_otp()

    OTPService.save_otp(
        identifier=email,
        otp=otp,
        role=role,
        channel="EMAIL"
    )

    EmailService.send_otp(email, otp)

    return {"status": "OTP_SENT"}


@router.post("/verify")
def verify_email_otp(email: str, otp: str):
    record = OTPService.verify_otp(
        identifier=email,
        otp=otp,
        channel="EMAIL"
    )

    if not record:
        raise HTTPException(401, "Invalid or expired OTP")

    user = UserModel.get_or_create_email_user(
        email=email,
        role=record["role"]
    )

    token = create_access_token({
        "sub": user["_id"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"]
    }
