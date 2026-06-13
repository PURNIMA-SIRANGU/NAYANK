class CorrelationService:

    def correlate(
        self,
        case_a,
        case_b
    ):

        matches = []

        evidence_a = case_a.get(
            "evidence",
            []
        )

        evidence_b = case_b.get(
            "evidence",
            []
        )

        for item_a in evidence_a:

            for item_b in evidence_b:

                if item_a == item_b:

                    matches.append(
                        item_a
                    )

        return {

            "matches":
                matches,

            "matchCount":
                len(matches)
        }