"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Check, Zap, Cpu, Palette, Mail,
  MessageCircle, Code2, Briefcase,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { DEFAULT_TOOLS, loadTools, TOOL_ICONS, type ToolConfig } from "@/lib/data/tools";

/* ── Animation variants ────────────────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardIn = {
  hidden:  { opacity: 0, y: 14, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

/* ── Models ────────────────────────────────────────────── */
const MODELS = [
  "Claude Opus 4.7", "GPT-5.5", "Gemini Ultra", "DeepSeek V4",
  "Mistral Large", "Llama 4", "Grok 4", "Qwen 3.6",
  "Flux 2 Pro", "Midjourney v7", "DALL-E 4", "Sora 2",
  "Kling 3.0", "Veo 3", "ElevenLabs v3", "Suno v5.5",
];

/* ── Plans ─────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Free",  price: "0€",  sub: "Pour commencer",
    credits: "500 crédits / mois",
    features: ["Modèles essentiels", "Agents de base", "Galerie personnelle"],
    cta: "Commencer gratuitement", highlight: false,
  },
  {
    name: "Starter", price: "9€", sub: "Pour aller plus loin",
    credits: "3 000 crédits / mois",
    features: ["Modèles mid-tier", "Tous les agents", "Galerie 10 Go", "Support email"],
    cta: "Choisir Starter", highlight: false,
  },
  {
    name: "Pro",  price: "29€", sub: "Pour créateurs sérieux",
    credits: "15 000 crédits / mois",
    features: ["Modèles premium", "Agents autonomes", "Galerie 50 Go", "Deep Research", "Support prioritaire"],
    cta: "Choisir Pro", highlight: true,
  },
  {
    name: "Business", price: "89€", sub: "Pour les équipes",
    credits: "50 000 crédits / mois",
    features: ["Tous les modèles", "API Access", "Équipe 10 membres", "Galerie illimitée", "Support dédié"],
    cta: "Nous contacter", highlight: false,
  },
];

/* ── WHY cards ─────────────────────────────────────────── */
const WHY = [
  {
    icon: Cpu,
    title: "Toute l'intelligence IA",
    desc: "Claude, GPT, Gemini, DeepSeek et 25+ autres modèles dans une seule interface. Changez de modèle en pleine conversation, comparez, analysez.",
  },
  {
    icon: Palette,
    title: "Créez sans limites",
    desc: "Images, vidéos, musique, voix-off. Les meilleures IA génératives réunies — de l'idée au rendu final, sans changer d'outil.",
  },
  {
    icon: Zap,
    title: "Automatisez vraiment",
    desc: "Des agents spécialisés qui planifient, créent et publient à votre place. Social media, campagnes marketing, workflows — en automatique.",
  },
];

/* ══════════════════════════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════════════════════════ */

export default function LandingPage() {
  const [tools, setTools] = useState<ToolConfig[]>(DEFAULT_TOOLS);

  useEffect(() => {
    setTools(loadTools());
  }, []);

  const visibleTools = [...tools]
    .filter((t) => t.visible)
    .sort((a, b) => a.order - b.order);

  /* section refs for scroll-trigger */
  const toolsRef   = useRef(null);
  const whyRef     = useRef(null);
  const pricingRef = useRef(null);

  const toolsInView   = useInView(toolsRef,   { once: true, margin: "-80px" });
  const whyInView     = useInView(whyRef,     { once: true, margin: "-80px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Nav ────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 glass border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight" style={{ color: "var(--accent)" }}>
            Outio
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            <Link href="#platform" className="hover:text-[var(--accent)] transition-colors">Plateforme</Link>
            <Link href="#pricing"  className="hover:text-[var(--accent)] transition-colors">Tarifs</Link>
          </div>
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <Link href="/login"
              className="hidden sm:block text-sm px-4 py-2 rounded-xl transition-colors hover:bg-[var(--bg-surface)]"
              style={{ color: "var(--text-muted)" }}>
              Connexion
            </Link>
            <Link href="/register"
              className="text-sm px-5 py-2.5 rounded-xl font-bold text-white transition-all hover:opacity-90 flex items-center gap-1.5"
              style={{ background: "var(--accent)" }}>
              Essayer <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Orb background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-[0.12] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #6B9080 0%, transparent 70%)" }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-24 text-center">
          <motion.div
            initial="hidden" animate="visible"
            variants={stagger}
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border"
                style={{ background: "var(--bg-surface)", color: "var(--accent)", borderColor: "var(--border-strong)" }}>
                <Zap size={11} />
                Plateforme IA tout-en-un
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp}
              className="text-5xl md:text-[72px] font-black tracking-tight leading-[1.05]"
              style={{ color: "var(--text)" }}>
              Créez plus.<br />
              <span style={{
                background: "linear-gradient(135deg, #6B9080 0%, #A4C3B2 55%, #6B9080 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Pensez moins.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p variants={fadeUp}
              className="text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{ color: "var(--text-muted)" }}>
              Chat intelligent, agents autonomes, images, vidéos, audio, social media —
              réunis en une seule plateforme conçue pour aller vite.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link href="/register"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "var(--accent)", boxShadow: "0 12px 40px rgba(107,144,128,0.35)" }}>
                Commencer gratuitement
                <ArrowRight size={16} />
              </Link>
              <Link href="#platform"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-sm transition-all hover:bg-[var(--bg-surface)]"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                Voir la plateforme
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Models ticker ──────────────────────────────────── */}
      <div className="py-8 border-y overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--bg-light)" }}>
        <p className="text-center text-[10px] font-black uppercase tracking-widest mb-5" style={{ color: "var(--text-subtle)" }}>
          Propulsé par les meilleurs modèles du monde
        </p>
        <div className="overflow-hidden">
          <div className="ticker-track gap-2.5 px-2.5">
            {[...MODELS, ...MODELS].map((m, i) => (
              <span key={i}
                className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border flex-shrink-0 ${i < MODELS.length ? "" : ""}`}
                style={{
                  color: i % 2 === 0 ? "var(--text-muted)" : "var(--accent)",
                  borderColor: i % 2 === 0 ? "var(--border)" : "var(--border-strong)",
                  background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-surface)",
                }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Platform / Tools ───────────────────────────────── */}
      <section id="platform" className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
              La plateforme
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: "var(--text)" }}>
              Tout ce qu&apos;il vous faut.<br />Un seul endroit.
            </h2>
          </div>
          <p className="text-base max-w-sm" style={{ color: "var(--text-muted)" }}>
            Du chat aux campagnes marketing, de la recherche à la création vidéo — chaque outil conçu pour vous faire gagner du temps.
          </p>
        </div>

        <motion.div
          ref={toolsRef}
          variants={stagger}
          initial="hidden"
          animate={toolsInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {visibleTools.map((t) => {
            const Icon = TOOL_ICONS[t.iconName];
            return (
              <motion.div key={t.id} variants={cardIn}>
                <Link href="/register"
                  className="tool-card group rounded-2xl p-5 border flex flex-col gap-3.5 transition-colors hover:border-[var(--border-strong)] cursor-pointer block"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--bg-surface)" }}>
                      {Icon && <Icon size={17} style={{ color: "var(--accent)" }} />}
                    </motion.div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: "var(--bg-surface)", color: "var(--text-subtle)" }}>
                      {t.tag}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-0.5" style={{ color: "var(--text)" }}>{t.label}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{t.desc}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity -mt-1"
                    style={{ color: "var(--accent)" }}>
                    Explorer <ArrowRight size={10} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Why Outio ──────────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-light)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            ref={whyRef}
            variants={stagger}
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-5"
          >
            {WHY.map((w) => (
              <motion.div key={w.title} variants={cardIn}
                className="rounded-3xl p-8 border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "var(--bg-surface)" }}>
                  <w.icon size={22} style={{ color: "var(--accent)" }} />
                </motion.div>
                <h3 className="font-black text-lg mb-3" style={{ color: "var(--text)" }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
            Tarifs
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-3" style={{ color: "var(--text)" }}>
            Simple et transparent.
          </h2>
          <p className="text-base" style={{ color: "var(--text-muted)" }}>
            Démarrez gratuitement. Aucune carte bancaire requise.
          </p>
        </div>

        <motion.div
          ref={pricingRef}
          variants={stagger}
          initial="hidden"
          animate={pricingInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start"
        >
          {PLANS.map((p) => (
            <motion.div key={p.name} variants={cardIn}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-3xl p-7 flex flex-col border"
              style={{
                background: p.highlight ? "var(--accent)" : "var(--bg-card)",
                borderColor: p.highlight ? "transparent" : "var(--border)",
              }}>
              {p.highlight && (
                <div className="text-[10px] font-black uppercase tracking-widest mb-3 text-white opacity-60">
                  ✦ Populaire
                </div>
              )}
              <div className="text-xs font-medium mb-1"
                style={{ color: p.highlight ? "rgba(255,255,255,0.6)" : "var(--text-subtle)" }}>
                {p.sub}
              </div>
              <div className="font-black text-base mb-2"
                style={{ color: p.highlight ? "#fff" : "var(--text)" }}>
                {p.name}
              </div>
              <div className="mb-1.5">
                <span className="text-4xl font-black"
                  style={{ color: p.highlight ? "#fff" : "var(--accent)" }}>
                  {p.price}
                </span>
                <span className="text-sm ml-1"
                  style={{ color: p.highlight ? "rgba(255,255,255,0.5)" : "var(--text-muted)" }}>
                  /mois
                </span>
              </div>
              <div className="text-xs font-semibold mb-6"
                style={{ color: p.highlight ? "rgba(255,255,255,0.6)" : "var(--text-subtle)" }}>
                {p.credits}
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm"
                    style={{ color: p.highlight ? "rgba(255,255,255,0.82)" : "var(--text-muted)" }}>
                    <Check size={13} className="flex-shrink-0 mt-0.5"
                      style={{ color: p.highlight ? "rgba(255,255,255,0.6)" : "var(--accent)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register"
                className="text-center text-sm font-bold px-4 py-3 rounded-2xl transition-all hover:opacity-90"
                style={p.highlight
                  ? { background: "rgba(255,255,255,0.15)", color: "#fff" }
                  : { background: "var(--bg-surface)", color: "var(--accent)" }}>
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-28 text-center relative overflow-hidden" style={{ background: "var(--bg-light)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #6B9080 0%, transparent 55%)" }} />
        <div className="relative max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-5xl md:text-6xl font-black leading-tight" style={{ color: "var(--text)" }}>
              Prêt à créer<br />
              <span style={{ color: "var(--accent)" }}>autrement ?</span>
            </h2>
            <p className="text-lg" style={{ color: "var(--text-muted)" }}>
              Rejoignez des créateurs et professionnels qui font plus en moins de temps.
            </p>
            <Link href="/register"
              className="inline-flex items-center gap-2 px-11 py-4 rounded-2xl font-black text-white text-base transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "var(--accent)", boxShadow: "0 16px 48px rgba(107,144,128,0.4)" }}>
              Créer mon compte — c&apos;est gratuit
              <ArrowRight size={18} />
            </Link>
            <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
              Aucune carte bancaire · Annulez quand vous voulez
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-10">
            <div className="col-span-2">
              <span className="font-black text-xl block mb-3" style={{ color: "var(--accent)" }}>Outio</span>
              <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "var(--text-muted)" }}>
                La plateforme IA tout-en-un pour créateurs et professionnels — partout dans le monde.
              </p>
              <div className="flex gap-2">
                {[MessageCircle, Code2, Briefcase, Mail].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Produit",    links: ["Plateforme", "Agents", "Modèles", "Tarifs"] },
              { title: "Ressources", links: ["Documentation", "API", "Blog", "Status"] },
              { title: "Légal",      links: ["Confidentialité", "CGU", "RGPD"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: "var(--text-subtle)" }}>
                  {col.title}
                </div>
                <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  {col.links.map((l) => (
                    <li key={l}><Link href="#" className="hover:text-[var(--accent)] transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-7 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
              © {new Date().getFullYear()} Outio · Fait avec ♥ pour l&apos;Afrique et le monde.
            </p>
            <div className="flex items-center gap-2">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
