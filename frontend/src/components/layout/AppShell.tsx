"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, Bell, FileText, Activity, Zap,
  Settings, HelpCircle, Sun, Moon, Search,
  ChevronLeft, ChevronRight, Shield, Sparkles, X,
  PlusCircle, User, CreditCard, Settings as SettingsIcon, LogOut as LogOutIcon, PanelLeft
} from "lucide-react";
import BrandLogo from "@/components/branding/BrandLogo";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useState, useEffect } from "react";
import { 
  Menu, MenuTrigger, MenuPopup, MenuItem, MenuSeparator, MenuShortcut 
} from "@/components/ui/menu";
import { useChat } from "@/components/providers/ChatProvider";
import { supabase } from "@/lib/supabase";

const navGroups = [
  {
    label: "MENU",
    items: [
      { icon: LayoutGrid, href: "/dashboard",        label: "Dashboard"    },
      { icon: Bell,       href: "/notifications",    label: "Notifications"},
      { icon: Activity,   href: "/analytics",        label: "Analytics"    },
      { icon: FileText,   href: "/claims",           label: "Claims Queue" },
      { icon: Shield,     href: "/claims/submit",    label: "New Claim"    },
    ],
  },
  {
    label: "FEATURES",
    items: [
      { icon: Zap,        href: "/rules",            label: "Rules Engine" },
      { icon: PlusCircle, href: "/rules/new",        label: "Create Rule"  },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { icon: Settings,   href: "/account",          label: "Settings"     },
      { icon: HelpCircle, href: "/help",             label: "Help Center"  },
    ],
  },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [collapsed,  setCollapsed]  = useState(false);
  const [closedGroups, setClosedGroups] = useState<Record<string,boolean>>({});

  const isDark = theme === "dark";

  // Check if current path is a public/landing/auth page
  const isLanding = pathname === "/";
  const isAuth = pathname === "/login" || pathname === "/sign-up";
  
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const toggleGroup = (label: string) =>
    setClosedGroups(p => ({ ...p, [label]: !p[label] }));

  const sb = {
    bg:       "var(--sidebar)",
    border:   "var(--sidebar-border)",
    groupLbl: "var(--muted-foreground)",
    icon:     "var(--sidebar-foreground)",
    text:     "var(--foreground)",
    active:   "var(--foreground)",
    activeBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
    hover:    isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
  };

  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("customer");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
          .then(({ data }) => data && setRole(data.role));
      }
    });
  }, []);

  // Return children directly for landing and auth pages (they have their own wrappers)
  if (isLanding || isAuth) {
    return <>{children}</>;
  }

  const displayName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
    : user?.email?.split("@")[0] || "Investigator";
  
  const roleLabel = role === "company_admin" 
    ? "Company Administrator" 
    : role === "employee_admin" 
    ? "Lead Investigator" 
    : "Policy Holder";
  
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--muted)" }}>
      {/* ══ SIDEBAR ══════════════════════════════════════════ */}
      <aside
        className="sticky top-0 flex h-screen flex-col overflow-hidden z-40 transition-[width] duration-300"
        style={{
          width:     collapsed ? "68px" : "216px",
          minWidth:  collapsed ? "68px" : "216px",
          background: sb.bg,
          borderRight: `1px solid ${sb.border}`,
        }}
      >
        <div className="flex items-center gap-2.5 px-3 py-4" style={{ borderBottom: `1px solid ${sb.border}`, minHeight: 60 }}>
          <div className="flex flex-1 items-center gap-2 overflow-hidden min-w-0">
            <BrandLogo size="sm" showName={!collapsed} className="shrink-0" />
          </div>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all hover:bg-[var(--sidebar-accent)] text-[var(--primary)] active:scale-90 border border-transparent hover:border-[var(--border)] shadow-sm hover:shadow-md"
          >
            <PanelLeft size={15} strokeWidth={2.5} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-2 space-y-1 mt-4 text-[var(--sidebar-foreground)]">
          {navGroups.map(group => {
            if (role === "customer") {
              if (group.label === "FEATURES") return null;
              if (group.label === "MENU") {
                const filteredItems = group.items.filter(i => ["Dashboard", "Notifications", "New Claim"].includes(i.label));
                if (filteredItems.length === 0) return null;
                group = { ...group, items: filteredItems };
              }
            }

            const closed = closedGroups[group.label];
            return (
              <div key={group.label} className="pt-2">
                {!collapsed && (
                  <button className="flex w-full items-center justify-between px-1.5 py-1 mb-0.5" onClick={() => toggleGroup(group.label)}>
                    <span className="text-[0.58rem] font-bold uppercase tracking-[0.14em]" style={{ color: sb.groupLbl }}>{group.label}</span>
                    <span style={{ color: sb.groupLbl }}>
                      {closed ? <ChevronRight size={10} /> : <ChevronLeft size={10} style={{ transform: "rotate(-90deg)" }} />}
                    </span>
                  </button>
                )}
                {!closed && group.items.map(({ icon: Icon, href, label }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="group relative flex items-center rounded-lg mb-0.5 transition-all duration-150"
                      style={{
                        padding: collapsed ? "10px" : "8px 10px",
                        justifyContent: collapsed ? "center" : undefined,
                        background: active ? sb.activeBg : "transparent",
                        color: active ? sb.active : sb.text,
                        gap: "10px",
                      }}
                    >
                      <Icon size={15} strokeWidth={active ? 2.5 : 2} style={{ color: active ? sb.active : sb.icon, flexShrink: 0 }} />
                      {!collapsed && <span className="text-[0.8rem] font-medium truncate">{label}</span>}
                    </Link>
                  );
                })}
              </div>
            );
          })}
          
          <div className="pt-3" style={{ borderTop: `1px solid ${sb.border}` }}>
            <button
               onClick={async () => {
                 await supabase.auth.signOut();
                 window.location.href = "/login";
               }}
              className="group relative flex w-full items-center rounded-lg transition-all duration-150 p-[10px] sm:p-[8px_10px] gap-[10px] text-[var(--muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--foreground)]"
              style={{ justifyContent: collapsed ? "center" : undefined }}
            >
              <LogOutIcon size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
              {!collapsed && <span className="text-[0.8rem] font-medium">Log Out</span>}
            </button>
          </div>
        </nav>

      </aside>

      {/* ══ MAIN AREA ════════════════════════════════════════ */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]" style={{ minHeight: 60 }}>
          <div className="flex flex-1 items-center max-w-md">
            <div className="relative w-full group">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input type="text" placeholder="Search..." className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-2 pl-9 pr-4 text-[0.78rem] outline-none text-[var(--foreground)]" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[var(--muted)] p-1 rounded-xl border border-[var(--border)]">
              <button onClick={() => theme !== "light" && toggle()} className={`p-1.5 rounded-lg ${!isDark ? "bg-[var(--card)] text-[var(--primary)]" : "text-[var(--muted-foreground)]"}`}><Sun size={14} /></button>
              <button onClick={() => theme !== "dark" && toggle()} className={`p-1.5 rounded-lg ${isDark ? "bg-[var(--card)] text-[var(--primary)]" : "text-[var(--muted-foreground)]"}`}><Moon size={14} /></button>
            </div>
            <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)]"><Bell size={15} /></button>
            <Menu>
              <MenuTrigger>
                <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-[var(--primary)] text-white font-bold text-[0.75rem] transition-transform active:scale-95 cursor-pointer hover:opacity-90">{initials}</div>
              </MenuTrigger>
              <MenuPopup align="end" className="w-56 mt-2">
                <div className="px-3 py-2.5 mb-1 bg-[var(--muted)]/50 rounded-lg mx-1">
                  <p className="text-[0.75rem] font-bold text-[var(--foreground)] truncate">{displayName}</p>
                  <p className="text-[0.65rem] text-[var(--muted-foreground)] truncate">{roleLabel}</p>
                </div>
                <MenuItem href="/account">
                  <SettingsIcon size={14} className="mr-2" /> Account Settings
                </MenuItem>
                <MenuItem href="/dashboard">
                  <LayoutGrid size={14} className="mr-2" /> Dashboard
                </MenuItem>
                <MenuSeparator />
                <MenuItem onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/login";
                }} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                  <LogOutIcon size={14} className="mr-2" /> Log Out
                </MenuItem>
              </MenuPopup>
            </Menu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
