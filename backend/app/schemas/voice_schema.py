from pydantic import BaseModel
from typing import Dict, Optional

class VoiceIntentRequest(BaseModel):
    intent: str
    payload: Optional[Dict] = {}

class VoiceIntentResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict] = None
