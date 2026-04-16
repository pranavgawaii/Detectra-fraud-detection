"use client";


import { HelpCircle, MessageCircle, FileText, ExternalLink, ChevronRight, Search } from "lucide-react";

const faqs = [
  { q: "How is the fraud risk score calculated?", a: "The risk score (0–100) is a weighted composite of claim amount anomaly, claimant history, narrative consistency, identity verification, and incident frequency signals — all computed by our AI engine in real time." },
  { q: "What does 'Escalate to SIU' do?", a: "It immediately routes the claim to your Special Investigation Unit queue, locks it from further automated processing, and sends an alert to the SIU lead on record." },
  { q: "How do I create a custom fraud detection rule?", a: "Navigate to Rules Engine → Create Rule. Define conditions, select the claim type, set a severity level and action, then publish. Rules apply to all incoming claims in real time." },
  { q: "Can I export claim data?", a: "Yes — use the Export button on the Dashboard to download a CSV of filtered claims, or generate a formatted PDF report using 'Generate Report'." },
  { q: "What is the difference between 'Flagged' and 'Under Review'?", a: "'Flagged' means the AI automatically detected high fraud probability. 'Under Review' means a human investigator is actively reviewing the claim." },
  { q: "How do I manage team members and access control?", a: "Go to Settings → Team. You can invite investigators, assign roles (Viewer, Analyst, Sr. Investigator, Admin), and revoke access." },
];

const docs = [
  { title: "Getting Started Guide",     icon: <FileText size={15} />, tag: "Guide" },
  { title: "API Integration Reference", icon: <FileText size={15} />, tag: "API" },
  { title: "Rules Engine Deep Dive",    icon: <FileText size={15} />, tag: "Docs" },
  { title: "Fraud Signal Dictionary",   icon: <FileText size={15} />, tag: "Reference" },
  { title: "SIU Workflow Playbook",     icon: <FileText size={15} />, tag: "Playbook" },
  { title: "Data Export & Reports",     icon: <FileText size={15} />, tag: "Guide" },
];

export default function HelpPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-[1.35rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          Help Center
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Documentation, FAQs, and support
        </p>
      </div>

      {/* Search */}
      <div
        className="mb-6 flex items-center gap-3 rounded-2xl border px-4 py-3.5"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <Search size={18} style={{ color: "var(--muted-foreground)" }} />
        <input
          type="text"
          placeholder="Search help articles, guides, and FAQs..."
          className="flex-1 bg-transparent text-[0.9rem] outline-none"
          style={{ color: "var(--foreground)" }}
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* FAQ — 2 cols */}
        <div className="col-span-2">
          <h2 className="mb-4 text-[0.9rem] font-bold" style={{ color: "var(--foreground)" }}>
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border p-4 transition-colors hover:border-[var(--primary)] cursor-pointer"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "rgba(114,227,173,0.12)" }}
                    >
                      <HelpCircle size={13} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <p className="text-[0.84rem] font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>
                        {f.q}
                      </p>
                      <p className="text-[0.78rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="shrink-0 mt-1" style={{ color: "var(--muted-foreground)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4">
          {/* Documentation */}
          <div className="rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h3 className="mb-3 text-[0.88rem] font-bold" style={{ color: "var(--foreground)" }}>Documentation</h3>
            <div className="flex flex-col gap-2">
              {docs.map((d, i) => (
                <button
                  key={i}
                  className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors hover:border-[var(--primary)]"
                  style={{ background: "var(--muted)", borderColor: "var(--border)" }}
                >
                  <span style={{ color: "var(--primary)" }}>{d.icon}</span>
                  <span className="flex-1 text-[0.78rem] font-medium" style={{ color: "var(--foreground)" }}>
                    {d.title}
                  </span>
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[0.6rem] font-bold"
                    style={{ background: "rgba(114,227,173,0.12)", color: "var(--primary)" }}
                  >
                    {d.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact support */}
          <div
            className="relative overflow-hidden rounded-2xl p-5"
            style={{ background: "linear-gradient(145deg,#0f1e3c 0%,#162d56 100%)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-20" style={{ background: "#72e3ad", filter: "blur(20px)" }} />
            <div className="relative">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(114,227,173,0.16)" }}>
                <MessageCircle size={16} style={{ color: "#72e3ad" }} />
              </div>
              <p className="text-[0.88rem] font-bold text-white mb-1">Need more help?</p>
              <p className="text-[0.74rem] leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
                Our support team is available 24/7 via live chat or email.
              </p>
              <button
                className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-[0.78rem] font-bold transition-opacity hover:opacity-90"
                style={{ background: "#72e3ad", color: "#0a1a10" }}
              >
                <MessageCircle size={13} /> Start Live Chat
              </button>
              <button
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-[0.78rem] font-semibold"
                style={{ background: "rgba(255,255,255,0.07)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ExternalLink size={13} /> Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
