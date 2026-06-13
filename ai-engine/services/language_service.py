from langdetect import detect

class LanguageService:

    def detect(self, text):
        return detect(text)