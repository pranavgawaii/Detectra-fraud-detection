# Sarvam AI Chat Test Service

A simple FastAPI service to test the Sarvam AI Chat Completion API.

## Setup

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set Environment Variable:**
   Create a `.env` file in this directory:
   ```env
   SARVAM_API_KEY="your_actual_api_key_here"
   ```

## Running the Service

Start the FastAPI server:
```bash
python3 -m uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

## API Usage

### POST /chat
Send a message to get an AI completion from Sarvam-30b.

**Test with cURL:**
```bash
curl -X POST http://localhost:8000/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "What is the capital of India?"}'
```

### POST /tts
Convert text to lifelike speech using **Sarvam Bulbul V3**.

**Test with cURL:**
```bash
curl -X POST http://localhost:8000/tts \
     -H "Content-Type: application/json" \
     -d '{"text": "This claim is risky due to a high amount."}' \
     --output speech.mp3
```

### POST /analyze
Evaluate an insurance claim for fraud risk and get an AI-generated explanation.

**Test with cURL:**
```bash
curl -X POST http://localhost:8000/analyze \
     -H "Content-Type: application/json" \
     -d '{
       "claim_amount": 50000,
       "expected_amount": 10000,
       "policy_age_days": 12,
       "claim_frequency": 3
     }'
```

**Response Sample:**
```json
{
  "risk_score": 82,
  "signals": ["High claim amount", "New policy risk", "High claim frequency"],
  "explanation": "This claim is highly risky due to..."
}
```

## Documentation
Interactive API documentation is available at `http://localhost:8000/docs`
