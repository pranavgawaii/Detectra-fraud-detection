"""
DETECTRA — FastAPI Scoring Endpoint + Sarvam AI Conversational Layer
=====================================================================
Backend team: Drop detectra_model.pkl in the same folder, then:

    pip install fastapi uvicorn xgboost scikit-learn shap pandas numpy joblib imbalanced-learn httpx

    Set env vars:
        SARVAM_API_KEY=your_sarvam_key_here

    Run:
        uvicorn detectra_api:app --reload --port 8000

Endpoints:
    POST /score-claim          → XGBoost fraud score + SHAP explanation
    POST /sarvam-chat          → Chat with Sarvam AI about a scored claim
    POST /sarvam-voice-brief   → Sarvam Bulbul v3 TTS audio summary of a claim
    GET  /health               → Liveness check
"""

import os
import base64
import logging
import traceback
import httpx
import joblib
import pandas as pd
import numpy as np
import shap

# ── Logger ────────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
log = logging.getLogger("detectra")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, Field
from typing import Optional

# ─────────────────────────────────────────────────────────────────────────────
# App init
# ─────────────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="DETECTRA Fraud Detection API",
    description="Real-time insurance claim fraud scoring (XGBoost + SHAP) with Sarvam AI conversational layer",
    version="1.1.0",
)

# ─────────────────────────────────────────────────────────────────────────────
# Fix #1 (HIGH): CORS — allow the Next.js frontend and any localhost dev port
# In production replace the localhost origins with your actual Vercel URL.
# ─────────────────────────────────────────────────────────────────────────────
ALLOWED_ORIGINS = [
    os.getenv("FRONTEND_URL", "http://localhost:3000"),  # Next.js dev server
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    # Production domains
    "https://detectra.in",
    "https://www.detectra.in",
    # Add your Vercel preview URL here too if needed, e.g.:
    # "https://detectra-fraud-detection.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────────────────────────
# Sarvam AI config
# ─────────────────────────────────────────────────────────────────────────────
SARVAM_API_KEY   = os.getenv("SARVAM_API_KEY", "")
SARVAM_BASE_URL  = "https://api.sarvam.ai"
SARVAM_CHAT_URL  = f"{SARVAM_BASE_URL}/v1/chat/completions"
SARVAM_TTS_URL   = f"{SARVAM_BASE_URL}/text-to-speech"
# Fix #4 (LOW): Updated model constants per README recommendation
SARVAM_MODEL     = "sarvam-30b"       # upgraded from sarvam-2b
SARVAM_TTS_MODEL = "bulbul:v3"        # upgraded from bulbul:v1

SARVAM_HEADERS = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json",
}

# ─────────────────────────────────────────────────────────────────────────────
# Load model pipeline once at startup
# ─────────────────────────────────────────────────────────────────────────────
log.info("Loading DETECTRA model pipeline...")
try:
    pipe = joblib.load("detectra_model.pkl")
except Exception as exc:
    log.critical("Failed to load detectra_model.pkl: %s", exc)
    raise

# ── Startup validation — fail fast if the pkl is missing required keys ────────
_REQUIRED_PIPE_KEYS = {
    "model", "encoder", "explainer", "features", "cat_cols", "num_cols",
    "agent_stats", "vendor_stats",
}
_missing = _REQUIRED_PIPE_KEYS - set(pipe.keys())
if _missing:
    raise RuntimeError(
        f"detectra_model.pkl is missing required keys: {_missing}. "
        "Re-train the model or check the pkl generation notebook."
    )
log.info("✅ Model loaded — %d features, %d cat cols, %d num cols",
         len(pipe['features']), len(pipe['cat_cols']), len(pipe['num_cols']))

# ─────────────────────────────────────────────────────────────────────────────
# Fix #2 (MEDIUM): Pre-compute training-time medians for numeric null-fill.
# These are stored in the pipeline dict at training time. If not present we
# fall back to 0 (old behaviour) so existing .pkl files keep working.
# ─────────────────────────────────────────────────────────────────────────────
_NUM_MEDIANS: dict = pipe.get("num_medians", {})

# ─────────────────────────────────────────────────────────────────────────────
# Request / Response schemas
# ─────────────────────────────────────────────────────────────────────────────

class ClaimRequest(BaseModel):
    # ── Categorical ───────────────────────────────────────────────────────
    INSURANCE_TYPE:           str            = Field(..., example="Health")
    MARITAL_STATUS:           str            = Field(..., example="Y")
    EMPLOYMENT_STATUS:        str            = Field(..., example="Y")
    RISK_SEGMENTATION:        str            = Field(..., example="H")
    HOUSE_TYPE:               str            = Field(..., example="Own")
    SOCIAL_CLASS:             str            = Field(..., example="MI")
    CUSTOMER_EDUCATION_LEVEL: Optional[str]  = Field(None, example="Bachelor")
    INCIDENT_SEVERITY:        str            = Field(..., example="Total Loss")
    AUTHORITY_CONTACTED:      Optional[str]  = Field(None, example="Police")
    # ── Numerical ─────────────────────────────────────────────────────────
    AGE:                      int            = Field(..., example=45)
    TENURE:                   int            = Field(..., example=60)
    PREMIUM_AMOUNT:           float          = Field(..., example=150.0)
    CLAIM_AMOUNT:             float          = Field(..., example=85000)
    NO_OF_FAMILY_MEMBERS:     int            = Field(..., example=3)
    INCIDENT_HOUR_OF_THE_DAY: int            = Field(..., example=2)
    ANY_INJURY:               int            = Field(..., example=0)
    POLICE_REPORT_AVAILABLE:  int            = Field(..., example=0)
    # ── Dates (ISO: YYYY-MM-DD) ───────────────────────────────────────────
    LOSS_DT:                  str            = Field(..., example="2024-01-15")
    REPORT_DT:                str            = Field(..., example="2024-01-20")
    POLICY_EFF_DT:            str            = Field(..., example="2023-12-01")
    # ── IDs ───────────────────────────────────────────────────────────────
    AGENT_ID:                 Optional[str]  = Field(None, example="AGENT00413")
    VENDOR_ID:                Optional[str]  = Field(None, example="VNDR00556")


class SHAPFactor(BaseModel):
    feature:      str
    impact:       float
    direction:    str
    plain_english: str


class ScoreResponse(BaseModel):
    fraud_score:        float            # 0.0 → 1.0
    risk_score_100:     int              # 0 → 100 (for display)
    risk_tier:          str              # LOW | MEDIUM | HIGH
    recommended_action: str
    explanation:        list[SHAPFactor]
    sarvam_summary:     str              # AI-generated plain-English brief


class ChatRequest(BaseModel):
    """
    After scoring a claim, the dashboard sends:
      - The full ScoreResponse (as context)
      - The investigator's question
      - Optional conversation history for multi-turn chat
    """
    score_response:    dict              = Field(..., description="The full /score-claim response JSON")
    user_message:      str               = Field(..., example="Why is this claim flagged as high risk?")
    conversation_history: list[dict]     = Field(default=[], description="Previous [{role,content}] turns")
    language:          str               = Field(default="en-IN", example="en-IN",
                                                 description="BCP-47 lang code: en-IN, hi-IN, ta-IN, etc.")


class ChatResponse(BaseModel):
    reply:    str
    language: str


class VoiceBriefRequest(BaseModel):
    score_response: dict = Field(..., description="The full /score-claim response JSON")
    language:       str  = Field(default="en-IN")
    speaker:        str  = Field(default="meera", description="Sarvam TTS speaker voice")


# ─────────────────────────────────────────────────────────────────────────────
# Feature engineering (mirrors training exactly)
# ─────────────────────────────────────────────────────────────────────────────
def engineer_features(claim: ClaimRequest) -> pd.DataFrame:
    # model_dump() is the Pydantic v2 API; .dict() is kept as alias but deprecated
    row = pd.DataFrame([claim.model_dump()])

    row["LOSS_DT"]       = pd.to_datetime(row["LOSS_DT"])
    row["REPORT_DT"]     = pd.to_datetime(row["REPORT_DT"])
    row["POLICY_EFF_DT"] = pd.to_datetime(row["POLICY_EFF_DT"])

    row["days_to_report"]   = (row["REPORT_DT"] - row["LOSS_DT"]).dt.days.clip(lower=0)
    row["policy_age_days"]  = (row["LOSS_DT"] - row["POLICY_EFF_DT"]).dt.days.clip(lower=0)
    row["new_policy_flag"]  = (row["policy_age_days"] < 180).astype(int)
    row["weekend_incident"] = (row["LOSS_DT"].dt.dayofweek >= 5).astype(int)
    row["odd_hour"]         = row["INCIDENT_HOUR_OF_THE_DAY"].isin([0, 1, 2, 3, 22, 23]).astype(int)
    row["claim_to_premium"] = row["CLAIM_AMOUNT"] / (row["PREMIUM_AMOUNT"] + 1)
    row["no_proof_flag"]    = (
        (row["POLICE_REPORT_AVAILABLE"] == 0) & (row["ANY_INJURY"] == 0)
    ).astype(int)
    row["total_loss"] = (row["INCIDENT_SEVERITY"] == "Total Loss").astype(int)

    amatch = pipe["agent_stats"][pipe["agent_stats"]["AGENT_ID"] == claim.AGENT_ID]
    row["agent_fraud_rate"]  = amatch["agent_fraud_rate"].values[0]  if len(amatch) else 0.05
    row["agent_claim_count"] = amatch["agent_claim_count"].values[0] if len(amatch) else 1

    vmatch = pipe["vendor_stats"][pipe["vendor_stats"]["VENDOR_ID"] == claim.VENDOR_ID]
    row["vendor_fraud_rate"] = vmatch["vendor_fraud_rate"].values[0] if len(vmatch) else 0.05

    return row


PLAIN_ENGLISH_MAP = {
    "agent_fraud_rate":        "Assigned agent has a high historical fraud rate",
    "vendor_fraud_rate":       "Associated vendor frequently appears in fraudulent claims",
    "claim_to_premium":        "Claim amount is disproportionately high vs premium paid",
    "policy_age_days":         "Policy was very new at time of claim",
    "new_policy_flag":         "Policy was less than 6 months old when claim was filed",
    "days_to_report":          "Claim was reported unusually late after the incident",
    "CLAIM_AMOUNT":            "Claim amount is abnormally high",
    "total_loss":              "Total loss claim — highest fraud risk category",
    "no_proof_flag":           "No police report and no injury recorded",
    "odd_hour":                "Incident occurred at an unusual hour (midnight–4am or 10pm+)",
    "weekend_incident":        "Incident occurred on a weekend",
    "INCIDENT_SEVERITY":       "Severity level is associated with fraud patterns",
    "RISK_SEGMENTATION":       "Policyholder is in a high-risk segment",
    "agent_claim_count":       "Agent has processed an unusually high volume of claims",
    "INSURANCE_TYPE":          "This insurance type has elevated fraud patterns",
    "PREMIUM_AMOUNT":          "Premium level is inconsistent with claim amount",
    "AGE":                     "Age group shows elevated fraud correlation",
    "TENURE":                  "Customer tenure is associated with fraud patterns",
    "POLICE_REPORT_AVAILABLE": "No police report filed",
    "ANY_INJURY":              "Injury status is inconsistent with claim type",
}

def get_plain_english(feature: str) -> str:
    return PLAIN_ENGLISH_MAP.get(feature, f"Feature '{feature}' is contributing to the risk score")


# ─────────────────────────────────────────────────────────────────────────────
# Sarvam AI helpers
# ─────────────────────────────────────────────────────────────────────────────

def build_claim_context(score_resp: dict) -> str:
    """
    Converts a ScoreResponse dict into a structured plain-text context block
    that is injected into Sarvam's system prompt. This is the 'SHAP → Sarvam'
    bridge — the model always has the full scoring context before it replies.
    """
    expl_lines = "\n".join(
        f"  {i+1}. {f['plain_english']} "
        f"(SHAP impact: {f['impact']:+.4f}, {f['direction']})"
        for i, f in enumerate(score_resp.get("explanation", []))
    )
    return (
        f"CLAIM FRAUD SCORE REPORT\n"
        f"========================\n"
        f"Fraud Score   : {score_resp.get('fraud_score', 0):.4f} / 1.0\n"
        f"Risk Score    : {score_resp.get('risk_score_100', 0)} / 100\n"
        f"Risk Tier     : {score_resp.get('risk_tier', 'UNKNOWN')}\n"
        f"Recommended   : {score_resp.get('recommended_action', 'N/A')}\n\n"
        f"TOP SHAP RISK FACTORS (AI Explanation)\n"
        f"---------------------------------------\n"
        f"{expl_lines}\n"
    )


def build_sarvam_system_prompt(claim_context: str, language: str) -> str:
    lang_instruction = (
        "Respond in English." if language.startswith("en")
        else f"Respond in the language with BCP-47 code '{language}'. "
             f"Use simple, professional language appropriate for an insurance investigator."
    )
    return (
        "You are DETECTRA's AI Fraud Analyst — an expert assistant built into the DETECTRA insurance "
        "fraud detection platform. You help Special Investigations Unit (SIU) investigators understand "
        "why a claim was flagged and what actions to take next.\n\n"
        "You have access to the following real-time fraud scoring report for the claim currently open "
        "in the investigator's dashboard:\n\n"
        f"{claim_context}\n"
        "Rules:\n"
        "- Always ground your answers in the SHAP factors above — do not make up risk signals.\n"
        "- Be concise and direct. Investigators are busy — no filler.\n"
        "- If a factor has a negative SHAP impact, acknowledge it reduces risk.\n"
        "- Never recommend approving a HIGH risk claim without SIU review.\n"
        "- If asked about something outside fraud analysis, politely redirect.\n"
        f"{lang_instruction}"
    )


async def call_sarvam_chat(
    system_prompt: str,
    history: list[dict],
    user_message: str,
) -> str:
    """
    Calls Sarvam AI chat completions.
    Falls back to a rule-based summary if the API key is not configured.
    """
    if not SARVAM_API_KEY:
        return (
            "[Sarvam AI not configured — set SARVAM_API_KEY env var]\n"
            "Based on the SHAP analysis, the primary fraud signals are the top-ranked factors "
            "in the explanation array. Please configure your Sarvam API key to enable AI conversation."
        )

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(history)
    messages.append({"role": "user", "content": user_message})

    payload = {
        "model": SARVAM_MODEL,
        "messages": messages,
        "max_tokens": 512,
        "temperature": 0.3,   # low temp = precise, factual responses
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(SARVAM_CHAT_URL, json=payload, headers=SARVAM_HEADERS)
        if resp.status_code != 200:
            raise HTTPException(
                status_code=502,
                detail=f"Sarvam AI error {resp.status_code}: {resp.text[:300]}"
            )
        data = resp.json()
        return data["choices"][0]["message"]["content"]


async def call_sarvam_tts(text: str, language: str, speaker: str) -> bytes:
    """
    Calls Sarvam Bulbul TTS and returns raw audio bytes (WAV).
    """
    if not SARVAM_API_KEY:
        raise HTTPException(status_code=503, detail="SARVAM_API_KEY not configured")

    payload = {
        "inputs": [text[:500]],   # Sarvam TTS has a per-request character limit
        "target_language_code": language,
        "speaker": speaker,
        "model": SARVAM_TTS_MODEL,
        "enable_preprocessing": True,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(SARVAM_TTS_URL, json=payload, headers=SARVAM_HEADERS)
        if resp.status_code != 200:
            raise HTTPException(
                status_code=502,
                detail=f"Sarvam TTS error {resp.status_code}: {resp.text[:300]}"
            )
        data = resp.json()
        # Sarvam returns base64-encoded audio
        audio_b64 = data["audios"][0]
        return base64.b64decode(audio_b64)


def build_voice_brief_text(score_resp: dict) -> str:
    """Generates a short verbal summary suitable for TTS (under 500 chars)."""
    tier   = score_resp.get("risk_tier", "UNKNOWN")
    score  = score_resp.get("risk_score_100", 0)
    action = score_resp.get("recommended_action", "")
    top_factor = ""
    if score_resp.get("explanation"):
        top_factor = score_resp["explanation"][0].get("plain_english", "")

    return (
        f"Claim risk assessment complete. "
        f"Risk tier: {tier}. Score: {score} out of 100. "
        f"Recommended action: {action}. "
        f"Primary risk signal: {top_factor}."
    )


# ─────────────────────────────────────────────────────────────────────────────
# Sarvam summary for /score-claim (auto-generated, no user input needed)
# ─────────────────────────────────────────────────────────────────────────────
async def generate_sarvam_summary(score: float, tier: str, explanation: list) -> str:
    """
    Automatically generates a 2-3 sentence plain-English summary using Sarvam AI
    every time a claim is scored. This is embedded in the ScoreResponse so the
    dashboard can display it immediately without a separate chat call.
    """
    if not SARVAM_API_KEY:
        top = explanation[0]["plain_english"] if explanation else "several risk signals"
        return (
            f"This claim scores {int(score*100)}/100 — {tier} risk. "
            f"The primary driver is: {top}. "
            f"{'Immediate SIU escalation recommended.' if tier == 'HIGH' else 'Manual review advised.' if tier == 'MEDIUM' else 'Eligible for Green Channel auto-approval.'}"
        )

    factors = "; ".join(f["plain_english"] for f in explanation[:3])
    prompt = (
        f"A fraud detection model scored this insurance claim {int(score*100)}/100 ({tier} risk). "
        f"The top risk factors are: {factors}. "
        f"Write a 2-sentence plain-English summary for an insurance investigator. "
        f"Be direct and factual. No preamble."
    )

    messages = [
        {"role": "system", "content": "You are a concise fraud analysis assistant. Write short, factual summaries."},
        {"role": "user",   "content": prompt},
    ]

    payload = {"model": SARVAM_MODEL, "messages": messages, "max_tokens": 150, "temperature": 0.2}

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(SARVAM_CHAT_URL, json=payload, headers=SARVAM_HEADERS)
            if resp.status_code == 200:
                return resp.json()["choices"][0]["message"]["content"]
    except Exception:
        pass

    # Fallback if Sarvam call fails — do not crash the scoring endpoint
    return (
        f"Claim risk: {tier} ({int(score*100)}/100). "
        f"Key signals: {'; '.join(f['plain_english'] for f in explanation[:2])}."
    )


# ─────────────────────────────────────────────────────────────────────────────
# /score-claim — primary scoring endpoint
# ─────────────────────────────────────────────────────────────────────────────
@app.post("/score-claim", response_model=ScoreResponse)
async def score_claim(claim: ClaimRequest):
    try:
        row = engineer_features(claim)

        for col in pipe["cat_cols"]:
            row[col] = row[col].fillna("Unknown")
        for col in pipe["num_cols"]:
            # Fix #2 (MEDIUM): Use training-time median instead of 0 for null fill
            fallback = _NUM_MEDIANS.get(col, 0)
            row[col] = pd.to_numeric(row[col], errors="coerce").fillna(fallback)
        row[pipe["cat_cols"]] = pipe["encoder"].transform(row[pipe["cat_cols"]])

        X_input = row[pipe["features"]]
        score   = float(pipe["model"].predict_proba(X_input)[0, 1])

        if score < 0.30:
            tier   = "LOW"
            action = "Auto-Approve (Green Channel)"
        elif score < 0.60:
            tier   = "MEDIUM"
            action = "Flag for Manual Review"
        else:
            tier   = "HIGH"
            action = "Stop Payment — Escalate to SIU"

        # Fix #3 (MEDIUM): Defensively unwrap SHAP values.
        # shap_values() can return a list (binary XGBoost → [neg_class, pos_class])
        # OR a plain ndarray depending on SHAP version. We always want the
        # positive-class row (index 1 for list, index 0 for plain array).
        raw_sv = pipe["explainer"].shap_values(X_input)
        if isinstance(raw_sv, list):
            # Binary classifier: raw_sv[1] is the positive-class shap matrix
            sv = raw_sv[1][0]
        else:
            # Single ndarray — first (only) row
            sv = raw_sv[0]
        drivers = (
            pd.Series(sv, index=pipe["features"])
            .sort_values(key=abs, ascending=False)
            .head(5)
        )
        explanation = [
            SHAPFactor(
                feature=feat,
                impact=round(float(val), 4),
                direction="increases fraud risk" if val > 0 else "decreases fraud risk",
                plain_english=get_plain_english(feat),
            )
            for feat, val in drivers.items()
        ]

        # Sarvam AI auto-summary
        sarvam_summary = await generate_sarvam_summary(score, tier, [e.dict() for e in explanation])

        return ScoreResponse(
            fraud_score=round(score, 4),
            risk_score_100=int(score * 100),
            risk_tier=tier,
            recommended_action=action,
            explanation=explanation,
            sarvam_summary=sarvam_summary,
        )

    except HTTPException:
        raise
    except Exception as e:
        log.error("score_claim error:\n%s", traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"{type(e).__name__}: {e}",
        )


# ─────────────────────────────────────────────────────────────────────────────
# /sarvam-chat — conversational Q&A about a scored claim
# ─────────────────────────────────────────────────────────────────────────────
@app.post("/sarvam-chat", response_model=ChatResponse)
async def sarvam_chat(req: ChatRequest):
    """
    The dashboard calls this after displaying a /score-claim result.

    Flow:
        1. Investigator sees fraud score + SHAP explanation on dashboard
        2. They type a question in the Sarvam AI chat panel
        3. Frontend sends the full score_response + their question here
        4. Sarvam AI answers with full claim context injected into the system prompt
        5. Frontend displays the reply; conversation_history grows with each turn

    The conversation_history array lets the frontend maintain multi-turn context.
    Format: [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
    """
    try:
        claim_context = build_claim_context(req.score_response)
        system_prompt = build_sarvam_system_prompt(claim_context, req.language)
        reply = await call_sarvam_chat(system_prompt, req.conversation_history, req.user_message)
        return ChatResponse(reply=reply, language=req.language)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────────────────────
# /sarvam-voice-brief — Bulbul v3 TTS audio summary
# ─────────────────────────────────────────────────────────────────────────────
@app.post("/sarvam-voice-brief")
async def sarvam_voice_brief(req: VoiceBriefRequest):
    """
    Returns a WAV audio file: a spoken fraud summary for the current claim.
    Use case: investigator clicks the audio button on the dashboard, hears a
    3-second briefing: tier, score, top risk factor, recommended action.

    Frontend usage:
        const blob = await resp.blob();
        const url  = URL.createObjectURL(blob);
        new Audio(url).play();
    """
    text       = build_voice_brief_text(req.score_response)
    audio_data = await call_sarvam_tts(text, req.language, req.speaker)
    return Response(
        content=audio_data,
        media_type="audio/wav",
        headers={"Content-Disposition": "inline; filename=detectra_brief.wav"},
    )


# ─────────────────────────────────────────────────────────────────────────────
# /health
# ─────────────────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status": "ok",
        "model": "detectra_v1.1",
        "features_count": len(pipe["features"]),
        # pipe.get() — threshold key may not exist in all pkl versions
        "threshold": pipe.get("threshold", 0.5),
        "sarvam_configured": bool(SARVAM_API_KEY),
        "sarvam_model": SARVAM_MODEL,
        "tts_model": SARVAM_TTS_MODEL,
    }


# ─────────────────────────────────────────────────────────────────────────────
# /example-claim  — returns a ready-to-POST sample payload for manual testing
# Usage: curl http://localhost:8000/example-claim | python -m json.tool
#        then POST the result to /score-claim
# ─────────────────────────────────────────────────────────────────────────────
@app.get("/example-claim", summary="Get a sample ClaimRequest payload for testing")
def example_claim():
    """Returns two sample ClaimRequest payloads:
    - high_risk: multiple fraud signals — expected HIGH tier
    - low_risk:  clean claim profile — expected LOW tier
    POST either 'high_risk' or 'low_risk' body to /score-claim to verify the model.
    """
    today = pd.Timestamp.now().normalize()
    loss_dt  = (today - pd.Timedelta(days=5)).strftime("%Y-%m-%d")
    report_dt = today.strftime("%Y-%m-%d")
    eff_old   = (today - pd.Timedelta(days=730)).strftime("%Y-%m-%d")
    eff_new   = (today - pd.Timedelta(days=60)).strftime("%Y-%m-%d")

    return {
        "high_risk": {
            "INSURANCE_TYPE": "Health",
            "MARITAL_STATUS": "N",
            "EMPLOYMENT_STATUS": "N",
            "RISK_SEGMENTATION": "H",
            "HOUSE_TYPE": "Rent",
            "SOCIAL_CLASS": "LI",
            "CUSTOMER_EDUCATION_LEVEL": None,
            "INCIDENT_SEVERITY": "Total Loss",
            "AUTHORITY_CONTACTED": None,
            "AGE": 58,
            "TENURE": 3,
            "PREMIUM_AMOUNT": 80.0,
            "CLAIM_AMOUNT": 95000,
            "NO_OF_FAMILY_MEMBERS": 1,
            "INCIDENT_HOUR_OF_THE_DAY": 2,
            "ANY_INJURY": 0,
            "POLICE_REPORT_AVAILABLE": 0,
            "LOSS_DT": loss_dt,
            "REPORT_DT": report_dt,
            "POLICY_EFF_DT": eff_new,
            "AGENT_ID": None,
            "VENDOR_ID": None,
        },
        "low_risk": {
            "INSURANCE_TYPE": "Auto",
            "MARITAL_STATUS": "Y",
            "EMPLOYMENT_STATUS": "Y",
            "RISK_SEGMENTATION": "L",
            "HOUSE_TYPE": "Own",
            "SOCIAL_CLASS": "HI",
            "CUSTOMER_EDUCATION_LEVEL": "Bachelor",
            "INCIDENT_SEVERITY": "Minor Damage",
            "AUTHORITY_CONTACTED": "Police",
            "AGE": 34,
            "TENURE": 72,
            "PREMIUM_AMOUNT": 250.0,
            "CLAIM_AMOUNT": 8000,
            "NO_OF_FAMILY_MEMBERS": 4,
            "INCIDENT_HOUR_OF_THE_DAY": 14,
            "ANY_INJURY": 0,
            "POLICE_REPORT_AVAILABLE": 1,
            "LOSS_DT": loss_dt,
            "REPORT_DT": report_dt,
            "POLICY_EFF_DT": eff_old,
            "AGENT_ID": None,
            "VENDOR_ID": None,
        },
        "instructions": (
            "POST either payload above to POST /score-claim. "
            "high_risk should return tier=HIGH, low_risk should return tier=LOW."
        ),
    }
