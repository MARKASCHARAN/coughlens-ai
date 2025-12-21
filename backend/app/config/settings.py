from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    # 🔐 Auth
    JWT_SECRET: str = "devsecret"

    # 🗄 Database
    MONGO_URI: str

    # 🌐 IPFS / Pinata
    IPFS_PROVIDER: str = "pinata"
    PINATA_API_KEY: str | None = None
    PINATA_SECRET_KEY: str | None = None

    # 🤖 AI
    OPENAI_API_KEY: str | None = None

    # 📲 Twilio
    TWILIO_ACCOUNT_SID: str | None = None
    TWILIO_AUTH_TOKEN: str | None = None
    TWILIO_WHATSAPP_FROM: str | None = None

    # ✅ Pydantic v2 config
    model_config = ConfigDict(
        env_file=".env",
        extra="ignore"  # 🔥 THIS LINE FIXES EVERYTHING
    )


settings = Settings()

# Export commonly used values
JWT_SECRET = settings.JWT_SECRET
MONGO_URI = settings.MONGO_URI
