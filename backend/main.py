import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import random

# Load environment variables from .env file if it exists
load_dotenv()

# Configuration
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")
SARVAM_CHAT_URL = "https://api.sarvam.ai/v1/chat/completions"
SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech"
CHAT_MODEL = "sarvam-30b"
TTS_MODEL = "bulbul:v3"

def get_sarvam_completion(prompt: str) -> str:
    """Helper function to call Sarvam AI Chat Completion"""
    if not SARVAM_API_KEY:
        raise HTTPException(status_code=500, detail="SARVAM_API_KEY is not set")
    
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
        response.raise_for_status()
        data = response.json()
        return data['choices'][0]['message']['content']
    except Exception as e:
        error_msg = f"Sarvam AI Error: {str(e)}"
        print(error_msg)
        return "I'm having trouble connecting to the Sarvam AI analysis engine right now. Please try again in a moment."

app = FastAPI(title="Sarvam AI Chat Test Service")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.post("/chat", response_model=ChatResponse)
async def chat_completion(request: ChatRequest):
    reply = get_sarvam_completion(request.message)
    return ChatResponse(reply=reply)

class TTSRequest(BaseModel):
    text: str

@app.post("/tts")
async def text_to_speech(request: TTSRequest):
    if not SARVAM_API_KEY:
        raise HTTPException(status_code=500, detail="SARVAM_API_KEY is not set")

    # Bulbul V3 Payload
    payload = {
        "inputs": [request.text],
        "model": TTS_MODEL,
        "target_language_code": "en-IN", # Multi-language but defaulting to English context
        "speaker": "shubh", # Premium V3 voice
        "output_audio_format": "mp3",
        "sampling_rate": 24000
    }

    headers = {
        "API-Subscription-Key": SARVAM_API_KEY,
        "Content-Type": "application/json"
    }

    try:
        # Get full content first to avoid streaming issues in some browsers
        response = requests.post(
            SARVAM_TTS_URL, 
            json=payload, 
            headers=headers,
            timeout=45
        )
        
        if response.status_code != 200:
            error_msg = response.text
            print(f"TTS Error: {error_msg}")
            raise HTTPException(status_code=response.status_code, detail=f"Sarvam TTS Error: {error_msg}")

        # Return the full content as a response
        from fastapi.responses import Response
        return Response(
            content=response.content,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "inline; filename=speech.mp3",
                "Accept-Ranges": "bytes",
                "Content-Length": str(len(response.content))
            }
        )

    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Sarvam TTS API request timed out")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class AnalyzeRequest(BaseModel):
    claim_amount: float
    expected_amount: float
    policy_age_days: int
    claim_frequency: int

class AnalyzeResponse(BaseModel):
    risk_score: int
    signals: List[str]
    explanation: str

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_claim(request: AnalyzeRequest):
    # 1. Generate dummy risk score
    risk_score = random.randint(60, 95)

    # 2. Rule-based signal generation
    signals = []
    if request.claim_amount > (2 * request.expected_amount):
        signals.append("High claim amount")
    if request.policy_age_days < 30:
        signals.append("New policy risk")
    if request.claim_frequency > 2:
        signals.append("High claim frequency")
    
    # 3. Construct AI Prompt
    prompt = f"""
You are an insurance fraud analyst. 

Claim Details:
- Claim Amount: ₹{request.claim_amount}
- Expected Amount: ₹{request.expected_amount}
- Policy Age: {request.policy_age_days} days
- Claim Frequency: {request.claim_frequency}

Risk Score: {risk_score}

Fraud Signals:
- {', '.join(signals) if signals else 'No immediate red flags'}

Explain clearly in 2-3 lines why this claim is risky.
"""

    # 4. Get explanation from Sarvam AI
    explanation = get_sarvam_completion(prompt)

    return AnalyzeResponse(
        risk_score=risk_score,
        signals=signals,
        explanation=explanation
    )

@app.get("/")
async def health():
    return {"status": "healthy", "chat_model": CHAT_MODEL, "tts_model": TTS_MODEL}

if __name__ == "__main__":
    import uvicorn
    # This block is just for direct script execution, 
    # normally run via: uvicorn main:app --reload
    uvicorn.run(app, host="0.0.0.0", port=8000)
