
from typing import Optional
from pydantic import BaseModel, Field
from typing import Literal

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


class ProfileCompleteSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    age: int = Field(..., ge=1, le=120)
    gender: Literal["MALE", "FEMALE", "OTHER"]
    language: Optional[Literal["en", "hi", "te"]] = "en"