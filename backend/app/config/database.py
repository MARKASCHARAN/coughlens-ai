from dotenv import load_dotenv
import os

# FORCE load .env from backend root
load_dotenv(dotenv_path=os.path.join(os.getcwd(), ".env"))

from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")

print("🔍 MONGO_URI USED:", MONGO_URI)  # DEBUG LINE

if not MONGO_URI:
    raise RuntimeError("MONGO_URI not set")

client = MongoClient(MONGO_URI)
db = client["coughlens_ai"]

users_collection = db["users"]
patients_collection = db["patients"]
reports_collection = db["reports"]
