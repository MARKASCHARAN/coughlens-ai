from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.core.permissions import require_role

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/dashboard")
def dashboard(user=Depends(get_current_user)):
    require_role("CLINICIAN")(user)
    return {
        "status": "ok",
        "message": "Clinician analytics"
    }
