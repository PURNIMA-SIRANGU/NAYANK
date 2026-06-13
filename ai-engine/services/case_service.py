from models.case import Case


class CaseService:

    def __init__(self):

        self.cases = {}

    def create_case(
        self,
        case_id,
        title,
        case_type
    ):

        case = Case(
            case_id,
            title,
            case_type
        )

        self.cases[
            case_id
        ] = case

        return case.to_dict()

    def get_case(
        self,
        case_id
    ):

        case = self.cases.get(
            case_id
        )

        if not case:
            return None

        return case.to_dict()

    def add_evidence(
        self,
        case_id,
        evidence
    ):

        case = self.cases.get(
            case_id
        )

        if not case:
            return None

        case.evidence.append(
            evidence
        )

        return case.to_dict()

    def add_timeline_event(
        self,
        case_id,
        event
    ):

        case = self.cases.get(
            case_id
        )

        if not case:
            return None

        case.timeline.append(
            event
        )

        return case.to_dict()

    def update_risk(
        self,
        case_id,
        risk_level
    ):

        case = self.cases.get(
            case_id
        )

        if not case:
            return None

        case.risk_level = (
            risk_level
        )

        return case.to_dict()