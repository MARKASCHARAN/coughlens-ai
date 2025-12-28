from fastapi import APIRouter, UploadFile, File, HTTPException
import librosa
import os
import uuid
import soundfile as sf

router = APIRouter(prefix="/audio", tags=["Audio"])


@router.post("/check")
def check_audio_sample(file: UploadFile = File(...)):
    try:
        # 1️⃣ Save temp file
        temp_filename = f"/tmp/audio_check_{uuid.uuid4()}_{file.filename}"
        with open(temp_filename, "wb") as f:
            f.write(file.file.read())

        # 2️⃣ Load audio safely
        y, sr = librosa.load(temp_filename, sr=None)

        duration = librosa.get_duration(y=y, sr=sr)

        # 3️⃣ Basic validation rules
        if duration < 1:
            raise HTTPException(400, "Audio too short (min 1 second)")

        if duration > 15:
            raise HTTPException(400, "Audio too long (max 15 seconds)")

        if sr < 8000:
            raise HTTPException(400, "Sample rate too low")

        # 4️⃣ Cleanup
        os.remove(temp_filename)

        # 5️⃣ Return preview info
        return {
            "status": "VALID",
            "duration_seconds": round(duration, 2),
            "sample_rate": sr,
            "message": "Audio sample is valid and ready for inference"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid audio file: {str(e)}"
        )
