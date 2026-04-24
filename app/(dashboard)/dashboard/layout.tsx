"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare, Bot, ImageIcon, Video, Mic,
  Share2, Megaphone, GalleryHorizontal, BookOpen,
  CreditCard, Compass, Settings, LayoutDashboard,
  LogOut, ChevronRight, UserCircle, Star, Film,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTIONS = [
  {
    title: "Créer",
    items: [
      { href: "/dashboard",           icon: LayoutDashboard,   label: "Accueil"        },
      { href: "/dashboard/chat",       icon: MessageSquare,     label: "Chat IA"        },
      { href: "/dashboard/agents",     icon: Bot,               label: "Agents IA"      },
      { href: "/dashboard/images",     icon: ImageIcon,         label: "Images"         },
      { href: "/dashboard/videos",     icon: Video,             label: "Vidéos"         },
      { href: "/dashboard/audio",      icon: Mic,               label: "Audio & Musique"},
    ],
  },
  {
    title: "Studio IA",
    items: [
      { href: "/dashboard/avatar",     icon: UserCircle,        label: "Avatar IA"      },
      { href: "/dashboard/influencer", icon: Star,              label: "Influenceur IA" },
      { href: "/dashboard/studio",     icon: Film,              label: "Films & Séries" },
    ],
  },
  {
    title: "Publier",
    items: [
      { href: "/dashboard/social",     icon: Share2,            label: "Social Media"   },
      { href: "/dashboard/campaign",   icon: Megaphone,         label: "Campagnes"      },
      { href: "/dashboard/gallery",    icon: GalleryHorizontal, label: "Galerie"        },
      { href: "/dashboard/prompts",    icon: BookOpen,          label: "Prompts"        },
    ],
  },
  {
    title: "Compte",
    items: [
      { href: "/dashboard/explore",    icon: Compass,           label: "Explorer"       },
      { href: "/dashboard/plans",      icon: CreditCard,        label: "Plans & Crédits"},
      { href: "/dashboard/settings",   icon: Settings,          label: "Paramètres"     },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside className="w-56 flex-shrink-0 flex flex-col border-r h-full"
        style={{ background: "var(--bg-light)", borderColor: "var(--border)" }}>

        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-4 border-b flex-shrink-0"
          style={{ borderColor: "var(--border)" }}>
          <span className="font-extrabold text-lg tracking-tight" style={{ color: "var(--accent)" }}>Outio</span>
          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full"
            style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>Free</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="px-2 mb-1 text-[9px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-subtle)" }}>
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map(({ href, icon: Icon, label }) => {
                  const active = isActive(href);
                  return (
                    <Link key={href} href={href}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all group"
                      style={active
                        ? { background: "var(--bg-surface)", color: "var(--accent)" }
                        : { color: "var(--text-muted)" }}>
                      <Icon size={14} className="flex-shrink-0" />
                      <span className="flex-1 truncate">{label}</span>
                      {active && <ChevronRight size={11} style={{ color: "var(--accent)" }} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t flex-shrink-0 space-y-2.5" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <button className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all hover:bg-[var(--bg-surface)]"
              style={{ color: "var(--text-subtle)" }}>
              <LogOut size={12} /> Quitter
            </button>
          </div>
          {/* Credits */}
          <div className="rounded-xl p-2.5" style={{ background: "var(--bg-surface)" }}>
            <div className="flex justify-between text-[10px] mb-1.5">
              <span style={{ color: "var(--text-muted)" }}>Crédits</span>
              <span className="flex items-center gap-0.5 font-bold" style={{ color: "var(--accent)" }}>
                <Zap size={9} /> 287/500
              </span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div className="h-full rounded-full" style={{ background: "var(--accent)", width: "57%" }} />
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
