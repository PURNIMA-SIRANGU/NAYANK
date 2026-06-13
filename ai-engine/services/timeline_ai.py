from datetime import datetime


class TimelineAI:

    def generate(
        self,
        analysis,
    ):

        timeline = []

        timeline.append({
            "time": "00:00:01",
            "event": "Video Analysis Started"
        })

        if analysis["persons"] > 0:

            timeline.append({
                "time": "00:00:05",
                "event": f"{analysis['persons']} Persons Detected"
            })

        if analysis["vehicles"] > 0:

            timeline.append({
                "time": "00:00:08",
                "event": f"{analysis['vehicles']} Vehicles Detected"
            })

        if (
            len(
                analysis.get(
                    "wrongWayVehicles",
                    []
                )
            ) > 0
        ):

            timeline.append({
                "time": "00:00:12",
                "event": "Wrong Way Vehicle Detected"
            })

        if (
            len(
                analysis.get(
                    "suspiciousVehicles",
                    []
                )
            ) > 0
        ):

            timeline.append({
                "time": "00:00:18",
                "event": "Suspicious Vehicle Activity"
            })

        timeline.append({
            "time": "END",
            "event": "Analysis Completed"
        })

        return timeline