from fastapi import APIRouter, HTTPException
from app.services.otp_service import OTPService
from app.services.sms_service import SMSService
from app.models.user_model import UserModel
from app.core.security import create_access_token

router = APIRouter(prefix="/auth/otp", tags=["Auth"])

# =========================
# Request OTP
# =========================
@router.post("/request")
def request_otp(phone: str, role: str):
    if role not in ["INDIVIDUAL", "ASHA_WORKER"]:
        raise HTTPException(400, "Invalid role")

    otp = OTPService.generate_otp()
    OTPService.save_otp(phone, otp, role)

    try:
      SMSService().send_otp(phone, otp)
    except Exception as e:
     print("⚠️ SMS failed, DEV MODE OTP:", otp)


    return {"status": "OTP_SENT"}


# =========================
# Verify OTP
# =========================
@router.post("/verify")
def verify_otp(phone: str, otp: str):
    record = OTPService.verify_otp(phone, otp)

    if not record:
        raise HTTPException(401, "Invalid or expired OTP")

    user = UserModel.get_or_create_phone_user(
        phone=phone,
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
