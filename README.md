<div align="center">

# Detectra | Next-Gen Fraud Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![IRDAI Compliant](https://img.shields.io/badge/Compliance-IRDAI-success?style=for-the-badge&logo=shield&logoColor=white)](https://detectra.io)

**Detectra is the industry-standard AI engine for sub-second insurance fraud detection.**  
Empowering investigation units to surface 47+ fraud signals instantly, saving thousands of hours in manual triage.

[Explore Dashboard Preview](https://detectra.io) · [Report Bug](https://github.com/8teen/Detectra/issues) · [Request Feature](https://github.com/8teen/Detectra/issues)

</div>

---

## Key Features

- **AI Verdict Cards**: Instant 0–100 risk scoring with natural language explanations.
- **47+ Fraud Signals**: Deep analysis of claim amounts, narrative consistency, geo-spatial risk, and network anomalies.
- **Dynamic Rules Engine**: Custom logical flows for automated triage (No-Code required).
- **Team Workspaces**: Escalate to SIU, mark as safe, or request documentation with one-click actions.
- **Real-time Analytics**: High-fidelity dashboarding for monitoring fraud trends and averted losses.
- **Premium Dark UI**: Meticulously crafted for elite investigation teams with the 'Emerald' theme.

---

## Tech Stack

Built with a modern, high-performance stack for security and speed:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visualizations**: [Recharts](https://recharts.org/)
- **State Management**: [React Context](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## Project Structure

Detectra is organized as a monorepo for clear separation of concerns between our fraud detection engine and the high-performance investigation dashboard.

```bash
├── frontend/          # Next.js 14 Dashboard Application
│   ├── src/           # Dashboard Pages, Components, and Logic
│   ├── public/        # Icons, Branding, and Media
│   └── root/          # Frontend Config (Tailwind, Next, TS)
├── backend/           # Node.js / Express Fraud Detection API
│   ├── server.js      # API Entry Point
│   └── package.json   # Backend Dependencies
└── root/              # Global configuration & orchestration
```

---

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm / yarn / pnpm

### Quick Start (All Services)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pranavgawaii/Detectra-fraud-detection.git
   cd Detectra
   ```

2. **Install All Dependencies**
   ```bash
   npm run install:all
   ```

3. **Start Development (Frontend & Backend)**
   ```bash
   npm run dev
   ```

### Independent Service Control

- **Frontend Only**: `npm run dev:frontend`
- **Backend Only**: `npm run dev:backend`
- **Build Frontend**: `npm run build:frontend`

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built for elite insurance teams. Powered by AI.</p>
  <strong>© 2026 Detectra Technologies Pvt. Ltd.</strong>
</div>
