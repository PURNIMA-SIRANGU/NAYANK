class DashboardService:

    def build(
        self,
        case,
        report,
        timeline,
        copilot
    ):

        return {

            "case": case,

            "scene":
                report.get(
                    "scene",
                    {}
                ),

            "incident":
                report.get(
                    "incident",
                    {}
                ),

            "risk":
                report.get(
                    "riskLevel",
                    "LOW"
                ),

            "timeline":
                timeline,

            "recommendations":
                report.get(
                    "recommendations",
                    []
                ),

            "copilot":
                copilot
        }