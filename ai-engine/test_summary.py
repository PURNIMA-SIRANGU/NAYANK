from services.summary_service import SummaryService

service = SummaryService()

text = """
A class in Java is a blueprint from which objects are created.
An object is an instance of a class.
Classes contain fields and methods.
"""

print(service.summarize(text))