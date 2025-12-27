# app/api/auth/email_routes.py

from fastapi import APIRouter, HTTPException
from app.services.otp_service import OTPService
from app.services.email_service import EmailService
from app.models.user_model import UserModel
from app.models.patient_model import PatientModel
from app.core.security import create_access_token

router = APIRouter(prefix="/auth/email", tags=["Auth"])


# ======================================
# REQUEST EMAIL OTP
# ======================================
@router.post("/request")
def request_email_otp(email: str, role: str):
    if role not in ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    otp = OTPService.generate_otp()

    OTPService.save_otp(
        identifier=email,
        otp=otp,
        role=role,
        channel="EMAIL"
    )

    EmailService.send_otp(email, otp)

    return {"status": "OTP_SENT"}


# ======================================
# VERIFY EMAIL OTP + LOGIN
# ======================================
@router.post("/verify")
def verify_email_otp(email: str, otp: str):
    record = OTPService.verify_otp(
        identifier=email,
        otp=otp,
        channel="EMAIL"
    )

    if not record:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired OTP"
        )

    # 🔐 Create or fetch user
    user = UserModel.get_or_create_email_user(
        email=email,
        role=record["role"]
    )

    # ======================================
    # 🧑‍🦱 AUTO-CREATE PATIENT (INDIVIDUAL ONLY)
    # ======================================
    if user["role"] == "INDIVIDUAL":
        existing_patient = PatientModel.get_by_user(user["_id"])
        if not existing_patient:
            PatientModel.create_self_patient(user["_id"])

    # 🔑 Create JWT
    token = create_access_token({
        "sub": user["_id"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"]
    }
