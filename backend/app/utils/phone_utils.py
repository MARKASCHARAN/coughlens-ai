def normalize_phone(phone: str):
    phone = phone.strip()
    if not phone.startswith("+"):
        phone = "+91" + phone
    return phone
