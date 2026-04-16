# Detectra: AI-Powered Fraud Intelligence Platform
**Product Requirements Document (PRD) & Architecture Context**

*This document serves as the master context file for LLM onboarding. It details the exact current state of the architecture, built features, and the roadmap for upcoming development.*

---

## 1. Project Context & Vision
Detectra is a modern, enterprise-grade, B2B insurance fraud detection platform. It combines a lightweight Machine Learning inference pipeline with Generative AI (Sarvam AI) to provide real-time risk scoring and contextual investigative guidance. The platform uses strict Role-Based Access Control (RBAC) to separate the intricate workflows of investigators from a clean, transparency-driven customer portal.

## 2. Tech Stack & Tools Used
*   **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS, Framer Motion, Lucide-React for icons, Recharts for data visualization.
*   **Backend Interface**: FastAPI (Python), Uvicorn.
*   **Machine Learning**: `scikit-learn` (Random Forest), `numpy`, `joblib` (Model persistence).
*   **AI Integrations**: Sarvam AI API (LLM for conversational context, fraud summaries, and TTS audio generation).
*   **Authentication & Database**: Supabase Auth (JWT) & PostgreSQL (`profiles` table).
*   **Deployment**: Vercel (Frontend + Serverless Python Backend). Optimizations were made to keep lambda packages under the 500MB ephemeral storage limit by stripping `pandas` and `xgboost` in favor of raw `numpy` processing.

---

## 3. Current State: What Has Been Built So Far
### 3.1 Authentication System
*   **Premium AuthUI**: A visually stunning, glassmorphic login and sign-up page (`AuthShell.tsx`) with dynamic background lighting, tight typography, and Framer Motion transitions.
*   **Dynamic Role Injection**: During sign-up, users can explicitly select their **Account Type** (Policy Holder or Investigator). This stores securely in Supabase `user_metadata.role`.
*   **Demo Fallbacks**: Email parsing dynamically defaults to roles based on email substrings (e.g., `admin@detectra.in` maps to `company_admin`).

### 3.2 Role-Based Routing & Dashboards
The unified `page.tsx` dashboard conditionally mounts entirely different user interfaces based on the user's role logic:
*   **Customer Portal (`role: customer`)**: A streamlined dashboard focusing on transparency. It displays active claim statuses with a stepper UI (Submitted -> Under Review -> Decision -> Payout) and historic claim records.
*   **Command Center (`role: company_admin` | `employee_admin`)**: An intricate surveillance dashboard showing system volume (BarCharts), aggregate metrics (amount at risk, average risk scores), and real-time fraud signals generated from the ML Backend.

### 3.3 Core Machine Learning Backend (`backend/main.py`)
*   **Inference Engine**: Receives payload `[claim_amount, expected_amount, policy_age_days, claim_frequency]`, processes it through a pre-compiled `.joblib` Random Forest model, and generates a `risk_score_100`.
*   **Dynamic Flagging**: Procedural scripts append hard-flags (e.g., "Inflation Detect" if claimed amount exceeds 1.2x expected, "Early Bird" for fresh policies).
*   **Sarvam AI Orchestrator**: Uses `sarvam-30b` to ingest the generated flags and risk score, producing a 2-line professional verdict, as well as powering the conversational investigative chat agent.

---

## 4. Model Training & Data Context
*   **Algorithm**: `RandomForestClassifier` (Selected for its lack of system-level C++ dependency overhead, guaranteeing stability on Vercel compared to XGBoost).
*   **Dataset Structure**: The model was trained on hypothetical / synthetic insurance fraud datasets targeting rapid incident claiming, inflated repair costs vs expected baselines, and synthetic anomalies based on policy tenure.
*   **Inference Storage**: The compiled artifact is stored locally in `backend/models/fraud_model.joblib`. 

---

## 5. What Remains (Future Roadmap & LLM Guide)

When continuing chat to build features, the following architecture constraints and planned tasks apply:

### 5.1 Full Database Integration (Removing Mock Data)
*   **Current State**: The UI dynamically updates, but it fetches standard simulated claim structures from `@/data/dashboard.ts` (`mockClaims`, `monthlyData`).
*   **The Goal**: Establish a `claims` table in Supabase. Map the FastAPI server to query claims directly from Supabase, run the ML scoring, and patch the `fraud_score` back into the database.

### 5.2 Rules Engine Implementation
*   **Current State**: UI Sidebar has a placeholder for "Rules Engine".
*   **The Goal**: Develop a system where Admins can create dynamic logic gates (e.g., `IF claim_amount > 50000 AND policy_age < 30 THEN route to Manual Review`). These rules should sit in a Postgres table and be evaluated alongside the ML ML model on the FastAPI server.

### 5.3 The Three Account Structure Expansion
*   **Company Admin**: Highest tier. Access to modify rules, manage investigators, and view system-wide analytics.
*   **Employee Admin (Staff / Investigator)**: Read + Write access limited to assigned claims. Uses the Sarvam AI floating chat box to query workflow procedures.
*   **Customer**: Read-only access to their own specific `user_id` mapped claims.

### 5.4 Form & Input Handling
*   Build the actual "New Claim" submission form (`/claims/submit`) utilizing the premium UI aesthetic. The form should securely record data into Supabase and subsequently trigger an async API call to the `/analyze` FastAPI endpoint for auto-scoring.
