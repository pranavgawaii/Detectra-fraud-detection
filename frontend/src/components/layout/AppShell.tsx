"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, Bell, FileText, Activity, Zap,
  Settings, HelpCircle, Sun, Moon, Search,
  ChevronLeft, ChevronRight, Shield, Sparkles, X,
  PlusCircle, User, CreditCard, Settings as SettingsIcon, LogOut as LogOutIcon, Cloud, PanelLeft
} from "lucide-react";
import BrandLogo from "@/components/branding/BrandLogo";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useState, useEffect } from "react";
import { ShiningText } from "@/components/ui/shining-text";
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
  const { isThinking } = useChat();
  const [collapsed,  setCollapsed]  = useState(false);
  const [upgradeDismissed, setUpgradeDismissed] = useState(false);
  const [closedGroups, setClosedGroups] = useState<Record<string,boolean>>({});

  const isDark = theme === "dark";

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/" || pathname === "/dashboard";
    if (pathname === href) return true;
    
    const allHrefs = navGroups.flatMap(g => g.items.map(i => i.href));
    const isExactOtherMatch = allHrefs.some(h => pathname === h && h !== href);
    if (isExactOtherMatch) return false;

    const otherChildMatches = allHrefs.some(h => 
      h !== href && 
      h.startsWith(href) && 
      pathname.startsWith(h)
    );
    
    if (otherChildMatches) return false;

    return pathname.startsWith(href) && (pathname[href.length] === "/" || pathname.length === href.length);
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
    logoText: "var(--foreground)",
    tooltipBg:"var(--popover)",
    tooltipTxt:"var(--popover-foreground)",
  };

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const displayName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
    : user?.email?.split("@")[0] || "Investigator";
  
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--muted)" }}
    >
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
        <div
          className="flex items-center gap-2.5 px-3 py-4"
          style={{ borderBottom: `1px solid ${sb.border}`, minHeight: 60 }}
        >
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
            const closed = closedGroups[group.label];
            return (
              <div key={group.label} className="pt-2">
                {!collapsed && (
                  <button
                    className="flex w-full items-center justify-between px-1.5 py-1 mb-0.5"
                    onClick={() => toggleGroup(group.label)}
                  >
                    <span className="text-[0.58rem] font-bold uppercase tracking-[0.14em]"
                      style={{ color: sb.groupLbl }}>
                      {group.label}
                    </span>
                    <span style={{ color: sb.groupLbl }}>
                      {closed
                        ? <ChevronRight size={10} />
                        : <ChevronLeft size={10} style={{ transform: "rotate(-90deg)" }} />}
                    </span>
                  </button>
                )}
                {!closed && group.items.map(({ icon: Icon, href, label }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      title={collapsed ? label : undefined}
                      className="group relative flex items-center rounded-lg mb-0.5 transition-all duration-150"
                      style={{
                        padding:    collapsed ? "10px" : "8px 10px",
                        justifyContent: collapsed ? "center" : undefined,
                        background: active ? sb.activeBg : "transparent",
                        color:      active ? sb.active   : sb.text,
                        gap: "10px",
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background = sb.hover; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                    >
                      <Icon
                        size={15}
                        strokeWidth={active ? 2.5 : 2}
                        style={{ color: active ? sb.active : sb.icon, flexShrink: 0 }}
                      />
                      {!collapsed && (
                        <span className="text-[0.8rem] font-medium truncate" style={{ color: active ? sb.active : sb.text }}>
                          {label}
                        </span>
                      )}
                      {active && (
                        <span
                          className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full"
                          style={{ background: "var(--primary)" }}
                        />
                      )}
                      {collapsed && (
                        <span
                          className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-50 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[0.72rem] font-semibold opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
                          style={{
                            background: sb.tooltipBg,
                            color: sb.tooltipTxt,
                            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                            border: `1px solid ${sb.border}`,
                          }}
                        >
                          {label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}

          <div className="pt-3" style={{ borderTop: `1px solid ${sb.border}` }}>
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="group relative flex w-full items-center rounded-lg transition-all duration-150"
              style={{
                padding:    collapsed ? "10px" : "8px 10px",
                justifyContent: collapsed ? "center" : undefined,
                color: "var(--muted-foreground)",
                gap: "10px",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = sb.hover;
                e.currentTarget.style.color = "var(--foreground)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--muted-foreground)";
              }}
            >
              <LogOutIcon size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
              {!collapsed && <span className="text-[0.8rem] font-medium">Log Out</span>}
              {collapsed && (
                <span
                  className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-50 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[0.72rem] font-semibold opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 shadow-lg border border-[var(--sidebar-border)] bg-[var(--popover)] text-[var(--popover-foreground)]"
                >
                  Log Out
                </span>
              )}
            </button>
          </div>
        </nav>

        {!collapsed && !upgradeDismissed && (
          <div
            className="relative mx-2.5 mb-4 overflow-hidden rounded-xl p-3.5"
            style={{
              background: "color-mix(in srgb, var(--primary) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
            }}
          >
            <button
              onClick={() => setUpgradeDismissed(true)}
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-[var(--primary)]/20"
              style={{ color: "var(--muted-foreground)" }}
            >
              <X size={10} />
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg mb-2 bg-[var(--primary)]/15">
              <Sparkles size={13} style={{ color: "var(--primary)" }} />
            </div>
            <p className="text-[0.78rem] font-bold mb-0.5 text-[var(--foreground)]">Upgrade Pro!</p>
            <p className="text-[0.68rem] leading-snug text-[var(--muted-foreground)]">
              Upgrade to Pro and elevate your investigation experience today
            </p>
            <Link
              href="/upgrade"
              className="mt-2.5 block w-full rounded-lg py-1.5 text-center text-[0.72rem] font-bold transition-all hover:opacity-90 active:scale-[0.98] bg-[var(--primary)] text-[var(--primary-foreground)]"
            >
              Upgrade Plan
            </Link>
          </div>
        )}
      </aside>

      {/* ══ MAIN AREA ════════════════════════════════════════ */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]"
          style={{ minHeight: 60 }}
        >
          <div className="flex flex-1 items-center max-w-md">
            <div className="relative w-full group">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--primary)] text-[var(--muted-foreground)]"
              />
              <input
                type="text"
                placeholder="Search documentation, rules, or claims..."
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-2 pl-9 pr-4 text-[0.78rem] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 text-[var(--foreground)]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-[var(--muted)] px-1.5 text-[0.65rem] font-medium text-[var(--muted-foreground)] border-[var(--border)]">
                  <span className="text-[0.8rem]">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>

          {/* AI Status removed from Top Bar per request */}

          <div className="flex-1" />
          
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <div className="flex items-center bg-[var(--muted)] p-1 rounded-xl border border-[var(--border)]">
              <button
                onClick={() => theme !== "light" && toggle()}
                className={`p-1.5 rounded-lg transition-all ${!isDark ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}
              >
                <Sun size={14} />
              </button>
              <button
                onClick={() => theme !== "dark" && toggle()}
                className={`p-1.5 rounded-lg transition-all ${isDark ? "bg-[var(--card)] shadow-sm text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}
              >
                <Moon size={14} />
              </button>
            </div>

            {/* Bell */}
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--primary)] group"
            >
              <Bell size={15} className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
              <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full ring-2 ring-[var(--card)]" style={{ background: "#ef4444" }} />
            </button>

            <div className="h-6 w-[1px] bg-[var(--border)] hidden sm:block" />

            {/* Avatar / Profile Menu */}
            <Menu>
              <MenuTrigger className="flex items-center gap-3 group focus:outline-none">
                <div className="flex flex-col items-end hidden sm:flex">
                  <p className="text-[0.78rem] font-bold leading-tight text-[var(--foreground)]">{displayName}</p>
                  <p className="text-[0.64rem] font-medium text-[var(--muted-foreground)]">Sr. Investigator</p>
                </div>
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl font-bold text-[0.75rem] transition-all group-hover:scale-[1.02] bg-[var(--primary)] text-white shadow-sm border border-black/10"
                >
                  {initials}
                </div>
              </MenuTrigger>
              <MenuPopup align="end" sideOffset={12} className="w-56 p-1 bg-[var(--popover)] border border-[var(--border)] text-[var(--foreground)]">
                <MenuItem onClick={() => window.location.href = "/account"}>
                  <User size={14} className="mr-2" /> Profile
                  <MenuShortcut>⇧⌘P</MenuShortcut>
                </MenuItem>
                <MenuItem onClick={() => window.location.href = "/account/billing"}>
                  <CreditCard size={14} className="mr-2" /> Billing
                  <MenuShortcut>⌘B</MenuShortcut>
                </MenuItem>
                <MenuItem onClick={() => window.location.href = "/account/settings"}>
                  <SettingsIcon size={14} className="mr-2" /> Settings
                  <MenuShortcut>⌘S</MenuShortcut>
                </MenuItem>
                <MenuItem>
                  <Cloud size={14} className="mr-2" /> API Access
                </MenuItem>
                <MenuSeparator className="bg-[var(--border)]" />
                <MenuItem 
                  variant="destructive" 
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/login";
                  }}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOutIcon size={14} className="mr-2" /> Log out
                  <MenuShortcut>⇧⌘Q</MenuShortcut>
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
