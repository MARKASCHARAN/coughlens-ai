import random
import bcrypt
from datetime import datetime, timedelta
from app.config.database import otp_collection


class OTPService:

    # =========================
    # GENERATE OTP
    # =========================
    @staticmethod
    def generate_otp():
        return str(random.randint(100000, 999999))

    # =========================
    # HASH / VERIFY
    # =========================
    @staticmethod
    def hash_otp(otp: str):
        return bcrypt.hashpw(otp.encode(), bcrypt.gensalt()).decode()

    @staticmethod
    def verify_hash(otp: str, otp_hash: str):
        return bcrypt.checkpw(otp.encode(), otp_hash.encode())

    # =========================
    # SAVE OTP
    # =========================
    @staticmethod
    def save_otp(identifier: str, otp: str, role: str, channel: str):
        identifier = identifier.strip().lower()

        otp_collection.insert_one({
            "identifier": identifier,          # email OR phone
            "channel": channel,                # EMAIL | SMS
            "otp_hash": OTPService.hash_otp(otp),
            "role": role,
            "verified": False,
            "expires_at": datetime.utcnow() + timedelta(minutes=5),
            "created_at": datetime.utcnow()
        })

    # =========================
    # VERIFY OTP (LATEST ONLY)
    # =========================
    @staticmethod
    def verify_otp(identifier: str, otp: str, channel: str):
        identifier = identifier.strip().lower()

        record = otp_collection.find_one(
            {
                "identifier": identifier,
                "channel": channel,
                "verified": False,
                "expires_at": {"$gt": datetime.utcnow()}
            },
            sort=[("created_at", -1)]  # 🔒 VERY IMPORTANT
        )

        if not record:
            return None

        if not OTPService.verify_hash(otp, record["otp_hash"]):
            return None

        otp_collection.update_one(
            {"_id": record["_id"]},
            {"$set": {"verified": True}}
        )

        return record
