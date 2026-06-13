from services.recommendation_engine_v2 import (
    RecommendationEngineV2
)

from services.timeline_ai import (
    TimelineAI
)

from services.scene_classifier import (
    SceneClassifier
)


class InvestigationService:

    def __init__(self):

        self.recommendations = (
            RecommendationEngineV2()
        )

        self.timeline = (
            TimelineAI()
        )

        self.scene = (
            SceneClassifier()
        )

    def generate(
        self,
        incident,
        analysis,
        events,
    ):

        recommendation_list = (
            self.recommendations.generate(
                incident[
                    "incidentType"
                ]
            )
        )

        timeline = (
            self.timeline.generate(
                analysis
            )
        )

        scene = (
            self.scene.classify(
                analysis
            )
        )

        summary = (
            f"{incident['incidentType']} "
            f"detected with "
            f"{incident['confidence']}% "
            f"confidence."
        )

        return {

            "scene":
                scene,

            "incident":
                incident,

            "events":
                events,

            "timeline":
                timeline,

            "recommendations":
                recommendation_list,

            "summary":
                summary,

            "riskLevel":
                analysis[
                    "riskIndicator"
                ],

            "analysis":
                analysis
        }