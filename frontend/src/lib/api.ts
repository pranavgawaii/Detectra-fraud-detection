/**
 * Detectra API Bridge
 * Unified interface for ML Model Analysis and Sarvam AI Chat
 */

export interface ScoreRequest {
  claim_amount: number;
  expected_amount: number;
  policy_age_days: number;
  claim_frequency: number;
}

export interface ScoreResponse {
  fraud_score: number;
  risk_score_100: number;
  risk_tier: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  recommended_action: string;
  explanation: string[];
  sarvam_summary: string;
}

export interface ChatRequest {
  score_response: ScoreResponse;
  user_message: string;
  conversation_history: { role: string; content: string }[];
  language?: string;
}

export interface ChatResponse {
  reply: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === "production" ? "/_/backend" : "http://localhost:8000");

export const api = {
  /**
   * Run the ML model pipeline against a specific claim
   */
  async analyzeClaim(data: ScoreRequest): Promise<ScoreResponse> {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Analysis engine failure");
    return res.json();
  },

  /**
   * Multi-turn chat with context-aware fraud analysis
   */
  async sarvamChat(data: ChatRequest): Promise<ChatResponse> {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Chat engine failure");
    return res.json();
  }
};
