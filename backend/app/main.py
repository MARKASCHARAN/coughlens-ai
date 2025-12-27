from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.voice.voice_routes import router as voice_router
from app.api.auth.auth_routes import router as auth_router
# from app.api.auth.otp_routes import router as otp_router
from app.api.audio.audio_routes import router as audio_router
from app.api.ml.inference_routes import router as ml_router
from app.api.reports.report_routes import router as report_router
from app.api.analytics.analytics_routes import router as analytics_router
from app.api.ml.ml_test_routes import router as ml_test_router
from app.api.auth.whatsapp_routes import router as whatsapp_auth_router
from app.api.auth.profile_routes import router as profile_router
from app.api.auth.email_routes import router as email_router
from app.api.patients.patient_routes import router as patient_router






app = FastAPI(title="CoughLens AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO: Change this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
# app.include_router(otp_router)
app.include_router(voice_router)
app.include_router(audio_router)
app.include_router(ml_router)
app.include_router(report_router)
app.include_router(analytics_router)
app.include_router(ml_test_router)
app.include_router(whatsapp_auth_router)
app.include_router(profile_router)
app.include_router(email_router)
app.include_router(patient_router)

@app.get("/")
def root():
    return {"status": "Backend running"}
