class RecommendationService:

    def generate(
        self,
        case_title,
        summary,
        risk_level,
    ):

        recommendations = []

        if risk_level == "HIGH":
            recommendations.append(
                "Escalate investigation to supervisor"
            )

        recommendations.append(
            "Review all available evidence"
        )

        recommendations.append(
            "Conduct follow-up interviews"
        )

        recommendations.append(
            "Cross-check witness statements"
        )

        recommendations.append(
            "Verify related records and documents"
        )

        return {
            "recommendations":
            recommendations
        }