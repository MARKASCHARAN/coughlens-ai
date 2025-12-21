from fastapi import APIRouter, Depends, HTTPException
from app.schemas.voice_schema import VoiceIntentRequest, VoiceIntentResponse
from app.core.permissions import check_intent_permission
from app.core.voice_router import INTENT_HANDLER_MAP
from app.core.auth import get_current_user

from app.models.user_model import UserModel
from app.services.voice_service import VoiceService

router = APIRouter(prefix="/voice", tags=["Voice"])

@router.post("/intent", response_model=VoiceIntentResponse)
def handle_voice_intent(
    request: VoiceIntentRequest,
    user=Depends(get_current_user)
):
    """
    Unified Voice Entry Point
    """

    # ==========================
    # 🟡 STEP 1: LANGUAGE CHECK
    # ==========================
    user_language = UserModel.get_language(user["id"])

    spoken_text = request.payload.get("text", "")

    if not user_language:
        # 🔥 FIRST-TIME VOICE → LANGUAGE SELECTION
        result = VoiceService.handle_language_selection(
            user=user,
            spoken_text=spoken_text
        )

        return {
            "success": True,
            "message": "Language selection",
            "data": result
        }

    # ==========================
    # 🔵 STEP 2: NORMAL INTENT FLOW
    # ==========================
    try:
        check_intent_permission(request.intent, user["role"])

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
