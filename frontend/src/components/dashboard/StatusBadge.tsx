import { ShieldX, CheckCircle2, Clock4 } from "lucide-react";

export function riskChip(s: number) {
  if (s > 70) return { bg: "rgba(239,68,68,0.12)", text: "#ef4444", border: "rgba(239,68,68,0.25)" };
  if (s > 30) return { bg: "rgba(245,158,11,0.12)", text: "#d97706", border: "rgba(245,158,11,0.25)" };
  return { bg: "rgba(34,197,94,0.10)", text: "#16a34a", border: "rgba(34,197,94,0.22)" };
}

export function StatusBadge({ status }: { status: string }) {
  const config = (s: string) => {
    if (s === "Flagged")      return { bg: "rgba(239,68,68,0.10)",  text: "#ef4444", border: "rgba(239,68,68,0.2)",  icon: <ShieldX  size={10} strokeWidth={2.5} /> };
    if (s === "Cleared")      return { bg: "rgba(34,197,94,0.10)",  text: "#16a34a", border: "rgba(34,197,94,0.2)",  icon: <CheckCircle2 size={10} strokeWidth={2.5} /> };
    return                          { bg: "rgba(245,158,11,0.10)", text: "#d97706", border: "rgba(245,158,11,0.2)", icon: <Clock4  size={10} strokeWidth={2.5} /> };
  };
  
  const c = config(status);
  
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold"
      style={{ background: c.bg, color: c.text, borderColor: c.border }}
    >
      {c.icon} {status}
    </span>
  );
}
