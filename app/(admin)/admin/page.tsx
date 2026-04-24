"use client";

import Link from "next/link";
import { Wrench, Bot, CreditCard, Users, ArrowRight, Activity } from "lucide-react";

const QUICK_LINKS = [
  { href: "/admin/tools",    icon: Wrench,    label: "Gérer les outils", desc: "Activer, masquer, réordonner les cartes de la landing page." },
  { href: "/admin/agents",   icon: Bot,       label: "Agents",           desc: "Configurer les agents IA disponibles sur la plateforme." },
  { href: "/admin/plans",    icon: CreditCard, label: "Plans & Crédits", desc: "Modifier les plans, crédits et limites par modèle." },
  { href: "/admin/users",    icon: Users,     label: "Utilisateurs",     desc: "Voir et gérer les comptes utilisateurs." },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-1" style={{ color: "var(--text)" }}>Tableau de bord</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Bienvenue dans l&apos;administration Outio.
        </p>
      </div>

      {/* Status */}
      <div className="rounded-2xl p-5 border mb-8 flex items-center gap-3"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <Activity size={14} style={{ color: "var(--accent)" }} />
        <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          Plateforme opérationnelle
        </span>
        <Link href="/" className="ml-auto text-xs font-semibold flex items-center gap-1 hover:underline"
          style={{ color: "var(--accent)" }}>
          Voir la landing <ArrowRight size={11} />
        </Link>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 gap-4">
        {QUICK_LINKS.map((item) => (
          <Link key={item.href} href={item.href}
            className="group rounded-2xl p-6 border flex items-start gap-4 transition-all hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--bg-surface)" }}>
              <item.icon size={18} style={{ color: "var(--accent)" }} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm mb-1" style={{ color: "var(--text)" }}>{item.label}</div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
            </div>
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0"
              style={{ color: "var(--accent)" }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
