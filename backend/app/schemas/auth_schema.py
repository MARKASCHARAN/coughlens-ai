from typing import Optional, Literal
from pydantic import BaseModel, Field


# =========================
# LOGIN RESPONSE
# =========================
class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


# =========================
# PROFILE COMPLETE (ONE-TIME)
# =========================
class ProfileCompleteSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    age: int = Field(..., ge=1, le=120)
    gender: Literal["MALE", "FEMALE", "OTHER"]
    language: Optional[Literal["en", "hi", "te"]] = "en"


# =========================
# PROFILE UPDATE (PARTIAL)
# =========================
class ProfileUpdateSchema(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    age: Optional[int] = Field(None, ge=1, le=120)
    gender: Optional[Literal["MALE", "FEMALE", "OTHER"]] = None
    language: Optional[Literal["en", "hi", "te"]] = None

    # ✅ Swagger checkbox
    profile_completed: Optional[bool] = None
