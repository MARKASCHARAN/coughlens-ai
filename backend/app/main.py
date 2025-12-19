from fastapi import FastAPI

from app.api.voice.voice_routes import router as voice_router
from app.api.auth.auth_routes import router as auth_router
from app.api.auth.otp_routes import router as otp_router
from app.api.audio.audio_routes import router as audio_router
from app.api.ml.inference_routes import router as ml_router
from app.api.reports.report_routes import router as report_router
from app.api.analytics.analytics_routes import router as analytics_router


app = FastAPI(title="CoughLens AI Backend")

app.include_router(auth_router)
app.include_router(otp_router)
app.include_router(voice_router)
app.include_router(audio_router)
app.include_router(ml_router)
app.include_router(report_router)
app.include_router(analytics_router)

@app.get("/")
def root():
    return {"status": "Backend running"}
