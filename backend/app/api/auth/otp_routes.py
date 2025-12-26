from fastapi import APIRouter, HTTPException
from app.services.otp_service import OTPService
from app.services.sms_service import SMSService
from app.models.user_model import UserModel
from app.core.security import create_access_token

router = APIRouter(prefix="/auth/otp", tags=["Auth"])

ALLOWED_OTP_ROLES = ["INDIVIDUAL", "ASHA_WORKER"]

# =========================
# Request OTP
# =========================
@router.post("/request")
def request_otp(phone: str, role: str):
    if role not in ALLOWED_OTP_ROLES:
        raise HTTPException(400, "Role not allowed for OTP login")

    otp = OTPService.generate_otp()
    OTPService.save_otp(phone, otp, role)

    try:
        SMSService.send_otp(phone, otp)
    except Exception:
        # DEV MODE fallback
        print("⚠️ SMS failed, DEV MODE OTP:", otp)

    return {
        "success": True,
        "message": "OTP sent"
    }


# =========================
# Verify OTP
# =========================
@router.post("/verify")
def verify_otp(phone: str, otp: str):
    phone = phone.strip()

    print("🔍 VERIFY OTP FOR:", phone, otp)

    record = OTPService.verify_otp(phone, otp)

    if not record:
        print("❌ OTP RECORD NOT FOUND")
        raise HTTPException(401, "Invalid or expired OTP")

    print("✅ OTP VERIFIED, ROLE:", record["role"])

    user = UserModel.get_or_create_phone_user(
        phone=phone,
        role=record["role"]
    )

    print("✅ USER OBJECT:", user)

    token = create_access_token({
        "sub": user["_id"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"]
    }
