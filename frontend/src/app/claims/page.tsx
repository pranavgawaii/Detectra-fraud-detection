"use client";


import Link from "next/link";
import { Search, Plus, SlidersHorizontal, ChevronDown, ShieldX, CheckCircle2, Clock4, Eye } from "lucide-react";

const allClaims = [
  { id: "CLM-2047", claimant: "John Doe",        type: "Auto",     amount: "₹45,000",    score: 84, status: "Flagged",      assigned: "AK", date: "30 Mar 2026" },
  { id: "CLM-2048", claimant: "Jane Smith",       type: "Health",   amount: "₹1,20,000",  score: 12, status: "Cleared",      assigned: "RS", date: "30 Mar 2026" },
  { id: "CLM-2049", claimant: "Acme Corp",        type: "Property", amount: "₹5,00,000",  score: 45, status: "Under Review", assigned: "MP", date: "29 Mar 2026" },
  { id: "CLM-2050", claimant: "Michael Brown",    type: "Auto",     amount: "₹12,500",    score: 7,  status: "Cleared",      assigned: "AK", date: "29 Mar 2026" },
  { id: "CLM-2051", claimant: "Sarah Lee",        type: "Life",     amount: "₹10,00,000", score: 91, status: "Flagged",      assigned: "RS", date: "28 Mar 2026" },
  { id: "CLM-2052", claimant: "Raj Patel",        type: "Health",   amount: "₹88,000",    score: 67, status: "Under Review", assigned: "MP", date: "28 Mar 2026" },
  { id: "CLM-2053", claimant: "Priya Sharma",     type: "Auto",     amount: "₹2,30,000",  score: 55, status: "Under Review", assigned: "VK", date: "27 Mar 2026" },
  { id: "CLM-2054", claimant: "Global Logistics", type: "Property", amount: "₹14,50,000", score: 88, status: "Flagged",      assigned: "AK", date: "27 Mar 2026" },
  { id: "CLM-2055", claimant: "Anita Desai",      type: "Health",   amount: "₹34,000",    score: 22, status: "Cleared",      assigned: "RS", date: "26 Mar 2026" },
  { id: "CLM-2056", claimant: "Vikram Singh",     type: "Life",     amount: "₹25,00,000", score: 76, status: "Flagged",      assigned: "MP", date: "26 Mar 2026" },
  { id: "CLM-2057", claimant: "Meena Krishnan",   type: "Auto",     amount: "₹67,500",    score: 38, status: "Under Review", assigned: "VK", date: "25 Mar 2026" },
  { id: "CLM-2058", claimant: "Sanjay Gupta",     type: "Health",   amount: "₹2,15,000",  score: 61, status: "Under Review", assigned: "AK", date: "25 Mar 2026" },
];

function scoreChip(s: number) {
  if (s > 70) return { bg: "rgba(239,68,68,0.1)", text: "#ef4444", border: "rgba(239,68,68,0.2)" };
  if (s > 30) return { bg: "rgba(245,158,11,0.1)", text: "#d97706", border: "rgba(245,158,11,0.2)" };
  return { bg: "rgba(22,163,74,0.08)", text: "#16a34a", border: "rgba(22,163,74,0.15)" };
}

function statusConfig(s: string) {
  if (s === "Flagged")      return { bg: "rgba(239,68,68,0.08)", text: "#ef4444", border: "rgba(239,68,68,0.15)", icon: <ShieldX size={10} /> };
  if (s === "Cleared")      return { bg: "rgba(22,163,74,0.08)", text: "#16a34a", border: "rgba(22,163,74,0.15)", icon: <CheckCircle2 size={10} /> };
  return { bg: "rgba(245,158,11,0.08)", text: "#d97706", border: "rgba(245,158,11,0.15)", icon: <Clock4 size={10} /> };
}

const assigneeColors: Record<string, string> = {
  AK: "rgba(114,227,173,0.2)",
  RS: "rgba(59,130,246,0.15)",
  MP: "rgba(239,68,68,0.1)",
  VK: "rgba(245,158,11,0.12)",
};
const assigneeText: Record<string, string> = { AK: "#16a34a", RS: "#2563eb", MP: "#ef4444", VK: "#d97706" };

const chips = [
  { label: "Total",     count: "234",  bg: "var(--accent)",            text: "var(--foreground)" },
  { label: "High Risk", count: "41",   bg: "rgba(239,68,68,0.08)",    text: "#ef4444" },
  { label: "Medium",    count: "89",   bg: "rgba(245,158,11,0.08)",   text: "#d97706" },
  { label: "Low Risk",  count: "104",  bg: "rgba(22,163,74,0.08)",    text: "#16a34a" },
];

const headers = ["", "Claim ID", "Claimant", "Type", "Amount", "Risk", "Status", "Assigned", "Date", ""];

export default function ClaimsPage() {
  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-end justify-between pt-1.5">
          <div>
            <h1 className="text-[1.6rem] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>All Claims</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Showing 1–12 of 234 claims · last synced 2 min ago</p>
          </div>
          <Link
            href="/claims/submit"
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            <Plus size={15} strokeWidth={2.5} /> Submit New Claim
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 min-w-[200px] max-w-xs"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <Search size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
            <input
              placeholder="Search by ID, claimant..."
              className="text-sm flex-1 outline-none bg-transparent"
              style={{ color: "var(--foreground)" }}
            />
          </div>
          {["Risk Level", "Claim Type", "Date Range", "Status"].map((f) => (
            <button
              key={f}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              {f} <ChevronDown size={13} />
            </button>
          ))}
          <button
            className="ml-auto flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>

        {/* Summary chips */}
        <div className="flex gap-2.5">
          {chips.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border"
              style={{ background: c.bg, color: c.text, borderColor: `${c.text}22` }}
            >
              {c.label} <span className="font-bold">{c.count}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left py-3 px-3 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {h === "" && i === 0 ? <input type="checkbox" className="rounded" /> : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allClaims.map((c) => {
                const sc = scoreChip(c.score);
                const st = statusConfig(c.status);
                return (
                  <tr
                    key={c.id}
                    className="group"
                    style={{ borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  >
                    <td className="py-3 px-3"><input type="checkbox" className="rounded" /></td>
                    <td className="py-3 px-3 font-bold text-[0.82rem]" style={{ color: "var(--foreground)" }}>{c.id}</td>
                    <td className="py-3 px-3 text-[0.82rem]" style={{ color: "var(--muted-foreground)" }}>{c.claimant}</td>
                    <td className="py-3 px-3 text-[0.82rem]" style={{ color: "var(--muted-foreground)" }}>{c.type}</td>
                    <td className="py-3 px-3 text-[0.82rem] font-semibold" style={{ color: "var(--foreground)" }}>{c.amount}</td>
                    <td className="py-3 px-3">
                      <span
                        className="inline-flex items-center justify-center w-[34px] h-[26px] rounded-full text-[11px] font-bold border"
                        style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}
                      >
                        {c.score}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                        style={{ background: st.bg, color: st.text, borderColor: st.border }}
                      >
                        {st.icon} {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold"
                        style={{ background: assigneeColors[c.assigned] ?? "var(--accent)", color: assigneeText[c.assigned] ?? "var(--muted-foreground)" }}
                      >
                        {c.assigned}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px]" style={{ color: "var(--muted-foreground)" }}>{c.date}</td>
                    <td className="py-3 px-3">
                      <Link
                        href={`/claims/${c.id.toLowerCase()}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100"
                        style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
                      >
                        <Eye size={11} /> View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Showing 1–12 of <strong style={{ color: "var(--foreground)" }}>234</strong> claims</p>
            <div className="flex gap-1">
              {[1, 2, 3, "…", 20].map((p, i) => (
                <button
                  key={i}
                  className="w-7 h-7 text-xs rounded-lg font-semibold"
                  style={
                    p === 1
                      ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                      : { color: "var(--muted-foreground)", background: "var(--input)" }
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
