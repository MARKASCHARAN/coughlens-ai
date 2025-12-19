from pydantic import BaseModel

class DashboardResponse(BaseModel):
    total_patients: int
