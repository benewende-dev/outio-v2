"use client";

import Link from "next/link";
import {
  ArrowRight, Sparkles, Bot, ImageIcon, Video,
  Mic, Share2, Megaphone, Search, ChevronRight,
  Twitter, Github, Linkedin, Mail, Check,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";

/* ── Plans ─────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Free", price: "0€", credits: "500",
    features: ["500 crédits/mois", "Modèles budget", "Chat illimité*", "5 agents"],
    cta: "Commencer gratuitement", highlight: false,
  },
  {
    name: "Starter", price: "9€", credits: "3 000",
    features: ["3 000 crédits/mois", "Modèles mid-tier", "Tous les agents", "Galerie 5 Go"],
    cta: "Choisir Starter", highlight: false,
  },
  {
    name: "Pro", price: "29€", credits: "15 000",
    features: ["15 000 crédits/mois", "Modèles ≤ Opus 4.6", "Agents autonomes", "Galerie 50 Go", "Support prioritaire"],
    cta: "Choisir Pro", highlight: true,
  },
  {
    name: "Business", price: "89€", credits: "50 000",
    features: ["50 000 crédits/mois", "Tous les modèles", "Opus 4.7 + GPT-5", "API access", "Équipe jusqu'à 10"],
    cta: "Nous contacter", highlight: false,
  },
];

/* ── Bento features ─────────────────────────────────────── */
const BENTO = [
  {
    icon: Bot,
    tag: "Agents IA",
    title: "29 agents autonomes,\nchacun expert dans son domaine",
    desc: "De la rédaction au code, du SEO à la finance — chaque agent est entraîné pour son métier. Ils planifient, exécutent et livrent.",
    size: "large",
    gradient: "from-[#6B9080] to-[#A4C3B2]",
    items: ["Soshie — Social Media", "Nova — Marketing", "Iris — Deep Research", "Rex — Automation", "Devvy — Code"],
  },
  {
    icon: ImageIcon,
    tag: "Images",
    title: "De l'idée à l'image\nen quelques secondes",
    desc: "Flux, Midjourney v7, DALL-E, Ideogram — le meilleur de la génération d'image en un clic.",
    size: "small",
    gradient: "from-[#5a9e8a] to-[#7fc4ae]",
  },
  {
    icon: Video,
    tag: "Vidéo",
    title: "Créez des vidéos\nde qualité cinéma",
    desc: "Sora 2, Kling 3.0, Veo 3, Runway — transformez vos idées en vidéos époustouflantes.",
    size: "small",
    gradient: "from-[#4e8a78] to-[#6B9080]",
  },
  {
    icon: Mic,
    tag: "Audio & Musique",
    title: "Voix, narration et musique\ngénérées par l'IA",
    desc: "ElevenLabs v3, Suno v5.5, Udio — produisez des podcasts, jingles et voix-off professionnels.",
    size: "medium",
    gradient: "from-[#A4C3B2] to-[#CCE3DE]",
  },
  {
    icon: Share2,
    tag: "Social & Campagnes",
    title: "Gérez tous vos réseaux\ndepuis un seul endroit",
    desc: "Planification, création de contenu, analyse des performances — tout votre marketing en un tableau de bord.",
    size: "medium",
    gradient: "from-[#6B9080] to-[#5a7d6e]",
  },
  {
    icon: Search,
    tag: "Deep Research",
    title: "Recherche approfondie\npilotée par l'IA",
    desc: "Iris analyse, synthétise et produit des rapports complets sur n'importe quel sujet en quelques minutes.",
    size: "small",
    gradient: "from-[#7a9e90] to-[#A4C3B2]",
  },
];

/* ── Logos partenaires ──────────────────────────────────── */
const MODELS = [
  "Claude", "GPT-5", "Gemini", "DeepSeek", "Mistral",
  "Llama 4", "Grok", "Qwen", "Flux", "Sora",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Nav ──────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 glass border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight" style={{ color: "var(--accent)" }}>
            Outio
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            <Link href="#features" className="hover:text-[var(--accent)] transition-colors">Fonctionnalités</Link>
            <Link href="#models"   className="hover:text-[var(--accent)] transition-colors">Modèles</Link>
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
              className="text-sm px-4 py-2 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center gap-1.5"
              style={{ background: "var(--accent)" }}>
              Commencer <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Orb décoratif */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #6B9080 0%, transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
            style={{ background: "var(--bg-surface)", color: "var(--accent)", borderColor: "var(--border-strong)" }}>
            <Sparkles size={13} />
            Plateforme IA tout-en-un · 50+ modèles
            <ChevronRight size={13} />
          </div>

          <h1 className="text-5xl md:text-[72px] font-extrabold tracking-tight mb-6 leading-[1.08]"
            style={{ color: "var(--text)" }}>
            Créez plus.<br />
            <span style={{
              background: "linear-gradient(135deg, #6B9080 0%, #A4C3B2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Pensez moins.
            </span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Outio réunit les meilleurs modèles d&apos;IA du monde — chat, agents autonomes,
            images, vidéos, audio — dans une seule plateforme conçue pour vous faire gagner du temps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "var(--accent)", boxShadow: "0 8px 24px rgba(107,144,128,0.35)" }}>
              Démarrer gratuitement — 500 crédits offerts
              <ArrowRight size={18} />
            </Link>
            <Link href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:bg-[var(--bg-surface)]"
              style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
              Voir comment ça marche
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[
              { value: "29+",  label: "Agents IA" },
              { value: "50+",  label: "Modèles" },
              { value: "4",    label: "Surfaces" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-extrabold" style={{ color: "var(--accent)" }}>{s.value}</div>
                <div className="text-xs mt-1 font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modèles ticker ───────────────────────────────── */}
      <section id="models" className="py-10 border-y overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--bg-light)" }}>
        <p className="text-center text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-subtle)" }}>
          Compatible avec les meilleurs modèles du monde
        </p>
        <div className="flex gap-8 items-center justify-center flex-wrap px-6">
          {MODELS.map((m) => (
            <span key={m} className="text-sm font-semibold px-4 py-1.5 rounded-full border"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg-card)" }}>
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* ── Bento Features ───────────────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4 leading-tight" style={{ color: "var(--text)" }}>
            Une plateforme.<br />
            <span style={{ color: "var(--accent)" }}>Des possibilités infinies.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Chaque outil est conçu pour vous faire gagner du temps, amplifier votre créativité et automatiser vos tâches répétitives.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Large card — Agents */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden relative min-h-[320px] flex flex-col justify-between p-8 border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="absolute inset-0 opacity-5"
              style={{ background: "linear-gradient(135deg, #6B9080 0%, #A4C3B2 100%)" }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 text-white"
                style={{ background: "var(--accent)" }}>
                <Bot size={12} /> Agents IA
              </div>
              <h3 className="text-2xl font-bold mb-3 leading-tight" style={{ color: "var(--text)" }}>
                29 agents autonomes,<br />chacun expert dans son domaine
              </h3>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                De la rédaction au code, du SEO à la finance — chaque agent planifie, exécute et livre des résultats concrets.
              </p>
            </div>
            <div className="relative flex flex-wrap gap-2">
              {["Soshie · Social", "Nova · Marketing", "Iris · Recherche", "Rex · Automation", "Devvy · Code", "Penelope · Rédaction"].map((a) => (
                <span key={a} className="text-xs px-3 py-1.5 rounded-full font-medium border"
                  style={{ background: "var(--bg-surface)", color: "var(--accent)", borderColor: "var(--border-strong)" }}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Small card — Images */}
          <div className="rounded-2xl overflow-hidden relative min-h-[320px] flex flex-col justify-between p-7 border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--bg-surface)" }}>
                <ImageIcon size={22} style={{ color: "var(--accent)" }} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>Images</div>
              <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: "var(--text)" }}>
                De l&apos;idée à l&apos;image en quelques secondes
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Flux, Midjourney v7, DALL-E, Ideogram — les meilleurs générateurs d&apos;images en un clic.
              </p>
            </div>
            <div className="mt-6 text-xs font-semibold" style={{ color: "var(--accent)" }}>
              12 modèles disponibles →
            </div>
          </div>

          {/* Small card — Vidéo */}
          <div className="rounded-2xl overflow-hidden relative min-h-[240px] flex flex-col justify-between p-7 border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--bg-surface)" }}>
                <Video size={22} style={{ color: "var(--accent)" }} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>Vidéo</div>
              <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: "var(--text)" }}>
                Vidéos qualité cinéma
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Sora 2, Kling 3.0, Veo 3, Runway Gen-4.5 — la puissance du cinéma, à portée de prompt.
              </p>
            </div>
          </div>

          {/* Medium card — Audio */}
          <div className="rounded-2xl overflow-hidden relative min-h-[240px] flex flex-col justify-between p-7 border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--bg-surface)" }}>
                <Mic size={22} style={{ color: "var(--accent)" }} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>Audio & Musique</div>
              <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: "var(--text)" }}>
                Voix, podcasts et musique générés par l&apos;IA
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                ElevenLabs v3, Suno v5.5, Udio — produisez des contenus audio professionnels en minutes.
              </p>
            </div>
          </div>

          {/* Large card — Social */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden relative min-h-[240px] flex flex-col justify-between p-7 border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="absolute inset-0 opacity-5"
              style={{ background: "linear-gradient(135deg, #A4C3B2 0%, #6B9080 100%)" }} />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--bg-surface)" }}>
                <Megaphone size={22} style={{ color: "var(--accent)" }} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>Social & Campagnes</div>
              <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: "var(--text)" }}>
                Gérez tous vos réseaux sociaux et campagnes marketing depuis un seul endroit
              </h3>
              <p className="text-sm max-w-lg" style={{ color: "var(--text-muted)" }}>
                Planification, création de contenu IA, analyse des performances, brand DNA et moodboards — tout votre marketing en un tableau de bord unifié.
              </p>
            </div>
            <div className="relative mt-6 flex gap-6 text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
              {["Instagram", "LinkedIn", "TikTok", "Twitter/X", "Facebook"].map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section id="pricing" className="py-24" style={{ background: "var(--bg-light)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
              Tarifs
            </span>
            <h2 className="text-4xl font-extrabold mt-4 mb-4" style={{ color: "var(--text)" }}>
              Simple, transparent, équitable
            </h2>
            <p className="text-lg" style={{ color: "var(--text-muted)" }}>
              Des crédits universels pour tout — texte, images, vidéos, audio.<br />
              <span className="font-semibold" style={{ color: "var(--accent)" }}>1 crédit = 1 action. Pas de surprise.</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((p) => (
              <div key={p.name}
                className="rounded-2xl p-6 flex flex-col border transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: p.highlight ? "var(--accent)" : "var(--bg-card)",
                  borderColor: p.highlight ? "transparent" : "var(--border)",
                  color: p.highlight ? "#fff" : "var(--text)",
                }}>
                {p.highlight && (
                  <div className="text-xs font-bold uppercase tracking-widest mb-4 opacity-80">
                    ✦ Populaire
                  </div>
                )}
                <div className="text-base font-bold mb-2" style={{ opacity: p.highlight ? 0.9 : 1 }}>{p.name}</div>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold">{p.price}</span>
                  <span className="text-sm ml-1" style={{ opacity: 0.6 }}>/mois</span>
                </div>
                <div className="text-sm mb-6 font-medium" style={{ opacity: 0.7 }}>
                  {p.credits} crédits/mois
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={14} style={{ opacity: 0.8, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register"
                  className="text-center text-sm font-bold px-4 py-3 rounded-xl transition-all hover:opacity-90"
                  style={p.highlight
                    ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
                    : { background: "var(--bg-surface)", color: "var(--accent)" }}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────── */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, #6B9080 0%, transparent 70%)" }} />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "var(--text)" }}>
            Prêt à créer<br />
            <span style={{ color: "var(--accent)" }}>sans limites ?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--text-muted)" }}>
            Rejoignez Outio gratuitement. 500 crédits offerts dès l&apos;inscription. Aucune carte bancaire requise.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-lg text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--accent)", boxShadow: "0 12px 32px rgba(107,144,128,0.4)" }}>
            Créer mon compte gratuitement
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--bg-light)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

            {/* Brand */}
            <div className="col-span-2">
              <span className="font-extrabold text-2xl block mb-3" style={{ color: "var(--accent)" }}>Outio</span>
              <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
                La plateforme IA tout-en-un pour créateurs, marketeurs et professionnels en Afrique et dans le monde.
              </p>
              <div className="flex gap-3">
                {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all hover:bg-[var(--bg-surface)] hover:border-[var(--border-strong)]"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Produit */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-subtle)" }}>Produit</div>
              <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
                {["Fonctionnalités", "Agents IA", "Tarifs", "Changelog", "Roadmap"].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-[var(--accent)] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>

            {/* Ressources */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-subtle)" }}>Ressources</div>
              <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
                {["Documentation", "Blog", "Guides", "API", "Status"].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-[var(--accent)] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-subtle)" }}>Entreprise</div>
              <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
                {["À propos", "Contact", "Partenaires", "Confidentialité", "CGU"].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-[var(--accent)] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
              © {new Date().getFullYear()} Outio. Tous droits réservés. Fait avec ♥ pour l&apos;Afrique et le monde.
            </p>
            <div className="flex items-center gap-4">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
