from ultralytics import YOLO
from services.plate_service import PlateService
import cv2
import uuid
import os
import time

class VideoService:

    def analyze(self, video_path):

        start_time = time.time()

        model = YOLO("yolov8x.pt")
        plate_detector = PlateService()

        cap = cv2.VideoCapture(video_path)

        os.makedirs("outputs", exist_ok=True)

        output_name = f"analysed_{uuid.uuid4().hex}.mp4"
        output_path = f"outputs/{output_name}"

        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)

        if fps <= 0:
            fps = 25

        writer = cv2.VideoWriter(
            output_path,
            cv2.VideoWriter_fourcc(*"mp4v"),
            fps,
            (width, height),
        )

        max_persons = 0
        max_cars = 0
        max_bikes = 0
        max_buses = 0
        max_trucks = 0

        unique_ids = set()
        detected_plates = set()
        stationary_frames = {}
        suspicious_objects = []
        previous_positions = {}
        vehicle_speeds = {}
        plate_cache = {} 
        
        wrong_way_vehicles = []
        restricted_entries = []
        restricted_zone = (100, 100, 500, 400)

        # STEP 1: Create Counter Variables
        vehicle_count = 0
        counted_ids = set()
        counting_line_y = height // 2
        tracked_persons = {}
        
        frame_count = 0

        while True:
            success, frame = cap.read()

            if not success:
                break
            
            frame_count += 1

            # STEP 2: Draw Counting Line
            cv2.line(
                frame,
                (0, counting_line_y),
                (width, counting_line_y),
                (0, 255, 0),
                3,
            )

            cv2.putText(
                frame,
                "COUNTING LINE",
                (20, counting_line_y - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2,
            )

            # Draw Restricted Zone
            cv2.rectangle(
                frame,
                (restricted_zone[0], restricted_zone[1]),
                (restricted_zone[2], restricted_zone[3]),
                (0, 0, 255),
                2
            )

            results = model.track(
                frame,
                persist=True,
                tracker="bytetrack.yaml",
                verbose=False,
            )

            persons = 0
            cars = 0
            bikes = 0
            buses = 0
            trucks = 0

            for result in results:
                if result.boxes is None:
                    continue

                for box in result.boxes:
                    cls = int(box.cls[0])
                    confidence = round(float(box.conf[0]), 2)

                    if confidence < 0.45:
                        continue

                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    track_id = "N/A"
                    is_wrong_way = False

                    if box.id is not None:
                        track_id = int(box.id[0])
                        unique_ids.add(track_id)

                        speed = 0

                        if cls in [2, 3, 5, 7]:
                            center_x = int((x1 + x2) / 2)
                            center_y = int((y1 + y2) / 2)

                            # STEP 3: Detect Vehicle Crossing
                            if center_y > counting_line_y and track_id not in counted_ids:
                                vehicle_count += 1
                                counted_ids.add(track_id)

                            if track_id in previous_positions:
                                old_x, old_y = previous_positions[track_id]
                                distance = (((center_x - old_x) ** 2 + (center_y - old_y) ** 2) ** 0.5)
                                estimated_speed = distance * 0.5
                                vehicle_speeds[track_id] = round(estimated_speed, 1)

                                direction = center_x - old_x
                                already_flagged = any(v["id"] == track_id for v in wrong_way_vehicles)
                                
                                if direction < -25 and not already_flagged:
                                    wrong_way_vehicles.append({
                                        "id": track_id,
                                        "type": result.names[cls],
                                        "reason": "Wrong direction"
                                    })
                                    is_wrong_way = True
                                elif already_flagged:
                                    is_wrong_way = True
                                
                            previous_positions[track_id] = (center_x, center_y)
                            speed = vehicle_speeds.get(track_id, 0)

                            if speed < 3:
                                stationary_frames[track_id] = stationary_frames.get(track_id, 0) + 1
                            else:
                                stationary_frames[track_id] = 0

                            if stationary_frames.get(track_id, 0) == 151:
                                suspicious_objects.append({
                                    "id": track_id,
                                    "type": result.names[cls],
                                    "reason": "Vehicle stationary too long"
                                })

                            rx1, ry1, rx2, ry2 = restricted_zone
                            if rx1 <= center_x <= rx2 and ry1 <= center_y <= ry2:
                                if not any(r["id"] == track_id for r in restricted_entries):
                                    restricted_entries.append({
                                        "id": track_id,
                                        "zone": "Evidence Area"
                                    })
                    else:
                        speed = 0

                    plate_number = "Unknown"
                    plate_visible = False

                    if cls in [2, 3, 5, 7] and track_id != "N/A":
                        if track_id not in plate_cache or plate_cache[track_id]["plate"] == "Unknown":
                            vehicle_crop = frame[
                                max(0, y1):min(frame.shape[0], y2),
                                max(0, x1):min(frame.shape[1], x2)
                            ]

                            if vehicle_crop.size > 0:
                                try:
                                    plate_data = plate_detector.detect_plate(vehicle_crop)
                                    plate_number = plate_data["plate"]
                                    plate_visible = plate_data["visible"]

                                    if plate_visible and plate_number != "Unknown":
                                        detected_plates.add(plate_number)
                                except Exception:
                                    pass
                                
                            plate_cache[track_id] = {"plate": plate_number, "visible": plate_visible}
                        else:
                            plate_number = plate_cache[track_id]["plate"]
                            plate_visible = plate_cache[track_id]["visible"]

                    label = result.names[cls]
                    color = (0, 255, 0)

                    if cls == 0:
                        color = (255, 0, 0)
                    elif cls == 2:
                        color = (0, 255, 0)
                    elif cls == 3:
                        color = (0, 255, 255)
                    elif cls == 5:
                        color = (255, 255, 0)
                    elif cls == 7:
                        color = (0, 0, 255)

                    cv2.rectangle(
                        frame,
                        (x1, y1),
                        (x2, y2),
                        color,
                        2,
                    )

                    speed = 0
                    if cls in [2, 3, 5, 7]:
                        speed = vehicle_speeds.get(track_id, 0)
                        display_text = f"{label.upper()} #{track_id} {speed}km/h {confidence}"
                    else:
                        display_text = f"{label.upper()} #{track_id} {confidence}"

                    cv2.putText(
                        frame,
                        display_text,
                        (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        color,
                        2,
                    )

                    if track_id != "N/A" and stationary_frames.get(track_id, 0) > 150:
                        cv2.putText(
                            frame,
                            "SUSPICIOUS",
                            (x1, y1 - 40),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.8,
                            (0, 0, 255),
                            2,
                        )

                    if is_wrong_way:
                        cv2.putText(
                            frame,
                            "WRONG WAY",
                            (x1, y1 - 60),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.8,
                            (0, 0, 255),
                            2,
                        )

                    if cls in [2, 3, 5, 7]:
                        if plate_visible:
                            cv2.putText(
                                frame,
                                f"PLATE: {plate_number}",
                                (x1, y2 + 20),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                0.5,
                                color,
                                2,
                            )
                        else:
                            cv2.putText(
                                frame,
                                "PLATE: NOT VISIBLE",
                                (x1, y2 + 20),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                0.5,
                                color,
                                2,
                            )

                    if cls == 0:
                        persons += 1
                        if track_id != "N/A":
                            if track_id not in tracked_persons:
                                tracked_persons[track_id] = {
                                    "first_seen": frame_count,
                                    "last_seen": frame_count
                                }
                            tracked_persons[track_id]["last_seen"] = frame_count
                            
                    elif cls == 2:
                        cars += 1
                    elif cls == 3:
                        bikes += 1
                    elif cls == 5:
                        buses += 1
                    elif cls == 7:
                        trucks += 1

            cv2.rectangle(frame, (0, 0), (550, 90), (0, 0, 0), -1)

            cv2.putText(frame, f"Persons: {persons}", (15, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(frame, f"Cars: {cars}", (180, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(frame, f"Bikes: {bikes}", (320, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(frame, f"Buses: {buses}", (15, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(frame, f"Trucks: {trucks}", (180, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(frame, f"Tracked: {len(unique_ids)}", (350, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            
            # STEP 4: Show Counter On Screen
            cv2.putText(frame, f"Counted: {vehicle_count}", (350, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

            legend_x = width - 220
            cv2.rectangle(frame, (legend_x - 10, 5), (width - 5, 140), (0, 0, 0), -1)

            cv2.putText(frame, "PERSON = Blue", (legend_x, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)
            cv2.putText(frame, "CAR = Green", (legend_x, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            cv2.putText(frame, "BIKE = Yellow", (legend_x, 75), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)
            cv2.putText(frame, "BUS = Cyan", (legend_x, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
            cv2.putText(frame, "TRUCK = Red", (legend_x, 125), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

            writer.write(frame)

            max_persons = max(max_persons, persons)
            max_cars = max(max_cars, cars)
            max_bikes = max(max_bikes, bikes)
            max_buses = max(max_buses, buses)
            max_trucks = max(max_trucks, trucks)

        cap.release()
        writer.release()

        processing_time = round(time.time() - start_time, 2)
        total_vehicles = max_cars + max_bikes + max_buses + max_trucks
        
        vehicle_breakdown = {
            "cars": max_cars,
            "bikes": max_bikes,
            "buses": max_buses,
            "trucks": max_trucks,
        }

        crowd_level = "LOW"
        if max_persons > 20:
            crowd_level = "MEDIUM"
        if max_persons > 50:
            crowd_level = "HIGH"

        vehicle_activity = "LOW"
        if total_vehicles > 5:
            vehicle_activity = "MEDIUM"
        if total_vehicles > 15:
            vehicle_activity = "HIGH"

        risk_indicator = "NORMAL"
        if crowd_level == "HIGH":
            risk_indicator = "SUSPICIOUS"
        if crowd_level == "HIGH" and total_vehicles > 10:
            risk_indicator = "HIGH_RISK"

        from services.entry_exit_detector import EntryExitDetector
        from services.loitering_detector import LoiteringDetector
        from services.theft_analyzer import TheftAnalyzer
        
        entry_exit = EntryExitDetector()
        loitering = LoiteringDetector()
        theft = TheftAnalyzer()
        
        entry_events = entry_exit.detect(tracked_persons, fps)
        loitering_events = loitering.detect(tracked_persons, fps)
        theft_report = theft.analyze(entry_events, loitering_events)

        return {
            "persons": max_persons,
            "cars": max_cars,
            "bikes": max_bikes,
            "buses": max_buses,
            "trucks": max_trucks,
            "vehicles": total_vehicles,
            "vehicleCount": vehicle_count,  # STEP 5: Return Count
            "vehicleBreakdown": vehicle_breakdown,
            "trackedObjects": len(unique_ids),
            "detectedPlates": list(detected_plates),
            "suspiciousObjects": suspicious_objects,
            "wrongWayVehicles": wrong_way_vehicles,
            "restrictedEntries": restricted_entries,
            "crowdLevel": crowd_level,
            "vehicleActivity": vehicle_activity,
            "riskIndicator": risk_indicator,
            "processingTime": processing_time,
            "processedVideo": output_name,
            "watchUrl": f"/video/{output_name}",
            "downloadUrl": f"/download/{output_name}",
            "summary": f"{max_persons} persons, {max_cars} cars, {max_bikes} bikes, {max_buses} buses, {max_trucks} trucks detected",
            "entryExitEvents": entry_events,
            "loiteringEvents": loitering_events,
            "theftAnalysis": theft_report,
        }