class CopilotService:

    def generate(
        self,
        analysis,
        report,
        scene_type="Unknown Environment"
    ):

        persons = analysis.get(
            "persons",
            0
        )

        vehicles = analysis.get(
            "vehicles",
            0
        )

        entry_events = analysis.get(
            "entryExitEvents",
            []
        )

        loitering_events = analysis.get(
            "loiteringEvents",
            []
        )

        theft_analysis = analysis.get(
            "theftAnalysis",
            {}
        )

        incident = report.get(
            "incident",
            {}
        )

        recommendations = report.get(
            "recommendations",
            []
        )

        risk_level = report.get(
            "riskLevel",
            "NORMAL"
        )

        incident_type = incident.get(
            "incidentType",
            "Unknown"
        )

        incident_confidence = incident.get(
            "confidence",
            0
        )

        theft_type = theft_analysis.get(
            "incidentType",
            "Unknown"
        )

        theft_confidence = theft_analysis.get(
            "confidence",
            0
        )

        narrative = []

        narrative.append(
            f"The footage appears to show {scene_type}."
        )

        if persons == 1:
            narrative.append(
                "One individual was detected within the monitored area."
            )

        elif persons > 1:
            narrative.append(
                f"{persons} individuals were detected within the monitored area."
            )

        if vehicles == 1:
            narrative.append(
                "One vehicle was observed near the scene."
            )

        elif vehicles > 1:
            narrative.append(
                f"{vehicles} vehicles were observed near the scene."
            )

        if len(entry_events) > 0:
            narrative.append(
                f"{len(entry_events)} entry and exit activities were recorded."
            )

        if len(loitering_events) > 0:
            narrative.append(
                "Potential loitering behaviour was identified during the analysis."
            )
        else:
            narrative.append(
                "No significant loitering behaviour was observed."
            )

        if theft_type != "Unknown":
            narrative.append(
                f"Behavioural analysis classified the activity as '{theft_type}' with {theft_confidence}% confidence."
            )

        if incident_type != "Unknown":
            narrative.append(
                f"The investigation engine classified the incident as '{incident_type}' with {incident_confidence}% confidence."
            )

        narrative.append(
            f"Overall risk assessment: {risk_level}."
        )

        if recommendations:
            narrative.append(
                "Recommended actions include "
                + ", ".join(
                    [r.lower() for r in recommendations]
                )
                + "."
            )

        return " ".join(narrative)