import easyocr


class PlateService:

    def __init__(self):

        self.reader = easyocr.Reader(
            ['en'],
            gpu=False
        )

    def detect_plate(self, image):

        results = self.reader.readtext(
            image
        )

        if not results:
            return {
                "plate": "Unknown",
                "visible": False
            }

        text = results[0][1]

        return {
            "plate": text,
            "visible": True
        }