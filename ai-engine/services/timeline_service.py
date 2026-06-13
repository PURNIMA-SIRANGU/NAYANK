class TimelineService:

    def generate(
        self,
        analysis
    ):

        timeline = []

        entry_events = analysis.get(
            "entryExitEvents",
            []
        )

        loitering_events = analysis.get(
            "loiteringEvents",
            []
        )

        suspicious_objects = analysis.get(
            "suspiciousObjects",
            []
        )

        for event in entry_events:

            timeline.append({
                "time":
                    event["entryTime"],

                "event":
                    f"Person #{event['personId']} entered scene"
            })

            timeline.append({
                "time":
                    event["exitTime"],

                "event":
                    f"Person #{event['personId']} exited scene"
            })

        for event in loitering_events:

            timeline.append({
                "time":
                    event["duration"],

                "event":
                    f"Person #{event['personId']} loitering detected"
            })

        for obj in suspicious_objects:

            timeline.append({
                "time": 0,
                "event":
                    f"Suspicious {obj['type']} detected"
            })

        timeline.sort(
            key=lambda x:
            x["time"]
        )

        return timeline