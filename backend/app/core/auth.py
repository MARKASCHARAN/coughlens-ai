from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
import jwt
import os

security = HTTPBearer()
SECRET = os.getenv("JWT_SECRET", "DEV_SECRET")

class User:
    def __init__(self, id: str, role: str):
        self.id = id
        self.role = role

def get_current_user(token=Depends(security)):
    try:
        payload = jwt.decode(token.credentials, SECRET, algorithms=["HS256"])
        return User(
            id=payload["sub"],
            role=payload["role"]
        )
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
