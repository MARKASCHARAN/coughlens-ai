import random
from datetime import datetime, timedelta
from app.config.database import db

class OTPService:

    @staticmethod
    def generate_otp():
        return str(random.randint(100000, 999999))

    @staticmethod
    def save_otp(phone: str, otp: str, role: str):
        db.otp_sessions.delete_many({"phone": phone})

        db.otp_sessions.insert_one({
            "phone": phone,
            "otp": otp,
            "role": role,
            "expires_at": datetime.utcnow() + timedelta(minutes=5)
        })

    @staticmethod
    def verify_otp(phone: str, otp: str):
        record = db.otp_sessions.find_one({
            "phone": phone,
            "otp": otp,
            "expires_at": {"$gt": datetime.utcnow()}
        })

        if not record:
            return None

        db.otp_sessions.delete_one({"_id": record["_id"]})
        return record
