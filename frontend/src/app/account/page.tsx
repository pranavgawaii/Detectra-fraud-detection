"use client";


import { 
  User, Mail, Phone, ShieldCheck, Bell, 
  Key, LogOut, ChevronRight, Fingerprint, 
  ShieldAlert, Landmark, CreditCard,
  Camera
} from "lucide-react";

export default function AccountPage() {
  const cardAccentStyles: Record<string, React.CSSProperties> = {
    blue: { background: "rgba(59,130,246,0.12)", color: "#2563eb" },
    purple: { background: "rgba(168,85,247,0.12)", color: "#9333ea" },
    emerald: { background: "rgba(16,185,129,0.12)", color: "#059669" },
    rose: { background: "rgba(244,63,94,0.12)", color: "#e11d48" },
  };

  return (
    <>
      <div className="max-w-[1000px] mx-auto py-8 px-4 flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-widest text-primary mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Settings & Profile
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: "var(--foreground)" }}>
              Account Settings
            </h1>
          </div>
          <button 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 border-2"
            style={{ 
              background: "var(--destructive)", 
              color: "#fff",
              borderColor: "transparent",
              boxShadow: "0 4px 12px rgba(202,50,20,0.2)"
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Profile Card */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div 
              className="rounded-3xl p-8 border relative overflow-hidden flex flex-col items-center text-center shadow-xl shadow-black/5"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              {/* Profile Background Decor */}
              <div className="absolute top-0 inset-x-0 h-24 opacity-10 bg-gradient-to-b from-primary to-transparent" />
              
              <div className="relative mb-6">
                <div 
                  className="w-28 h-28 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl transition-transform hover:rotate-3"
                  style={{
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  AK
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#171717] border-2 border-white flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              </div>

              <h2 className="text-xl font-extrabold mb-1" style={{ color: "var(--foreground)" }}>Arjun Khanna</h2>
              <p className="text-sm font-medium mb-4" style={{ color: "var(--muted-foreground)" }}>Senior Fraud Investigator</p>
              
              <div 
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[0.65rem] font-black uppercase tracking-tighter"
                style={{ background: "rgba(114,227,173,0.1)", color: "#10b981" }}
              >
                <ShieldCheck size={14} />
                Verified Investigator (ID: INV-0047)
              </div>

              <div className="w-full border-t border-dashed my-6" style={{ borderColor: "var(--border)" }} />

              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span style={{ color: "var(--muted-foreground)" }}>Department</span>
                  <span style={{ color: "var(--foreground)" }}>Special Investigation</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span style={{ color: "var(--muted-foreground)" }}>Access Level</span>
                  <span className="text-primary">Tier 1 Elite</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span style={{ color: "var(--muted-foreground)" }}>Compliance Score</span>
                  <span style={{ color: "var(--foreground)" }}>98%</span>
                </div>
              </div>
            </div>

            {/* Security Quick Stats */}
            <div 
              className="rounded-3xl p-6 border flex items-center gap-4 group cursor-pointer transition-all hover:-translate-y-1"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-orange-600">
                <Fingerprint size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-orange-600 mb-0.5">Two-Factor Auth</p>
                <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Secured via Biometrics</p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--border)" }} />
            </div>
          </div>

          {/* RIGHT COLUMN: Settings Sections */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* General Information */}
            <div 
              className="rounded-3xl border overflow-hidden shadow-sm"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="px-8 py-6 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <User size={18} />
                  </div>
                  <h3 className="font-extrabold text-lg" style={{ color: "var(--foreground)" }}>Personal Information</h3>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">Apply Changes</button>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", val: "Arjun Khanna", icon: <User size={14} /> },
                  { label: "Email Address", val: "a.khanna@detectra.in", icon: <Mail size={14} /> },
                  { label: "Contact Phone", val: "+91 98765 00047", icon: <Phone size={14} /> },
                  { label: "Workspace HQ", val: "Mumbai, Central District", icon: <Landmark size={14} /> },
                ].map((item) => (
                  <div key={item.label} className="group border-b pb-4 last:border-0 md:last:border-b" style={{ borderColor: "var(--border)" }}>
                    <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#94A3B8] mb-1.5 block">
                      {item.label}
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.9rem] font-bold" style={{ color: "var(--foreground)" }}>{item.val}</span>
                      <button className="opacity-0 group-hover:opacity-100 text-[0.7rem] font-bold text-primary transition-opacity">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification & Privacy Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: "Security & Access", 
                  desc: "Password, SSH Keys & Logins",
                  icon: <Key className="text-blue-500" />,
                  color: "blue"
                },
                { 
                  title: "Notifications", 
                  desc: "Email, Webhook & Real-time",
                  icon: <Bell className="text-purple-500" />,
                  color: "purple"
                },
                { 
                  title: "Payment Methods", 
                  desc: "Payouts, Cards & Billing",
                  icon: <CreditCard className="text-emerald-500" />,
                  color: "emerald"
                },
                { 
                  title: "Risk Monitoring", 
                  desc: "Global Watchlist Alerts",
                  icon: <ShieldAlert className="text-rose-500" />,
                  color: "rose"
                }
              ].map((card) => (
                <div 
                  key={card.title}
                  className="rounded-3xl p-6 border flex items-start gap-4 hover:shadow-md transition-all cursor-pointer group"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={cardAccentStyles[card.color]}>
                    {card.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{card.title}</p>
                    <p className="text-[0.75rem] font-medium" style={{ color: "var(--muted-foreground)" }}>{card.desc}</p>
                  </div>
                  <ChevronRight size={14} className="mt-2 group-hover:translate-x-1 transition-transform" style={{ color: "var(--border)" }} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
