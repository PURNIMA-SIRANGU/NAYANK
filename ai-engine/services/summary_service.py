from transformers import pipeline

class SummaryService:

    def __init__(self):
        self.summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn"
        )

    def summarize(self, text):
        result = self.summarizer(
            text,
            max_length=100,
            min_length=20,
            do_sample=False
        )

        return result[0]["summary_text"]