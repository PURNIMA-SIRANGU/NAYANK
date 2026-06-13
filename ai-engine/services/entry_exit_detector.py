class EntryExitDetector:

    def detect(
        self,
        tracked_persons,
        fps,
    ):

        events = []

        for person_id, data in tracked_persons.items():

            first_frame = data["first_seen"]
            last_frame = data["last_seen"]

            entry_time = round(
                first_frame / fps,
                2
            )

            exit_time = round(
                last_frame / fps,
                2
            )

            duration = round(
                exit_time - entry_time,
                2
            )

            events.append({
                "personId": person_id,
                "entryTime": entry_time,
                "exitTime": exit_time,
                "duration": duration
            })

        return events