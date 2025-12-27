from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

from app.models.user_model import UserModel

security = HTTPBearer()

# =========================
# JWT CONFIG
# =========================
SECRET_KEY = os.getenv("JWT_SECRET", "dev_secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24


# =========================
# CREATE TOKEN
# =========================
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# =========================
# DECODE TOKEN
# =========================
def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None


# =========================
# GET CURRENT USER (REAL USER OBJECT)
# =========================
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    payload = decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")
    role = payload.get("role")

    if not user_id or not role:
        raise HTTPException(401, "Invalid token payload")

    user = UserModel.get_by_id(user_id)

    if not user or not user.get("is_active", False):
        raise HTTPException(401, "User not found or inactive")

    return {
        "_id": payload["sub"],    
        "role": payload["role"]
    }


# =========================
# ROLE GUARD (OPTIONAL HELPER)
# =========================
def require_roles(allowed_roles: list):
    def checker(user=Depends(get_current_user)):
        if user["role"] not in allowed_roles:
            raise HTTPException(403, "Access denied")
        return user
    return checker
