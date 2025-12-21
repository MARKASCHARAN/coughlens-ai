from fastapi import APIRouter
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

# TEMP LOGIN (for hackathon/demo)
@router.post("/login")
def login(role: str):
    if role not in ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"]:
        return {"error": "Invalid role"}

    token = create_access_token({
        "sub": "user_123",   # later replace with real user id
        "role": role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }
