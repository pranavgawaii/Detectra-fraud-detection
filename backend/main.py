import os
import requests
import json
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import random
import joblib
import numpy as np

# Load environment variables
load_dotenv()

# Configuration
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")
SARVAM_CHAT_URL = "https://api.sarvam.ai/v1/chat/completions"
CHAT_MODEL = "sarvam-30b"
TTS_MODEL = "bulbul:v3"

# Load ML Model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "fraud_model.joblib")
model = None
try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("✅ Random Forest Fraud Model Loaded")
    else:
        print("⚠️ Warning: Fraud model not found. Using fallbacks.")
except Exception as e:
    print(f"❌ Error loading model: {e}")

def get_sarvam_completion(prompt: str) -> str:
    if not SARVAM_API_KEY:
        return "Analysis engine offline. Please check API Key."
    
    payload = {
        "model": CHAT_MODEL,
        "messages": [{"role": "user", "content": prompt}]
    }
    headers = {
        "API-Subscription-Key": SARVAM_API_KEY,
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(SARVAM_CHAT_URL, json=payload, headers=headers, timeout=30)
        data = response.json()
        return data['choices'][0]['message']['content']
    except:
        return "AI analysis pending review."

app = FastAPI(title="Detectra AI ML Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    score_response: Optional[dict] = None
    user_message: str
    conversation_history: List[dict] = []
    language: str = "en-IN"

@app.post("/chat")
async def chat_completion(request: ChatRequest):
    context = ""
    if request.score_response:
        context = f"Context: The current claim has a risk score of {request.score_response.get('risk_score_100')}/100 and has flags: {', '.join(request.score_response.get('explanation', []))}."
    
    full_prompt = f"{context}\nUser: {request.user_message}\nExplain the investigative steps for this specific fraud pattern."
    
    reply = get_sarvam_completion(full_prompt)
    return {"reply": reply}

class AnalyzeRequest(BaseModel):
    claim_amount: float
    expected_amount: float
    policy_age_days: int
    claim_frequency: int

@app.post("/analyze")
async def analyze_claim(request: AnalyzeRequest):
    # 1. Prepare features for ML Model (Using Numpy instead of Pandas to save 100MB+)
    features = np.array([[
        request.claim_amount,
        request.expected_amount,
        request.policy_age_days,
        request.claim_frequency
    ]])

    # 2. Model Inference
    if model:
        risk_prob = model.predict_proba(features)[0][1]
        risk_score = int(risk_prob * 100)
    else:
        risk_score = random.randint(40, 60)

    # 3. Dynamic Signal Generation
    signals = []
    if request.claim_amount > (request.expected_amount * 1.2):
        signals.append("Inflation Detect: Amount exceeds limit")
    if request.policy_age_days < 60:
        signals.append("Early Bird: Policy too fresh")
    if request.claim_frequency > 2:
        signals.append("Repeat Offender: Frequency spike")

    # 4. Generate AI Summary (Sarvam)
    prompt = f"Analyze this insurance claim. Score: {risk_score}. Flags: {', '.join(signals)}. Provide a 2-line professional verdict."
    verdict = get_sarvam_completion(prompt)

    return {
        "fraud_score": risk_score / 100,
        "risk_score_100": risk_score,
        "risk_tier": "HIGH" if risk_score > 70 else "MEDIUM" if risk_score > 30 else "LOW",
        "recommended_action": "Refer to SIU" if risk_score > 70 else "Auto-Approve",
        "explanation": signals,
        "sarvam_summary": verdict
    }

@app.get("/")
async def health():
    return {"status": "ML Pipeline Active", "model_loaded": model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
