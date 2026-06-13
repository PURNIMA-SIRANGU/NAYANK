class EventService:

    def generate_events(
        self,
        analysis,
    ):

        events = []

        if analysis["crowdLevel"] == "HIGH":
            events.append(
                "Crowd Formation"
            )

        if (
            analysis["vehicleActivity"]
            == "HIGH"
        ):
            events.append(
                "Heavy Vehicle Activity"
            )

        if (
            analysis["trackedObjects"]
            > 50
        ):
            events.append(
                "High Object Movement"
            )

        if (
            len(
                analysis.get(
                    "suspiciousVehicles",
                    []
                )
            ) > 0
        ):
            events.append(
                "Suspicious Vehicle Activity"
            )

        if (
            len(
                analysis.get(
                    "wrongWayVehicles",
                    []
                )
            ) > 0
        ):
            events.append(
                "Wrong Way Movement"
            )

        return events