/**
 * Central API client for DETECTRA frontend → FastAPI backend
 * ─────────────────────────────────────────────────────────────
 * All fetch calls go through here so the base URL is configured
 * in exactly one place (.env.local → NEXT_PUBLIC_API_URL).
 *
 * Usage:
 *   import { api } from "@/lib/api";
 *   const result = await api.scoreClaim(claimPayload);
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ── Types (mirrors detectra_api.py Pydantic models) ──────────────────────────

export interface ClaimRequest {
  // Categorical — values must exactly match OrdinalEncoder training categories
  INSURANCE_TYPE: "Motor" | "Health" | "Property" | "Life" | "Travel" | "Mobile";
  MARITAL_STATUS: "Y" | "N";
  EMPLOYMENT_STATUS: "Y" | "N";
  RISK_SEGMENTATION: "H" | "M" | "L";
  HOUSE_TYPE: "Own" | "Rent" | "Mortgage";
  SOCIAL_CLASS: "HI" | "MI" | "LI";
  CUSTOMER_EDUCATION_LEVEL?: "High School" | "College" | "Bachelor" | "Masters" | "MD" | "PhD";
  INCIDENT_SEVERITY: "Minor Loss" | "Major Loss" | "Total Loss";
  AUTHORITY_CONTACTED?: "Police" | "Ambulance" | "Other";
  // Numerical
  AGE: number;
  TENURE: number;
  PREMIUM_AMOUNT: number;
  CLAIM_AMOUNT: number;
  NO_OF_FAMILY_MEMBERS: number;
  INCIDENT_HOUR_OF_THE_DAY: number;
  ANY_INJURY: number;
  POLICE_REPORT_AVAILABLE: number;
  // Dates  (ISO: YYYY-MM-DD)
  LOSS_DT: string;
  REPORT_DT: string;
  POLICY_EFF_DT: string;
  // IDs
  AGENT_ID?: string;
  VENDOR_ID?: string;
}

export interface SHAPFactor {
  feature: string;
  impact: number;
  direction: string;
  plain_english: string;
}

export interface ScoreResponse {
  fraud_score: number;       // 0.0 → 1.0
  risk_score_100: number;    // 0 → 100
  risk_tier: "LOW" | "MEDIUM" | "HIGH";
  recommended_action: string;
  explanation: SHAPFactor[];
  sarvam_summary: string;
}

export interface ChatRequest {
  score_response: ScoreResponse;
  user_message: string;
  conversation_history?: { role: string; content: string }[];
  language?: string;
}

export interface ChatResponse {
  reply: string;
  language: string;
}

// ── Shared fetch helper ───────────────────────────────────────────────────────

async function apiFetch<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`[DETECTRA API] ${path} → ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// ── Public API surface ────────────────────────────────────────────────────────

export const api = {
  /** POST /score-claim — XGBoost fraud score + SHAP explanation */
  scoreClaim: (claim: ClaimRequest) =>
    apiFetch<ScoreResponse>("/score-claim", {
      method: "POST",
      body: JSON.stringify(claim),
    }),

  /** POST /sarvam-chat — multi-turn conversational AI about a scored claim */
  sarvamChat: (req: ChatRequest) =>
    apiFetch<ChatResponse>("/sarvam-chat", {
      method: "POST",
      body: JSON.stringify(req),
    }),

  /** GET /health — FastAPI liveness check */
  health: () =>
    apiFetch<{ status: string; model: string; sarvam_configured: boolean }>(
      "/health",
      { method: "GET" }
    ),
};
