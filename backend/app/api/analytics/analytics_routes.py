from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/overview")
def analytics(user=Depends(get_current_user)):
    return {
        "total_tests": 120,
        "positive_cases": 34,
        "accuracy": 0.91
    }


@router.get("/dashboard")
def clinician_dashboard(user=Depends(get_current_user)):
    return AnalyticsService.clinician_dashboard(user.id)