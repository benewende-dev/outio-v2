"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Wrench, Bot, CreditCard,
  Users, BarChart3, Settings, ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/admin",        label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/tools",  label: "Outils landing", icon: Wrench },
  { href: "/admin/agents", label: "Agents",     icon: Bot },
  { href: "/admin/plans",  label: "Plans & Crédits", icon: CreditCard },
  { href: "/admin/users",  label: "Utilisateurs", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings",  label: "Paramètres", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <div className="h-16 flex items-center px-5 border-b" style={{ borderColor: "var(--border)" }}>
          <Link href="/" className="font-extrabold text-lg" style={{ color: "var(--accent)" }}>Outio</Link>
          <span className="ml-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>Admin</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
                style={{
                  background: active ? "var(--bg-surface)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-muted)",
                }}>
                <item.icon size={15} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={12} style={{ color: "var(--accent)" }} />}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-subtle)" }}>Admin Panel v2</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
