class SceneClassifier:

    def classify(
        self,
        analysis
    ):

        persons = analysis.get(
            "persons",
            0
        )

        vehicles = analysis.get(
            "vehicles",
            0
        )

        crowd = analysis.get(
            "crowdLevel",
            "LOW"
        )

        if vehicles > 10:
            return {
                "sceneType":
                "Traffic Road"
            }

        if vehicles > 0 and persons > 0:
            return {
                "sceneType":
                "Residential Property"
            }

        if persons > 5:
            return {
                "sceneType":
                "Public Area"
            }

        if crowd == "HIGH":
            return {
                "sceneType":
                "Crowded Area"
            }

        return {
            "sceneType":
            "Unknown Environment"
        }