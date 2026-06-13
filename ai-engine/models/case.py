from datetime import datetime


class Case:

    def __init__(
        self,
        case_id,
        title,
        case_type
    ):

        self.case_id = case_id

        self.title = title

        self.case_type = case_type

        self.created_at = (
            datetime.now()
            .strftime(
                "%Y-%m-%d %H:%M:%S"
            )
        )

        self.status = "OPEN"

        self.evidence = []

        self.timeline = []

        self.risk_level = "LOW"

    def to_dict(self):

        return {
            "caseId":
                self.case_id,

            "title":
                self.title,

            "caseType":
                self.case_type,

            "createdAt":
                self.created_at,

            "status":
                self.status,

            "evidence":
                self.evidence,

            "timeline":
                self.timeline,

            "riskLevel":
                self.risk_level,
        }