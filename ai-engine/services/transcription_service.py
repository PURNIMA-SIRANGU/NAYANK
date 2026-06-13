from faster_whisper import WhisperModel

class TranscriptionService:

    def __init__(self):
        self.model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

    def transcribe(self, audio_path):
        segments, info = self.model.transcribe(
            audio_path
        )

        transcript = ""

        for segment in segments:
            transcript += segment.text + " "

        return {
            "language": info.language,
            "transcript": transcript.strip()
        }