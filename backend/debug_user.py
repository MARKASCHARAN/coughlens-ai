
import os
from pymongo import MongoClient
from bson import ObjectId

# Hardcoded DB URI for dev
MONGO_URI = "mongodb://localhost:27017"

def debug(email):
    client = MongoClient(MONGO_URI)
    
    # List DBs to find correct one
    dbs = client.list_database_names()
    print(f"Databases found: {dbs}")
    
    db_name = "coughlens"
    for d in dbs:
        if "cough" in d or "lens" in d:
            db_name = d
            break
            
    print(f"Using DB: {db_name}")
    db = client[db_name]
    
    print(f"\nSearching for user: {email}")
    user = db["users"].find_one({"email": email})
    
    if not user:
        print("❌ User NOT found!")
        return
        
    print(f"✅ User Found: ID={user['_id']}")
    print(f"   Role: {user.get('role')}")
    print(f"   Profile Completed Flag: {user.get('profile_completed')}")
    print(f"   Profile Data: {user.get('profile')}")
    
    print("\nSearching for Linked Patient...")
    patient = db["patients"].find_one({"user_id": str(user["_id"])})
    # Try ObjectId too incase of mismatch
    if not patient:
         patient = db["patients"].find_one({"user_id": user["_id"]})
         
    if not patient:
         # Try by name if profile exists? No, should be by ID.
         pass
         
    if not patient:
        print("❌ Patient Record NOT found!")
    else:
        print(f"✅ Patient Found: ID={patient['_id']}")
        print(f"   User ID Link: {patient.get('user_id')}")
        print(f"   Name: {patient.get('name')}")
        
    print("\n--- Summary ---")
    if user and not patient:
        print("⚠️  BROKEN STATE: User exists but no Patient record.")
        print("   -> Frontend will force profile completion.")
    elif user and patient and not user.get("profile_completed"):
        print("⚠️  INCONSISTENT STATE: Patient exists but profile_completed=False.")
        print("   -> Backend 'Self-Healing' should fix this on next login/fetch.")
    else:
        print("✅ STATE LOOKS GOOD.")

    print("\n--- RECENT OTPS ---")
    otps = list(db.otps.find().sort("created_at", -1).limit(5))
    for otp in otps:
        print(f"To: {otp.get('identifier')} | Role: {otp.get('role')} | Verified: {otp.get('verified')} | Expires: {otp.get('expires_at')}")

    print("\n--- RECENT REPORTS ---")
    reports = list(db.reports.find().sort("created_at", -1).limit(5))
    for r in reports:
        print(f"ID: {r.get('_id')} | Patient: {r.get('patient_id')} | Pred: {r.get('prediction')} | Created: {r.get('created_at')}")

if __name__ == "__main__":
    import sys
    email = sys.argv[1] if len(sys.argv) > 1 else "mscharan0101@gmail.com"
    print(f"Debugging for: {email}")
    debug(email)
