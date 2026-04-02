import { Zap, Activity, ShieldCheck, BarChart2, Users, Code2 } from "lucide-react";

export const navLinks = [
  { label: "Features",     href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",      href: "#pricing" },
  { label: "About",        href: "#about" },
];

export const features = [
  { icon: "Zap", iconBg: "rgba(114,227,173,0.12)", iconColor: "#72e3ad",
    title: "AI-Powered Detection", desc: "Cross-references 47 fraud signals per claim in under 2 seconds." },
  { icon: "Activity", iconBg: "rgba(59,130,246,0.12)", iconColor: "#60a5fa",
    title: "Real-Time Risk Scoring", desc: "0–100 risk score the moment a claim hits — instant triage." },
  { icon: "ShieldCheck", iconBg: "rgba(139,92,246,0.12)", iconColor: "#a78bfa",
    title: "Compliance-Ready", desc: "IRDAI compliant, SOC 2 Type II certified, DPDP Act ready." },
  { icon: "BarChart2", iconBg: "rgba(245,158,11,0.12)", iconColor: "#fbbf24",
    title: "Smart Rules Engine", desc: "Custom if/then rules with dynamic risk weights. No coding." },
  { icon: "Users", iconBg: "rgba(239,68,68,0.12)", iconColor: "#f87171",
    title: "Team Collaboration", desc: "Assign, escalate to SIU, and track every decision." },
  { icon: "Code2", iconBg: "rgba(107,114,128,0.12)", iconColor: "#9ca3af",
    title: "API & Integrations", desc: "REST API, webhooks, Guidewire & Duck Creek native support." },
];

export const steps = [
  { num: "01", title: "Submit a Claim",      desc: "Upload via dashboard, portal, or API. All policy types supported." },
  { num: "02", title: "AI Analysis Runs",    desc: "47 signals cross-checked: amount, history, NLP narrative, geo-risk." },
  { num: "03", title: "Risk Score Generated",desc: "0–100 score with signal breakdown — AI verdict in plain English." },
  { num: "04", title: "Investigator Acts",   desc: "Escalate, request docs, or clear — one-click action buttons." },
];

export const testimonials = [
  { name: "Rohan Mehta", role: "Head of Claims — NovaCover",
    text: "Detectra cut our false claim payouts by 34% in Q1. AI verdict cards let even junior investigators act confidently." },
  { name: "Priya Bhattacharya", role: "CISO — IndiaFirst Insurers",
    text: "SOC 2 certified, IRDAI compliant, and the audit trail is exactly what our compliance team needed." },
  { name: "Arjun Sethi", role: "VP Operations — ShieldPlus General",
    text: "3,000 claims a day handled in real-time. Only the 8% that need human review reach our team." },
];

export const pricing = [
  { name: "Starter", price: "₹4,999", period: "/mo",
    desc: "For small teams getting started.",
    features: ["500 claims/month", "5 user seats", "Core AI detection", "Email support"],
    cta: "Start Free Trial", highlight: false },
  { name: "Pro", price: "₹14,999", period: "/mo",
    desc: "For active investigation units.",
    features: ["5,00,000 claims/month", "25 seats", "Advanced AI + rules", "Priority support", "API access", "SSO & SAML"],
    cta: "Start Free Trial", highlight: true },
  { name: "Enterprise", price: "Custom", period: "",
    desc: "Unlimited scale, dedicated support.",
    features: ["Unlimited claims", "Unlimited seats", "Custom ML models", "Dedicated CSM", "On-premise option"],
    cta: "Contact Sales", highlight: false },
];

export const stats = [
  { val: "1.2M+", label: "Claims Analyzed"   },
  { val: "94.2%", label: "Detection Accuracy" },
  { val: "₹47 Cr", label: "Fraud Prevented"   },
  { val: "340+",  label: "Enterprise Clients" },
];

export const companies = ["NovaCover", "ShieldPlus", "IndiaFirst", "SafeGuard", "TrustLine", "PeakInsure"];
