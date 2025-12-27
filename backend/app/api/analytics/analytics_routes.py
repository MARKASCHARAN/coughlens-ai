from fastapi import APIRouter, Depends
from app.core.security import get_current_user

from app.services.analytics_service import AnalyticsService
from fastapi import HTTPException

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/my")
def my_analytics(user=Depends(get_current_user)):
    # INDIVIDUAL only
    if user["role"] != "INDIVIDUAL":
        raise Exception("Only INDIVIDUAL can access /analytics/my")

    return AnalyticsService.individual_dashboard(user)


@router.get("/dashboard")
def dashboard(user=Depends(get_current_user)):
    if user["role"] not in ["ASHA_WORKER", "CLINICIAN"]:
        raise HTTPException(status_code=403, detail="Access denied")

    return AnalyticsService.dashboard(user)
