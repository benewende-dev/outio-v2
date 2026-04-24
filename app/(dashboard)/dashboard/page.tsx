import Link from "next/link";
import {
  MessageSquare, Users, Image, Video, Mic,
  Share2, Megaphone, BookOpen, Compass, ArrowRight,
} from "lucide-react";

const TOOLS = [
  { href: "/dashboard/chat",     icon: MessageSquare, label: "Chat",       desc: "Multi-modèles avec streaming",        color: "#6B9080" },
  { href: "/dashboard/agents",   icon: Users,         label: "Agents",     desc: "29 agents autonomes spécialisés",     color: "#5a9e8a" },
  { href: "/dashboard/images",   icon: Image,         label: "Images",     desc: "Flux, Midjourney, DALL-E et plus",    color: "#4e8a78" },
  { href: "/dashboard/videos",   icon: Video,         label: "Vidéos",     desc: "Sora, Kling, Runway, Veo 3",         color: "#A4C3B2" },
  { href: "/dashboard/audio",    icon: Mic,           label: "Audio",      desc: "TTS, STT, musique IA",               color: "#8aafA0" },
  { href: "/dashboard/social",   icon: Share2,        label: "Social",     desc: "Gérez tous vos réseaux sociaux",     color: "#7a9e90" },
  { href: "/dashboard/campaign", icon: Megaphone,     label: "Campagnes",  desc: "Brand DNA, moodboards, campagnes",   color: "#6B9080" },
  { href: "/dashboard/prompts",  icon: BookOpen,      label: "Prompts",    desc: "Bibliothèque de 40+ prompts pro",    color: "#5a7d6e" },
  { href: "/dashboard/explore",  icon: Compass,       label: "Explorer",   desc: "Découvrez les créations de la cmt",  color: "#A4C3B2" },
];

export default function DashboardHome() {
  return (
    <div className="p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
          Bonjour 👋
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Que voulez-vous créer aujourd&apos;hui ?
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Crédits restants", value: "500",  sub: "Plan Free" },
          { label: "Générations",      value: "0",    sub: "Ce mois" },
          { label: "Agents utilisés",  value: "0",    sub: "Cette semaine" },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div className="text-2xl font-bold mb-0.5" style={{ color: "var(--accent)" }}>{s.value}</div>
            <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tools grid */}
      <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-subtle)" }}>
        Outils disponibles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href}
            className="card card-hover p-5 flex items-start gap-4 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--bg-surface)" }}>
              <t.icon size={18} style={{ color: t.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm mb-0.5" style={{ color: "var(--text)" }}>{t.label}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t.desc}</div>
            </div>
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0"
              style={{ color: "var(--accent)" }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
