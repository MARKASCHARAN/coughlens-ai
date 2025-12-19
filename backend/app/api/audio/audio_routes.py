from fastapi import APIRouter, UploadFile, Depends
from app.core.auth import get_current_user

import uuid
import shutil
import os

router = APIRouter(prefix="/audio", tags=["Audio"])

UPLOAD_DIR = "/tmp/cough_audio"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
def upload_audio(
    file: UploadFile,
    user=Depends(get_current_user)
):
    audio_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{audio_id}_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "audio_id": audio_id,
        "path": file_path
    }
