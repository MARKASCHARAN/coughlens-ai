from fastapi import APIRouter

router = APIRouter(prefix="/auth/otp", tags=["Auth"])

@router.post("/send")
def send_otp(phone: str):
    return {"status": "OTP_SENT", "phone": phone}

@router.post("/verify")
def verify_otp(phone: str, otp: str):
    return {"status": "VERIFIED"}
