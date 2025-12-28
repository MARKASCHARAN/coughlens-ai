from fastapi import APIRouter, HTTPException
from app.services.otp_service import OTPService
from app.services.sms_service import SMSService
from app.models.user_model import UserModel
from app.core.security import create_access_token

router = APIRouter(prefix="/auth/otp", tags=["Auth"])

ALLOWED_OTP_ROLES = ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"]


# =========================
# REQUEST PHONE OTP
# =========================
@router.post("/request")
def request_otp(phone: str, role: str):
    if role not in ALLOWED_OTP_ROLES:
        raise HTTPException(400, "Role not allowed")

    otp = OTPService.generate_otp()

    OTPService.save_otp(
        identifier=phone,
        otp=otp,
        role=role,
        channel="SMS"
    )

    try:
        SMSService.send_otp(phone, otp)
    except Exception:
        print("⚠️ SMS FAILED — DEV OTP:", otp)

    return {"status": "OTP_SENT"}


# =========================
# VERIFY PHONE OTP
# =========================
@router.post("/verify")
def verify_otp(phone: str, otp: str):
    record = OTPService.verify_otp(
        identifier=phone,
        otp=otp,
        channel="SMS"
    )

    if not record:
        raise HTTPException(401, "Invalid or expired OTP")

    user = UserModel.get_or_create_phone_user(
        phone=phone.strip(),
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
