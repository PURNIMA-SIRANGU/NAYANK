from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from pydantic import BaseModel
import shutil
import uuid

# Services
from services.behavior_service import BehaviorService
from services.transcription_service import TranscriptionService
from services.language_service import LanguageService
from services.summary_service import SummaryService
from services.video_service import VideoService
from services.recommendation_service import RecommendationService
from services.report_service import ReportService
from services.event_service import EventService
from services.incident_classifier import IncidentClassifier
from services.investigation_service import InvestigationService
from services.copilot_service import CopilotService
from services.case_service import CaseService
from services.timeline_service import TimelineService
from services.dashboard_service import DashboardService
from services.scene_classifier import SceneClassifier  # STEP 1: Imported SceneClassifier

app = FastAPI()

# Engine Initializations
report_service = ReportService()
transcriber = TranscriptionService()
language_detector = LanguageService()
summarizer = SummaryService()
behavior_analyzer = BehaviorService()
video_analyzer = VideoService()
copilot = CopilotService()
event_engine = EventService()
case_engine = CaseService()
timeline_engine = TimelineService()
incident_engine = IncidentClassifier()
investigation_engine = InvestigationService()
recommendation_engine = RecommendationService()
dashboard_engine = DashboardService()
scene_engine = SceneClassifier()  # STEP 2: Created scene_engine


# --- Pydantic Data Models ---

class AudioRequest(BaseModel):
    audio_url: str

class RecommendationRequest(BaseModel):
    case_title: str
    summary: str
    risk_level: str

class CaseRequest(BaseModel):
    case_id: str
    title: str
    case_type: str

class EvidenceRequest(BaseModel):
    evidence_type: str
    file_name: str

class VideoRequest(BaseModel):
    video_url: str

class SummaryRequest(BaseModel):
    text: str

class IncidentRequest(BaseModel):
    video_url: str
    description: str

class ReportRequest(BaseModel):
    case_title: str
    persons: int
    vehicles: int
    vehicle_count: int
    risk_indicator: str

class CaseAnalysisRequest(BaseModel):
    video_path: str
    description: str


# --- Base Endpoints ---

@app.get("/")
def home():
    return {"message": "AI Engine Running"}

@app.post("/transcribe")
def transcribe_audio(request: AudioRequest):
    result = transcriber.transcribe(request.audio_url)
    return result

@app.post("/detect-language")
def detect_language(request: SummaryRequest):
    language = language_detector.detect(request.text)
    return {"language": language}

@app.post("/summarize")
def summarize_text(request: SummaryRequest):
    summary = summarizer.summarize(request.text)
    return {"summary": summary}

@app.post("/behavior-analysis")
def behavior_analysis(request: SummaryRequest):
    result = behavior_analyzer.analyze(request.text)
    return result

@app.post("/investigation-report")
def generate_investigation_report(request: SummaryRequest):
    report = summarizer.summarize(request.text)
    return {"report": report}


# --- Video & File Endpoints ---

@app.post("/video-analysis")
def video_analysis(request: VideoRequest):
    result = video_analyzer.analyze(request.video_url)
    return result

@app.post("/video-analysis/upload")
async def analyze_uploaded_video(file: UploadFile = File(...)):
    filename = f"{uuid.uuid4()}.mp4"
    filepath = f"uploads/{filename}"

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = video_analyzer.analyze(filepath)
    return result

@app.get("/video/{filename}")
def watch_video(filename: str):
    return FileResponse(f"outputs/{filename}", media_type="video/mp4")

@app.get("/download/{filename}")
def download_video(filename: str):
    return FileResponse(f"outputs/{filename}", filename=filename)


# --- Case Management Endpoints (SANKET) ---

@app.post("/cases")
def create_case(request: CaseRequest):
    return case_engine.create_case(
        request.case_id,
        request.title,
        request.case_type
    )

@app.get("/cases/{case_id}")
def get_case(case_id: str):
    case = case_engine.get_case(case_id)

    if not case:
        return {"message": "Case not found"}

    return case

@app.post("/cases/{case_id}/evidence")
def add_evidence(case_id: str, request: EvidenceRequest):
    return case_engine.add_evidence(
        case_id,
        {
            "type": request.evidence_type,
            "file": request.file_name
        }
    )


# --- NAYANK Orchestration: AI to Case Integration ---

@app.post("/cases/{case_id}/analyze")
def analyze_case(case_id: str, request: CaseAnalysisRequest):
    # 1. AI Evidence Analysis (NETHRAI)
    analysis = video_analyzer.analyze(request.video_path)
    
    # STEP 3: Classify the scene based on raw analysis
    scene = scene_engine.classify(analysis)
    
    events = event_engine.generate_events(analysis)
    
    # 2. Incident & Investigation Synthesis
    incident = incident_engine.classify(analysis, events, request.description)
    report = investigation_engine.generate(incident, analysis, events)
    
    # STEP 4: Inject the scene into the report
    report["scene"] = scene
    
    timeline = timeline_engine.generate(
        analysis.get("entryExitEvents", []),
        analysis.get("loiteringEvents", [])
    )
    
    scene_type = report["scene"]["sceneType"]
    copilot_summary = copilot.generate(analysis, report, scene_type)

    # 3. Case Management Updates (SANKET)
    # Store the raw analysis as evidence
    case_engine.add_evidence(
        case_id,
        {
            "type": "analysis",
            "result": analysis
        }
    )

    # Populate the case timeline
    for event in timeline:
        case_engine.add_timeline_event(case_id, event)

    # Escalate or de-escalate case risk
    case_engine.update_risk(case_id, report["riskLevel"])

    return {
        "caseId": case_id,
        "report": report,
        "timeline": timeline,
        "copilotSummary": copilot_summary
    }


# --- Legacy / Standalone Investigation Endpoints ---

@app.post("/investigation-recommendations")
def investigation_recommendations(request: RecommendationRequest):
    return recommendation_engine.generate(
        request.case_title,
        request.summary,
        request.risk_level,
    )

@app.post("/generate-report")
def generate_report(request: ReportRequest):
    file_name = "outputs/report.pdf"
    
    report_service.generate(
        request.dict(),
        file_name,
    )

    return {"report": file_name}

@app.post("/incident-analysis")
def incident_analysis(request: IncidentRequest):
    analysis = video_analyzer.analyze(request.video_url)
    events = event_engine.generate_events(analysis)
    
    incident = incident_engine.classify(
        analysis,
        events,
        request.description
    )

    report = investigation_engine.generate(
        incident,
        analysis,
        events
    )

    timeline = timeline_engine.generate(
        analysis.get("entryExitEvents", []),
        analysis.get("loiteringEvents", [])
    )

    scene_type = report["scene"]["sceneType"]

    copilot_summary = copilot.generate(
        analysis,
        report,
        scene_type
    )

    return {
        "report": report,
        "timeline": timeline,
        "copilotSummary": copilot_summary
    }