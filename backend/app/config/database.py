from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
print("🔍 MONGO_URI USED:", MONGO_URI)

if not MONGO_URI:
    raise RuntimeError("MONGO_URI not set")

client = MongoClient(MONGO_URI)
db = client["coughlens_ai"]

# ✅ SINGLE SOURCE OF TRUTH
user_collection = db["users"]
otp_collection = db["otp"]
patient_collection = db["patients"]
report_collection = db["reports"]
analytics_collection = db["analytics"]
