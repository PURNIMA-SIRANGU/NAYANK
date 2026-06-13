class IncidentClassifier:

    def classify(
        self,
        analysis,
        events,
        description,
    ):

        description = (
            description.lower()
        )

        incident = (
            "Normal Activity"
        )

        confidence = 60

        if "theft" in description:

            incident = (
                "Possible Theft"
            )

            confidence = 85

        elif "robbery" in description:

            incident = (
                "Possible Robbery"
            )

            confidence = 88

        elif "murder" in description:

            incident = (
                "Possible Homicide"
            )

            confidence = 92

        elif "assault" in description:

            incident = (
                "Possible Assault"
            )

            confidence = 85

        elif (
            len(
                analysis.get(
                    "wrongWayVehicles",
                    []
                )
            ) > 0
        ):

            incident = (
                "Traffic Violation"
            )

            confidence = 85

        elif (
            len(
                analysis.get(
                    "suspiciousVehicles",
                    []
                )
            ) > 0
        ):

            incident = (
                "Suspicious Activity"
            )

            confidence = 80

        elif (
            analysis["crowdLevel"]
            == "HIGH"
        ):

            incident = (
                "Crowd Incident"
            )

            confidence = 75

        return {
            "incidentType":
                incident,

            "confidence":
                confidence
        }