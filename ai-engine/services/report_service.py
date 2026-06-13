from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


class ReportService:

    def generate(
        self,
        data,
        file_name,
    ):

        pdf = SimpleDocTemplate(
            file_name
        )

        styles = (
            getSampleStyleSheet()
        )

        content = []

        content.append(
            Paragraph(
                "NETHRAI Investigation Report",
                styles["Title"]
            )
        )

        content.append(
            Spacer(1, 20)
        )

        for key, value in data.items():

            content.append(
                Paragraph(
                    f"<b>{key}</b>: {value}",
                    styles["BodyText"]
                )
            )

        pdf.build(content)

        return file_name