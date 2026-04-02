"use client";

import BrandLogo from "@/components/branding/BrandLogo";

/* ─── Dashboard mockup (dark) ──────────────────── */
export default function DashboardMockup() {
  const bars = [38, 52, 44, 66, 50, 78, 60, 40, 56, 68, 46, 72];
  return (
    <div
      className="overflow-hidden rounded-3xl border shadow-[0_60px_120px_rgba(0,0,0,0.6)]"
      style={{
        background: "#111318",
        border: "1px solid rgba(255,255,255,0.08)",
        transform: "perspective(1200px) rotateY(-10deg) rotateX(6deg)",
        maxWidth: 680,
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: "#0a0d12", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </div>
        <div className="flex-1 max-w-[280px] h-5 rounded-md px-3 text-[0.58rem] text-slate-500 flex items-center"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          app.detectra.io/dashboard
        </div>
      </div>

      {/* App body */}
      <div className="flex" style={{ height: 380 }}>
        {/* Mock sidebar */}
        <div className="flex flex-col items-center gap-3 p-3 pt-4 border-r" style={{ width: 52, borderColor: "rgba(255,255,255,0.06)", background: "#0d1017" }}>
          <BrandLogo size="sm" showName={false} className="pointer-events-none mb-1" />
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-8 w-8 rounded-xl flex items-center justify-center opacity-80"
              style={{ background: i === 1 ? "rgba(114,227,173,0.12)" : "transparent" }}>
              <div className="h-3.5 w-3.5 rounded-[3px]"
                style={{ background: i === 1 ? "#72e3ad" : "rgba(255,255,255,0.2)" }} />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-5">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { v: "147",    l: "Claims Today",  c: "#fff" },
              { v: "23",     l: "High Risk",     c: "#ef4444" },
              { v: "61",     l: "Avg Score",     c: "#f59e0b" },
              { v: "₹2.3Cr", l: "At Risk",       c: "#72e3ad" },
            ].map(s => (
              <div key={s.l} className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[0.6rem] font-semibold mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>{s.l}</p>
                <p className="text-[1rem] font-bold" style={{ color: s.c }}>{s.v}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="flex flex-1 flex-col rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[0.62rem] font-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Fraud Trend · Monthly</p>
            <div className="flex flex-1 items-end gap-1.5 pb-1">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, background: i === 6 ? "#72e3ad" : "rgba(255,255,255,0.07)" }} />
              ))}
            </div>
          </div>

          {/* Table snippet */}
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {[
              { id: "CLM-2047", score: 84, color: "#ef4444", status: "Flagged" },
              { id: "CLM-2048", score: 12, color: "#22c55e", status: "Cleared" },
            ].map(r => (
              <div key={r.id} className="flex items-center justify-between px-4 py-2"
                style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="text-[0.65rem] font-bold text-white">{r.id}</span>
                <span className="text-[0.65rem] font-bold tabular-nums" style={{ color: r.color }}>{r.score}</span>
                <span className="rounded-full px-2 py-0.5 text-[0.58rem] font-semibold"
                  style={{ background: `${r.color}20`, color: r.color }}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
