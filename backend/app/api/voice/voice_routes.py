from fastapi import APIRouter, Depends, HTTPException
from app.schemas.voice_schema import VoiceIntentRequest, VoiceIntentResponse
from app.core.voice_router import INTENT_HANDLER_MAP
from app.core.security import get_current_user

router = APIRouter(prefix="/voice", tags=["Voice"])

@router.post("/intent", response_model=VoiceIntentResponse)
def handle_voice_intent(
    request: VoiceIntentRequest,
    user=Depends(get_current_user)
):
    handler = INTENT_HANDLER_MAP.get(request.intent)

    if not handler:
        raise HTTPException(400, "Unknown intent")

    result = handler(user, request.payload)

    return {
        "success": True,
        "message": "Intent processed",
        "data": result
    }
