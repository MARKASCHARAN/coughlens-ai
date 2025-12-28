from datetime import datetime, timedelta
from app.config.database import otp_collection

class OTPModel:

    @staticmethod
    def create(phone, otp_hash):
        otp_collection.insert_one({
            "phone": phone,
            "otp_hash": otp_hash,
            "expires_at": datetime.utcnow() + timedelta(minutes=5),
            "verified": False
        })

    @staticmethod
    def get_valid(phone):
        return otp_collection.find_one({
            "phone": phone,
            "verified": False,
            "expires_at": {"$gt": datetime.utcnow()}
        })

    @staticmethod
    def mark_used(phone):
        otp_collection.update_many(
            {"phone": phone},
            {"$set": {"verified": True}}
        )
