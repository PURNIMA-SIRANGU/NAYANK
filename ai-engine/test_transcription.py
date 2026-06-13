from services.transcription_service import (
    TranscriptionService
)

service = TranscriptionService()

result = service.transcribe(
    "sample.mp3"
)

print(result)