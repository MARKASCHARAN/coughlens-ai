INTENT_PERMISSIONS = {
    "START_COUGH_TEST": ["USER", "ASHA_WORKER"],
    "ADD_PATIENT": ["ASHA_WORKER"],
    "CHANGE_LANGUAGE": ["USER", "ASHA_WORKER"],
}

def check_intent_permission(intent: str, role: str):
    allowed = INTENT_PERMISSIONS.get(intent)
    if not allowed or role not in allowed:
        raise PermissionError("Intent not allowed for this role")
