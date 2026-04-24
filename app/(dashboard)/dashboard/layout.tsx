"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare, Users, Image, Video, Mic, Share2,
  Megaphone, GalleryHorizontal, BookOpen, CreditCard,
  Compass, Settings, LayoutDashboard, LogOut, ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/dashboard",           icon: LayoutDashboard,    label: "Accueil" },
  { href: "/dashboard/chat",      icon: MessageSquare,      label: "Chat" },
  { href: "/dashboard/agents",    icon: Users,              label: "Agents" },
  { href: "/dashboard/images",    icon: Image,              label: "Images" },
  { href: "/dashboard/videos",    icon: Video,              label: "Vidéos" },
  { href: "/dashboard/audio",     icon: Mic,                label: "Audio" },
  { href: "/dashboard/social",    icon: Share2,             label: "Social" },
  { href: "/dashboard/campaign",  icon: Megaphone,          label: "Campagnes" },
  { href: "/dashboard/gallery",   icon: GalleryHorizontal,  label: "Galerie" },
  { href: "/dashboard/prompts",   icon: BookOpen,           label: "Prompts" },
  { href: "/dashboard/explore",   icon: Compass,            label: "Explorer" },
  { href: "/dashboard/plans",     icon: CreditCard,         label: "Plans" },
  { href: "/dashboard/settings",  icon: Settings,           label: "Paramètres" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>

      {/* ── Sidebar ── */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r h-full"
        style={{ background: "var(--bg-light)", borderColor: "var(--border)" }}>

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: "var(--border)" }}>
          <span className="font-bold text-xl tracking-tight" style={{ color: "var(--accent)" }}>outio</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
                style={active
                  ? { background: "var(--bg-surface)", color: "var(--accent)" }
                  : { color: "var(--text-muted)" }}>
                <Icon size={17} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} style={{ color: "var(--accent)" }} />}
              </Link>
            );
          })}
        </nav>

        {/* Credits + Logout */}
        <div className="p-4 border-t space-y-3" style={{ borderColor: "var(--border)" }}>
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <div className="card p-3">
            <div className="flex justify-between text-xs mb-2" style={{ color: "var(--text-muted)" }}>
              <span>Crédits</span>
              <span style={{ color: "var(--accent)" }}>500 / 500</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div className="h-full rounded-full" style={{ background: "var(--accent)", width: "100%" }} />
            </div>
          </div>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all hover:bg-[var(--bg-surface)]"
            style={{ color: "var(--text-muted)" }}>
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
