from fastapi import APIRouter, HTTPException
from app.services.otp_service import OTPService
from app.services.whatsapp_otp_service import WhatsAppOTPService
from app.models.user_model import UserModel
from app.core.security import create_access_token

router = APIRouter(prefix="/auth/whatsapp", tags=["Auth"])

# ======================
# REQUEST OTP
# ======================
@router.post("/request")
def request_whatsapp_otp(phone: str, role: str):
    if role not in ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"]:
        raise HTTPException(400, "Invalid role")

    otp = OTPService.generate_otp()
    OTPService.save_otp(phone, otp, role)

    try:
        WhatsAppOTPService().send_otp(phone, otp)
    except Exception as e:
        print("⚠️ WhatsApp OTP failed, DEV OTP:", otp)

    return {"status": "OTP_SENT"}

# ======================
# VERIFY OTP
# ======================
@router.post("/verify")
def verify_whatsapp_otp(phone: str, otp: str):
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
