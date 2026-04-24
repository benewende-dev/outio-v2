"use client";

import { motion } from "framer-motion";
import { Check, Zap, CreditCard, TrendingUp, ArrowUpRight } from "lucide-react";

const CURRENT = {
  plan: "Free", credits: 287, total: 500, renewsIn: 18,
};

const PLANS = [
  {
    name: "Free",  price: "0€",  credits: 500,   highlight: false, current: true,
    features: ["500 crédits/mois", "Modèles essentiels", "5 agents", "Galerie 1 Go"],
  },
  {
    name: "Starter", price: "9€", credits: 3000, highlight: false, current: false,
    features: ["3 000 crédits/mois", "Modèles mid-tier", "Tous les agents", "Galerie 10 Go", "Support email"],
  },
  {
    name: "Pro",  price: "29€", credits: 15000, highlight: true,  current: false,
    features: ["15 000 crédits/mois", "Modèles premium", "Agents autonomes", "Galerie 50 Go", "Deep Research", "Support prioritaire"],
  },
  {
    name: "Business", price: "89€", credits: 50000, highlight: false, current: false,
    features: ["50 000 crédits/mois", "Tous les modèles", "API Access", "Équipe 10 membres", "Galerie illimitée", "Support dédié"],
  },
];

const HISTORY = [
  { id: 1, action: "Chat — Claude Sonnet 4.6",  credits: -12, date: "Auj. 14:23" },
  { id: 2, action: "Image — Flux 2 Pro",         credits: -8,  date: "Auj. 13:10" },
  { id: 3, action: "Audio TTS — ElevenLabs",     credits: -3,  date: "Auj. 11:45" },
  { id: 4, action: "Chat — DeepSeek V4",         credits: -1,  date: "Hier 22:30" },
  { id: 5, action: "Recharge mensuelle",         credits: 500, date: "1 avr. 2026" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const card = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function PlansPage() {
  const pct = Math.round((CURRENT.credits / CURRENT.total) * 100);

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Plans & Crédits</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Gérez votre abonnement et suivez votre consommation.</p>
      </div>

      {/* Current plan card */}
      <div className="rounded-3xl border p-6 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                Plan actuel
              </span>
              <span className="font-black text-lg" style={{ color: "var(--text)" }}>{CURRENT.plan}</span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Renouvellement dans {CURRENT.renewsIn} jours
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white self-start"
            style={{ background: "var(--accent)" }}>
            <ArrowUpRight size={14} /> Passer à Pro
          </button>
        </div>

        {/* Credits bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: "var(--text-muted)" }}>Crédits restants</span>
            <span className="font-bold" style={{ color: "var(--accent)" }}>
              {CURRENT.credits} / {CURRENT.total}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: pct < 20 ? "#dc2626" : "var(--accent)" }}
            />
          </div>
          <p className="text-xs mt-1.5" style={{ color: "var(--text-subtle)" }}>
            {pct}% restants · {CURRENT.total - CURRENT.credits} utilisés ce mois
          </p>
        </div>
      </div>

      {/* Plans comparison */}
      <div className="mb-8">
        <h2 className="font-black text-base mb-4" style={{ color: "var(--text)" }}>Changer de plan</h2>
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PLANS.map((p) => (
            <motion.div key={p.name} variants={card}
              className="rounded-2xl border p-5 flex flex-col"
              style={{
                background:   p.highlight ? "var(--accent)" : "var(--bg-card)",
                borderColor:  p.highlight ? "transparent"   : p.current ? "var(--border-strong)" : "var(--border)",
              }}>
              {p.highlight && (
                <span className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60 text-white">✦ Populaire</span>
              )}
              {p.current && !p.highlight && (
                <span className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>✓ Plan actuel</span>
              )}
              <div className="font-black text-sm mb-1" style={{ color: p.highlight ? "#fff" : "var(--text)" }}>{p.name}</div>
              <div className="mb-1">
                <span className="text-3xl font-black" style={{ color: p.highlight ? "#fff" : "var(--accent)" }}>{p.price}</span>
                <span className="text-xs ml-1" style={{ color: p.highlight ? "rgba(255,255,255,0.5)" : "var(--text-subtle)" }}>/mois</span>
              </div>
              <div className="text-xs font-semibold mb-4" style={{ color: p.highlight ? "rgba(255,255,255,0.6)" : "var(--text-subtle)" }}>
                <Zap size={10} className="inline mr-0.5" />{p.credits.toLocaleString()} crédits
              </div>
              <ul className="space-y-2 mb-5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs"
                    style={{ color: p.highlight ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}>
                    <Check size={11} className="flex-shrink-0 mt-0.5" style={{ color: p.highlight ? "rgba(255,255,255,0.6)" : "var(--accent)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              {!p.current && (
                <button className="text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90"
                  style={p.highlight
                    ? { background: "rgba(255,255,255,0.15)", color: "#fff" }
                    : { background: "var(--bg-surface)", color: "var(--accent)" }}>
                  {p.name === "Business" ? "Nous contacter" : `Choisir ${p.name}`}
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Usage history */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} style={{ color: "var(--accent)" }} />
          <h2 className="font-black text-base" style={{ color: "var(--text)" }}>Historique récent</h2>
        </div>
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {HISTORY.map((h, i) => (
            <div key={h.id}
              className={`flex items-center justify-between px-5 py-3.5 ${i < HISTORY.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: h.credits > 0 ? "#2d9d6e18" : "var(--bg-surface)" }}>
                  {h.credits > 0
                    ? <Zap size={12} style={{ color: "#2d9d6e" }} />
                    : <CreditCard size={12} style={{ color: "var(--accent)" }} />}
                </div>
                <span className="text-sm" style={{ color: "var(--text)" }}>{h.action}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>{h.date}</span>
                <span className="text-sm font-bold w-16 text-right"
                  style={{ color: h.credits > 0 ? "#2d9d6e" : "var(--text-muted)" }}>
                  {h.credits > 0 ? "+" : ""}{h.credits} cr
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
