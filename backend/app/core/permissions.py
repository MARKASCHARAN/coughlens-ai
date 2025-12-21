from fastapi import HTTPException, status

INTENT_PERMISSIONS = {

    # ----------------
    # SYSTEM (ALL)
    # ----------------
    "HELP": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
    "CHANGE_LANGUAGE": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
    "STOP": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
    "REPEAT_LAST": ["INDIVIDUAL", "ASHA", "CLINICIAN"],

    # ----------------
    # PATIENT
    # ----------------
    "ADD_PATIENT": ["ASHA", "CLINICIAN"],
    "UPDATE_PATIENT": ["ASHA", "CLINICIAN"],
    "GET_PATIENT_HISTORY": ["ASHA", "CLINICIAN"],
    "LIST_MY_PATIENTS": ["ASHA", "CLINICIAN"],

    # ----------------
    # COUGH / ML
    # ----------------
    "START_COUGH_TEST": ["INDIVIDUAL", "ASHA"],
    "STOP_COUGH_TEST": ["INDIVIDUAL", "ASHA"],
    "RUN_ANALYSIS": ["INDIVIDUAL", "ASHA"],
    "GET_RESULT": ["INDIVIDUAL", "ASHA"],

    # ----------------
    # REPORTS
    # ----------------
    "GENERATE_REPORT": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
    "GET_MY_REPORTS": ["INDIVIDUAL", "ASHA"],
    "GET_PATIENT_REPORTS": ["ASHA", "CLINICIAN"],
    "OPEN_LATEST_REPORT": ["INDIVIDUAL", "ASHA"],

    # ----------------
    # SHARING
    # ----------------
    "SEND_REPORT_WHATSAPP": ["INDIVIDUAL", "ASHA"],
    "SEND_REPORT_EMAIL": ["CLINICIAN"],
    "COPY_REPORT_LINK": ["INDIVIDUAL", "ASHA", "CLINICIAN"],

    # ----------------
    # ANALYTICS (STRICT)
    # ----------------
    "GET_ANALYTICS_DASHBOARD": ["CLINICIAN"],
    "GET_HIGH_RISK_PATIENTS": ["CLINICIAN"],
    "GET_TODAY_STATS": ["CLINICIAN"],
    "GET_MONTHLY_TRENDS": ["CLINICIAN"],
    "EXPORT_ANALYTICS": ["CLINICIAN"],

    # ----------------
    # AWARENESS (ALL)
    # ----------------
    "WHAT_IS_ASTHMA": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
    "WHAT_IS_PNEUMONIA": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
    "ASTHMA_SYMPTOMS": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
    "PREVENTION_TIPS": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
    "WHEN_TO_SEE_DOCTOR": ["INDIVIDUAL", "ASHA", "CLINICIAN"],
}

INTENT_ROLE_MAP = {

    # SYSTEM
    "CHANGE_LANGUAGE": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],
    "HELP": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],
    "STOP": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],
    "REPEAT_LAST": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],

    # PATIENT
    "ADD_PATIENT": ["ASHA_WORKER", "INDIVIDUAL"],
    "UPDATE_PATIENT": ["ASHA_WORKER"],
    "GET_PATIENT_HISTORY": ["ASHA_WORKER", "CLINICIAN"],
    "LIST_MY_PATIENTS": ["ASHA_WORKER"],

    # COUGH
    "START_COUGH_TEST": ["INDIVIDUAL", "ASHA_WORKER"],
    "STOP_COUGH_TEST": ["INDIVIDUAL", "ASHA_WORKER"],
    "RUN_ANALYSIS": ["INDIVIDUAL", "ASHA_WORKER"],
    "GET_RESULT": ["INDIVIDUAL", "ASHA_WORKER"],

    # REPORTS
    "GENERATE_REPORT": ["INDIVIDUAL", "ASHA_WORKER"],
    "GET_MY_REPORTS": ["INDIVIDUAL"],
    "GET_PATIENT_REPORTS": ["ASHA_WORKER", "CLINICIAN"],
    "OPEN_LATEST_REPORT": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],

    # SHARING
    "SEND_REPORT_WHATSAPP": ["INDIVIDUAL", "ASHA_WORKER"],
    "SEND_REPORT_EMAIL": ["INDIVIDUAL", "ASHA_WORKER"],
    "COPY_REPORT_LINK": ["INDIVIDUAL", "ASHA_WORKER"],

    # ANALYTICS
    "GET_ANALYTICS_DASHBOARD": ["CLINICIAN"],
    "GET_HIGH_RISK_PATIENTS": ["CLINICIAN"],
    "GET_TODAY_STATS": ["CLINICIAN"],
    "GET_MONTHLY_TRENDS": ["CLINICIAN"],
    "EXPORT_ANALYTICS": ["CLINICIAN"],

    # AWARENESS
    "WHAT_IS_ASTHMA": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],
    "WHAT_IS_PNEUMONIA": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],
    "ASTHMA_SYMPTOMS": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],
    "PREVENTION_TIPS": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],
    "WHEN_TO_SEE_DOCTOR": ["INDIVIDUAL", "ASHA_WORKER", "CLINICIAN"],
}


ROLES = {
    "INDIVIDUAL",
    "ASHA_WORKER",
    "CLINICIAN"
}

def check_intent_permission(intent: str, role: str):
    allowed = INTENT_PERMISSIONS.get(intent)
    if not allowed or role not in allowed:
        raise PermissionError("Intent not allowed for this role")


def require_role(*allowed_roles):
    def checker(user):
        if user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return True
    return checker


def check_ownership(resource_created_by: str, user_id: str):
    if resource_created_by != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied (ownership mismatch)"
        )