class RecommendationEngineV2:

    def generate(
        self,
        incident_type,
    ):

        recommendations = []

        if incident_type == "Possible Theft":

            recommendations.extend([
                "Review entry and exit footage",
                "Identify suspicious vehicles",
                "Cross-check witness statements",
                "Verify nearby CCTV footage",
            ])

        elif incident_type == "Possible Homicide":

            recommendations.extend([
                "Review all detected persons",
                "Generate movement timeline",
                "Escalate case to supervisor",
                "Correlate witness interviews",
            ])

        elif incident_type == "Possible Assault":

            recommendations.extend([
                "Identify involved individuals",
                "Review crowd activity",
                "Cross-check nearby cameras",
            ])

        elif incident_type == "Traffic Violation":

            recommendations.extend([
                "Verify vehicle plate",
                "Review traffic footage",
                "Check traffic regulations",
            ])

        elif incident_type == "Crowd Incident":

            recommendations.extend([
                "Review crowd formation",
                "Identify suspicious movement",
                "Verify public safety concerns",
            ])

        else:

            recommendations.extend([
                "Review footage manually",
                "Verify all available evidence",
            ])

        return recommendations