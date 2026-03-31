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

```bash
├── src/
│   ├── app/           # Next.js App Router (Pages & Routes)
│   ├── components/    # Reusable UI & Layout Components
│   │   ├── dashboard/ # Dashboard-specific views
│   │   ├── layout/    # App shell, Sidebar, Header
│   │   └── ui/        # Shared UI Primitives (Card, Badge, etc.)
│   ├── data/          # Mock datasets & static content
│   ├── lib/           # Utility functions & Brand config
│   └── providers/     # Theme & Chat Context providers
├── public/            # Assets, Icons, and README media
└── root/              # Config files (Tailwind, TypeScript, ESLint)
```

---

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm / yarn / pnpm

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pranavgawaii/Detectra-fraud-detection.git
   cd detectra
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built for elite insurance teams. Powered by AI.</p>
  <strong>© 2026 Detectra Technologies Pvt. Ltd.</strong>
</div>
