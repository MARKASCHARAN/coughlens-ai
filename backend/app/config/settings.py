from pydantic import BaseSettings

class Settings(BaseSettings):
    JWT_SECRET: str = "DEV_SECRET"
    MONGO_URI: str = "mongodb://localhost:27017"

settings = Settings()
