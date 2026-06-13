class BehaviorService:

    def analyze(self, text):

        word_count = len(text.split())

        if word_count < 20:
            risk = "HIGH"
        elif word_count < 50:
            risk = "MEDIUM"
        else:
            risk = "LOW"

        return {
            "pause_duration": 1.2,
            "speech_rate": 125,
            "eye_direction": "Unknown",
            "head_direction": "Unknown",
            "risk_level": risk
        }