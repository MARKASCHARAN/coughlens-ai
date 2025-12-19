from fastapi import APIRouter
import jwt
import os

router = APIRouter(prefix="/auth", tags=["Auth"])

SECRET = os.getenv("JWT_SECRET", "DEV_SECRET")

@router.post("/login")
def login(role: str = "USER"):
    token = jwt.encode(
        {"sub": "user_123", "role": role},
        SECRET,
        algorithm="HS256"
    )
    return {"access_token": token}
