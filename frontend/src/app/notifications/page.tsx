"use client";

import AppShell from "@/components/layout/AppShell";
import { Bell, Check, AlertTriangle, Info, ShieldX, CheckCircle2 } from "lucide-react";

const notifications = [
  {
    id: 1, type: "critical", icon: <ShieldX size={16} />,
    title: "High-Risk Claim Detected",
    desc: "CLM-2051 (Sarah Lee) scored 91/100 — flagged for immediate review.",
    time: "2 min ago", read: false, color: "#ef4444", bg: "rgba(239,68,68,0.1)",
  },
  {
    id: 2, type: "warning", icon: <AlertTriangle size={16} />,
    title: "Rule Threshold Breached",
    desc: "\"Auto Collision Anomaly\" rule triggered 14 times today — above average.",
    time: "18 min ago", read: false, color: "#f59e0b", bg: "rgba(245,158,11,0.1)",
  },
  {
    id: 3, type: "success", icon: <CheckCircle2 size={16} />,
    title: "Claim CLM-2048 Cleared",
    desc: "Jane Smith's health claim passed all checks and has been approved.",
    time: "1 hr ago", read: false, color: "#22c55e", bg: "rgba(34,197,94,0.1)",
  },
  {
    id: 4, type: "info", icon: <Info size={16} />,
    title: "Monthly Report Ready",
    desc: "Your March 2026 fraud detection report is ready for download.",
    time: "3 hr ago", read: true, color: "#3b82f6", bg: "rgba(59,130,246,0.1)",
  },
  {
    id: 5, type: "critical", icon: <ShieldX size={16} />,
    title: "SIU Escalation Required",
    desc: "CLM-2047 (John Doe) has been queued for Special Investigation Unit.",
    time: "5 hr ago", read: true, color: "#ef4444", bg: "rgba(239,68,68,0.1)",
  },
  {
    id: 6, type: "info", icon: <Info size={16} />,
    title: "System Maintenance Scheduled",
    desc: "Scheduled downtime on Apr 1 from 2:00 AM – 4:00 AM IST.",
    time: "Yesterday", read: true, color: "#3b82f6", bg: "rgba(59,130,246,0.1)",
  },
  {
    id: 7, type: "success", icon: <CheckCircle2 size={16} />,
    title: "New Rule Published",
    desc: "\"Life Claim Velocity Check\" rule is now live in the engine.",
    time: "Yesterday", read: true, color: "#22c55e", bg: "rgba(34,197,94,0.1)",
  },
  {
    id: 8, type: "warning", icon: <AlertTriangle size={16} />,
    title: "API Rate Limit Warning",
    desc: "External verification API hitting 85% of monthly quota.",
    time: "2 days ago", read: true, color: "#f59e0b", bg: "rgba(245,158,11,0.1)",
  },
];

export default function NotificationsPage() {
  const unread = notifications.filter(n => !n.read).length;

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[1.35rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            Notifications
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {unread} unread alert{unread !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-xl border px-4 py-2 text-[0.8rem] font-semibold transition-all hover:border-[var(--primary)]"
          style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
        >
          <Check size={14} /> Mark all as read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="mb-5 flex items-center gap-2">
        {["All", "Critical", "Warnings", "Info"].map((tab, i) => (
          <button
            key={tab}
            className="rounded-xl border px-4 py-2 text-[0.78rem] font-semibold transition-all"
            style={
              i === 0
                ? { background: "var(--primary)", color: "var(--primary-foreground)", borderColor: "var(--primary)" }
                : { background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-foreground)" }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {notifications.map((n, idx) => (
          <div
            key={n.id}
            className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[var(--muted)] cursor-default"
            style={{
              borderBottom: idx < notifications.length - 1 ? "1px solid var(--border)" : undefined,
              opacity: n.read ? 0.65 : 1,
            }}
          >
            {/* Icon */}
            <div
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ background: n.bg, color: n.color }}
            >
              {n.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[0.84rem] font-semibold" style={{ color: "var(--foreground)" }}>
                  {n.title}
                  {!n.read && (
                    <span
                      className="ml-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                      style={{ background: n.color }}
                    />
                  )}
                </p>
                <span className="shrink-0 text-[0.72rem]" style={{ color: "var(--muted-foreground)" }}>
                  {n.time}
                </span>
              </div>
              <p className="mt-0.5 text-[0.78rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {n.desc}
              </p>
            </div>

            {/* Bell indicator */}
            <Bell
              size={14}
              className="mt-1 shrink-0"
              style={{ color: n.read ? "var(--border)" : n.color }}
            />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
