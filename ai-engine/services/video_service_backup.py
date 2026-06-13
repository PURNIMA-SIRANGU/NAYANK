from ultralytics import YOLO
import cv2

class VideoService:

    def analyze(self, video_path):

        model = YOLO("yolov8m.pt")

        cap = cv2.VideoCapture(video_path)

        max_persons = 0

        max_cars = 0
        max_bikes = 0
        max_buses = 0
        max_trucks = 0

        frame_count = 0

        while True:

            success, frame = cap.read()

            if not success:
                break

            frame_count += 1

            # Process every 10th frame
            if frame_count % 10 != 0:
                continue

            results = model(frame)

            persons = 0

            cars = 0
            bikes = 0
            buses = 0
            trucks = 0

            for result in results:

                for box in result.boxes:

                    cls = int(box.cls[0])

                    # Person
                    if cls == 0:
                        persons += 1

                    # Car
                    elif cls == 2:
                        cars += 1

                    # Motorcycle
                    elif cls == 3:
                        bikes += 1

                    # Bus
                    elif cls == 5:
                        buses += 1

                    # Truck
                    elif cls == 7:
                        trucks += 1

            max_persons = max(max_persons, persons)

            max_cars = max(max_cars, cars)
            max_bikes = max(max_bikes, bikes)
            max_buses = max(max_buses, buses)
            max_trucks = max(max_trucks, trucks)

        cap.release()

        total_vehicles = (
            max_cars
            + max_bikes
            + max_buses
            + max_trucks
        )

        # Crowd Level

        crowd_level = "LOW"

        if max_persons > 20:
            crowd_level = "MEDIUM"

        if max_persons > 50:
            crowd_level = "HIGH"

        # Vehicle Activity

        vehicle_activity = "LOW"

        if total_vehicles > 5:
            vehicle_activity = "MEDIUM"

        if total_vehicles > 15:
            vehicle_activity = "HIGH"

        # Risk Indicator

        risk_indicator = "NORMAL"

        if crowd_level == "HIGH":
            risk_indicator = "SUSPICIOUS"

        if (
            crowd_level == "HIGH"
            and total_vehicles > 10
        ):
            risk_indicator = "HIGH_RISK"

        return {
            "persons": max_persons,

            "cars": max_cars,
            "bikes": max_bikes,
            "buses": max_buses,
            "trucks": max_trucks,

            "vehicles": total_vehicles,

            "crowdLevel": crowd_level,

            "vehicleActivity":
                vehicle_activity,

            "riskIndicator":
                risk_indicator,

            "plates": "Unknown",

            "summary":
                f"{max_persons} persons, "
                f"{max_cars} cars, "
                f"{max_bikes} bikes, "
                f"{max_buses} buses, "
                f"{max_trucks} trucks detected"
        }