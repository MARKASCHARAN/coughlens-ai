import uuid
from datetime import datetime
from app.config.database import user_collection


class UserModel:

    # =========================
    # BASIC QUERIES
    # =========================
    @staticmethod
    def get_by_id(user_id: str):
        return user_collection.find_one({"_id": user_id})

    @staticmethod
    def get_by_phone(phone: str):
        return user_collection.find_one({"phone": phone})

    @staticmethod
    def get_by_email(email: str):
        return user_collection.find_one({"email": email})


    # =========================
    # PHONE (OTP / WHATSAPP)
    # =========================
    @staticmethod
    def get_or_create_phone_user(phone: str, role: str):
        user = user_collection.find_one({"phone": phone})

        if user:
            user_collection.update_one(
                {"_id": user["_id"]},
                {"$set": {"auth.last_login": datetime.utcnow()}}
            )
            return user

        user = UserModel._base_user(
            role=role,
            auth_type="WHATSAPP_OTP"
        )
        user["phone"] = phone

        user_collection.insert_one(user)
        return user


    # =========================
    # EMAIL OTP
    # =========================
    @staticmethod
    def get_or_create_email_user(email: str, role: str):
        user = user_collection.find_one({"email": email})

        if user:
            user_collection.update_one(
                {"_id": user["_id"]},
                {"$set": {"auth.last_login": datetime.utcnow()}}
            )
            return user

        user = UserModel._base_user(
            role=role,
            auth_type="EMAIL_OTP"
        )
        user["email"] = email

        user_collection.insert_one(user)
        return user


    # =========================
    # PROFILE UPDATE
    # =========================
    @staticmethod
    def update_profile(user_id: str, profile_data: dict):
        update = {
            "profile.name": profile_data.get("name"),
            "profile.age": profile_data.get("age"),
            "profile.gender": profile_data.get("gender"),
            "profile.language": profile_data.get("language", "en"),
            "profile_completed": True,
            "updated_at": datetime.utcnow()
        }

        result = user_collection.update_one(
            {"_id": user_id},
            {"$set": update}
        )

        return result.modified_count > 0


    # =========================
    # INTERNAL BASE USER CREATOR
    # =========================
    @staticmethod
    def _base_user(role: str, auth_type: str):
        now = datetime.utcnow()

        return {
            "_id": str(uuid.uuid4()),
            "role": role,

            # 🔐 AUTH
            "auth": {
                "type": auth_type,
                "verified": True,
                "last_login": now
            },

            # 👤 PROFILE
            "profile": {
                "name": None,
                "age": None,
                "gender": None,
                "language": "en"
            },

            # 🧠 ROLE-SPECIFIC DATA (IMPORTANT)
            "role_profile": {
                # will store org_id, area, hospital_id later
            },

            # FLAGS
            "profile_completed": False,
            "is_active": True,

            # TIMESTAMPS
            "created_at": now,
            "updated_at": now
        }
    @staticmethod
    def update_language(user_id: str, language: str):
     return user_collection.update_one(
        {"_id": user_id},
        {"$set": {"profile.language": language}}
    )
