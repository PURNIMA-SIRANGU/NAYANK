from datetime import datetime


class AuditService:

    def __init__(self):

        self.logs = []

    def log(
        self,
        action,
        case_id=None
    ):

        entry = {

            "timestamp":
                datetime.now()
                .strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),

            "caseId":
                case_id,

            "action":
                action
        }

        self.logs.append(
            entry
        )

        return entry

    def get_logs(self):

        return self.logs