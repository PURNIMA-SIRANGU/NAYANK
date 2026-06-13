from services.language_service import LanguageService

service = LanguageService()

print(
    service.detect_language(
        "What is class in Java?"
    )
)