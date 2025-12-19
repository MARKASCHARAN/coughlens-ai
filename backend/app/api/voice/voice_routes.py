from fastapi import APIRouter, Depends, HTTPException


from app.schemas.voice_schema import VoiceIntentRequest, VoiceIntentResponse
from app.core.permissions import check_intent_permission
from app.core.voice_router import INTENT_HANDLER_MAP
from app.core.auth import get_current_user

router = APIRouter(prefix="/voice", tags=["Voice"])

@router.post("/intent", response_model=VoiceIntentResponse)
def handle_voice_intent(
    request: VoiceIntentRequest,
    user=Depends(get_current_user)
):
    try:
        check_intent_permission(request.intent, user.role)

        handler = INTENT_HANDLER_MAP.get(request.intent)
        if not handler:
            raise HTTPException(status_code=400, detail="Unknown intent")

        result = handler(user, request.payload)

        return {
            "success": True,
            "message": "Intent processed",
            "data": result
        }

    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))
