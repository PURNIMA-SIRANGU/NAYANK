class LoiteringDetector:

    def detect(
        self,
        tracked_persons,
        fps,
        threshold_seconds=20,
    ):

        loiterers = []

        for person_id, data in tracked_persons.items():

            duration = (
                data["last_seen"]
                -
                data["first_seen"]
            ) / fps

            if duration >= threshold_seconds:

                loiterers.append({
                    "personId": person_id,
                    "duration": round(
                        duration,
                        2
                    ),
                    "event":
                        "LOITERING"
                })

        return loiterers