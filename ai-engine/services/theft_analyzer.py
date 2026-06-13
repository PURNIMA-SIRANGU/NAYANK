class TheftAnalyzer:

    def analyze(
        self,
        entry_exit_events,
        loitering_events,
    ):

        confidence = 40

        reasons = []

        if len(
            entry_exit_events
        ) > 0:

            confidence += 10

            reasons.append(
                "Entry/Exit activity detected"
            )

        if len(
            loitering_events
        ) > 0:

            confidence += 30

            reasons.append(
                "Loitering detected"
            )

        if confidence > 100:
            confidence = 100

        incident = (
            "Normal Activity"
        )

        if confidence >= 70:

            incident = (
                "Possible Theft"
            )

        return {
            "incidentType":
                incident,

            "confidence":
                confidence,

            "reasons":
                reasons
        }