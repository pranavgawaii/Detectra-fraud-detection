<div align="center">

# Detectra | Enterprise Fraud Intelligence
**Elite sub-second AI engine for insurance investigation units.**

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase)](https://supabase.com/)

</div>

---

## 🏗️ Technical Architecture
Detectra is designed for high-throughput fraud detection, utilizing a modern decoupled stack.

```mermaid
graph LR
    User([Investigation Team]) --> Frontend[Next.js 14]
    Frontend --> Auth[Supabase Auth]
    Frontend --> Backend[FastAPI / Sarvam AI]
    Backend --> AI[Sarvam 30B LLM]
    AI --> DB[(PostgreSQL / Supabase)]
```

### 📁 Streamlined Repository Structure
```bash
├── frontend/           # Next.js 14 Dashboard & Landing
│   ├── src/app/        # SSR Routes & Interface
│   └── src/components/ # Modular UI Components
├── backend/            # Python FastAPI Service (Sarvam AI)
│   ├── main.py         # AI Logic & TTS Processing
│   └── requirements.txt# Backend Dependencies
└── .env.example        # Centralized Config Manifest
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.0+
- **Python**: 3.9+
- **PIP**: Latest

### Deployment
1. **Clone & Setup**
   ```bash
   git clone https://github.com/pranavgawaii/Detectra.git
   cd Detectra
   npm run install:all
   ```

2. **Environment**
   - Copy root `.env.example` values to `frontend/.env.local` and `sarvam_api/.env`.

3. **Launch**
   ```bash
   npm run dev
   ```

---

## 🔒 Security & Analytics
- **Identity**: Supabase Auth with OAuth 2.0 integration.
- **Privacy**: End-to-end encrypted claim analysis.
- **Analytics**: Real-time fraud scoring powered by Sarvam AI Bulbul V3.

---
<div align="center">
  <strong>Built for the future of insurance. | © 2026 Detectra Technologies</strong>
</div>
