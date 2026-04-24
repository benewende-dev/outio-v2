"use client";

import Link from "next/link";
import {
  ArrowRight, Sparkles, Bot, ImageIcon, Video, Mic,
  Share2, Megaphone, BookOpen, GalleryHorizontal,
  Search, MessageSquare, Check,
  Compass, Zap, BarChart3, Mail, Code2, Briefcase,
  MessageCircle, Pen, TrendingUp, FileText,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";

/* ── Data ─────────────────────────────────────────────── */

const TOOLS = [
  { icon: MessageSquare, label: "Chat IA",         desc: "Tous les grands modèles, en streaming." },
  { icon: Bot,           label: "Agents",           desc: "Des agents qui travaillent à votre place." },
  { icon: ImageIcon,     label: "Images",           desc: "De l'esquisse à l'œuvre en secondes." },
  { icon: Video,         label: "Vidéos",           desc: "Narration et réalisme cinématographique." },
  { icon: Mic,           label: "Audio",            desc: "Voix, musique, transcription — tout." },
  { icon: Share2,        label: "Social Media",     desc: "Créez, planifiez, publiez partout." },
  { icon: Megaphone,     label: "Campagnes",        desc: "Brand DNA, moodboards, photoshoots." },
  { icon: GalleryHorizontal, label: "Galerie",      desc: "Toutes vos créations, un seul endroit." },
  { icon: BookOpen,      label: "Prompts",          desc: "Une bibliothèque de prompts pro." },
  { icon: Search,        label: "Deep Research",    desc: "Synthèse web, rapports profonds." },
  { icon: Compass,       label: "Explorer",         desc: "La communauté Outio vous attend." },
  { icon: BarChart3,     label: "Analytics",        desc: "Vos créations, vos données, vos stats." },
];

const AGENT_CATEGORIES = [
  {
    label: "Création & Contenu",
    color: "#6B9080",
    agents: [
      { name: "Penelope", role: "Rédaction & Copywriting" },
      { name: "Dante",    role: "Scénarios & Storytelling" },
      { name: "Echo",     role: "Podcast & Scripts" },
      { name: "Pixel",    role: "Design & UI/UX" },
    ],
  },
  {
    label: "Marketing & Growth",
    color: "#5a9e8a",
    agents: [
      { name: "Nova",   role: "Stratégie Marketing" },
      { name: "Soshie", role: "Social Media" },
      { name: "Emmie",  role: "Email Marketing" },
      { name: "Max",    role: "Publicité Payante" },
      { name: "Adria",  role: "Campagnes Ads" },
      { name: "Scout",  role: "SEO & Référencement" },
    ],
  },
  {
    label: "Business & Finance",
    color: "#4e8a78",
    agents: [
      { name: "Buddy",    role: "Sales & Prospection" },
      { name: "Finn",     role: "Finance & Budget" },
      { name: "Atlas",    role: "Opérations & Process" },
      { name: "Theo",     role: "Juridique & RGPD" },
      { name: "Luna",     role: "RH & Recrutement" },
      { name: "Guardian", role: "Conformité & Audit" },
    ],
  },
  {
    label: "Tech & Automatisation",
    color: "#7a9e90",
    agents: [
      { name: "Devvy",  role: "Développement & Code" },
      { name: "Rex",    role: "Automatisation & APIs" },
      { name: "Dexter", role: "Data & Analyse" },
      { name: "Iris",   role: "Deep Research" },
    ],
  },
  {
    label: "Client & Support",
    color: "#A4C3B2",
    agents: [
      { name: "Cassie", role: "Support Client 24/7" },
      { name: "Cleo",   role: "Service Après-Vente" },
      { name: "Zara",   role: "E-Commerce" },
      { name: "Marc",   role: "Traduction 50+ langues" },
      { name: "Aria",   role: "Assistant Personnel" },
      { name: "Hugo",   role: "Relations Presse" },
      { name: "Sofia",  role: "Branding & Identité" },
      { name: "Lena",   role: "Formation & Pédagogie" },
      { name: "Vibe",   role: "Communauté & Discord" },
    ],
  },
];

const PLANS = [
  {
    name: "Free",
    price: "0€",
    sub: "Pour commencer",
    features: ["500 crédits par mois", "Modèles essentiels", "Accès aux agents de base", "Galerie personnelle"],
    cta: "Commencer gratuitement",
    highlight: false,
  },
  {
    name: "Starter",
    price: "9€",
    sub: "Pour aller plus loin",
    features: ["3 000 crédits par mois", "Modèles mid-tier", "Tous les agents", "Galerie 10 Go", "Support email"],
    cta: "Choisir Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: "29€",
    sub: "Pour les créateurs sérieux",
    features: ["15 000 crédits par mois", "Modèles premium", "Agents autonomes", "Galerie 50 Go", "Deep Research", "Support prioritaire"],
    cta: "Choisir Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "89€",
    sub: "Pour les équipes",
    features: ["50 000 crédits par mois", "Tous les modèles", "API Access", "Équipe jusqu'à 10", "Galerie illimitée", "Support dédié"],
    cta: "Nous contacter",
    highlight: false,
  },
];

/* ── Page ─────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight" style={{ color: "var(--accent)" }}>
            Outio
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            <Link href="#platform" className="hover:text-[var(--accent)] transition-colors">Plateforme</Link>
            <Link href="#agents"   className="hover:text-[var(--accent)] transition-colors">Agents</Link>
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-10 blur-3xl pointer-events-none rounded-full"
          style={{ background: "radial-gradient(ellipse, #6B9080 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-7 leading-[1.05]"
            style={{ color: "var(--text)" }}>
            L&apos;IA qui travaille<br />
            <span style={{
              background: "linear-gradient(135deg, #6B9080 0%, #A4C3B2 60%, #6B9080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              pendant que vous créez.
            </span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Chat, agents autonomes, images, vidéos, audio, social media — réunis dans une seule plateforme, conçue pour aller vite.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-white text-base transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "var(--accent)", boxShadow: "0 12px 40px rgba(107,144,128,0.35)" }}>
              Créer un compte gratuit
              <ArrowRight size={18} />
            </Link>
            <Link href="#platform"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:bg-[var(--bg-surface)]"
              style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
              Découvrir la plateforme
            </Link>
          </div>
        </div>
      </section>

      {/* Modèles */}
      <section className="py-12 border-y overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--bg-light)" }}>
        <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "var(--text-subtle)" }}>
          Propulsé par les meilleurs modèles du monde
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 px-6 mb-3">
          {["Claude Opus 4.7", "GPT-5.5", "Gemini Ultra", "DeepSeek V4", "Mistral Large", "Llama 4", "Grok 4", "Qwen 3.6"].map((m) => (
            <span key={m} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg-card)" }}>
              {m}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 px-6">
          {["Flux 2 Pro", "Midjourney v7", "DALL-E 4", "Sora 2", "Kling 3.0", "Veo 3", "ElevenLabs v3", "Suno v5.5"].map((m) => (
            <span key={m} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: "var(--accent)", borderColor: "var(--border-strong)", background: "var(--bg-surface)" }}>
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* Plateforme */}
      <section id="platform" className="max-w-6xl mx-auto px-6 py-28">
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            La plateforme
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight" style={{ color: "var(--text)" }}>
            Tout ce qu&apos;il vous faut.<br />Un seul endroit.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Ce que vous faisiez avec dix abonnements différents, Outio le fait en un. Du chat aux campagnes marketing, de la recherche à la création vidéo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {TOOLS.map((t) => (
            <Link key={t.label} href="/register"
              className="group rounded-2xl p-5 border flex flex-col gap-4 transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-md cursor-pointer"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--bg-surface)" }}>
                <t.icon size={17} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: "var(--text)" }}>{t.label}</div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Capacités */}
      <section className="py-24" style={{ background: "var(--bg-light)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-5">

            <div className="rounded-3xl p-8 border md:col-span-2" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: "var(--bg-surface)" }}>
                    <MessageSquare size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="font-black text-2xl mb-3" style={{ color: "var(--text)" }}>
                    Chat multi-modèles
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                    Chattez avec les meilleurs modèles du monde — Claude, GPT, Gemini, DeepSeek et bien d&apos;autres. Changez de modèle en pleine conversation, comparez les réponses, gardez tout votre historique.
                  </p>
                  <div className="space-y-2">
                    {["Streaming temps réel", "Contexte long, mémoire persistante", "Recherche web intégrée", "Fichiers, images, PDF"].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <Check size={13} style={{ color: "var(--accent)" }} /> {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Claude Opus 4.7", "GPT-5.5", "Gemini Ultra", "DeepSeek V4", "Mistral Large", "Llama 4"].map((m) => (
                    <div key={m} className="text-xs px-3 py-2.5 rounded-xl text-center font-semibold border"
                      style={{ background: "var(--bg-surface)", color: "var(--accent)", borderColor: "var(--border)" }}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-8 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--bg-surface)" }}>
                <ImageIcon size={20} style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="font-black text-xl mb-3" style={{ color: "var(--text)" }}>Images & Vidéos</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                De Flux pour la vitesse à Midjourney pour l&apos;esthétique, de Sora pour la narration à Veo pour le réalisme. Le meilleur de la génération visuelle, en un seul endroit.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Flux 2 Pro", "Midjourney v7", "DALL-E 4", "Sora 2", "Kling 3.0", "Veo 3", "Runway Gen-4"].map((m) => (
                  <span key={m} className="text-xs px-2.5 py-1.5 rounded-lg font-medium"
                    style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-8 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--bg-surface)" }}>
                <Mic size={20} style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="font-black text-xl mb-3" style={{ color: "var(--text)" }}>Audio</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                Voix-off professionnelles, transcription, musique générée par IA, podcasts — une suite audio complète pour chaque format de contenu.
              </p>
              <div className="space-y-2">
                {["ElevenLabs v3 — voix ultra-réalistes", "Suno v5.5 — musique complète", "Whisper v3 — transcription", "Gemini TTS — multilingue"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Check size={12} style={{ color: "var(--accent)" }} /> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-8 border md:col-span-2" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: "var(--bg-surface)" }}>
                    <Megaphone size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="font-black text-2xl mb-3" style={{ color: "var(--text)" }}>Social & Campagnes</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                    Planifiez, créez et publiez sur tous vos réseaux. Définissez votre Brand DNA une seule fois — Outio génère du contenu cohérent avec votre identité sur chaque plateforme.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Brand DNA", "Moodboards", "Photoshoots IA", "Planification", "Multi-réseaux", "Analytics"].map((t) => (
                    <div key={t} className="rounded-xl p-3 text-xs font-semibold text-center border"
                      style={{ background: "var(--bg-surface)", color: "var(--text-muted)", borderColor: "var(--border)" }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="max-w-6xl mx-auto px-6 py-28">
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Agents IA
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight" style={{ color: "var(--text)" }}>
            Des experts à votre service.<br />
            <span style={{ color: "var(--accent)" }}>24h/24.</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Chaque agent est entraîné pour son domaine. Ils planifient, exécutent et livrent des résultats — de manière autonome ou en collaboration avec vous.
          </p>
        </div>

        <div className="space-y-4">
          {AGENT_CATEGORIES.map((cat) => (
            <div key={cat.label} className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <h3 className="font-bold text-sm" style={{ color: "var(--text)" }}>{cat.label}</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {cat.agents.map((agent) => (
                  <div key={agent.name}
                    className="rounded-2xl p-4 border flex flex-col gap-2 hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white"
                      style={{ background: cat.color }}>
                      {agent.name[0]}
                    </div>
                    <div className="font-bold text-sm" style={{ color: "var(--text)" }}>{agent.name}</div>
                    <div className="text-[11px] leading-tight" style={{ color: "var(--text-muted)" }}>{agent.role}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}>
            Accéder aux agents <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-24" style={{ background: "var(--bg-light)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              Pour vous
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight" style={{ color: "var(--text)" }}>
              Conçu pour<br />
              <span style={{ color: "var(--accent)" }}>votre réalité.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Que vous soyez créateur solo ou à la tête d&apos;une équipe, Outio s&apos;adapte à votre façon de travailler.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Pen,        title: "Créateurs",     desc: "Articles, scripts, visuels, musique — en quelques secondes. Publiez partout d'un clic." },
              { icon: TrendingUp, title: "Marketeurs",    desc: "Campagnes entières, contenu de marque, analyses de performance — avec des agents dédiés." },
              { icon: Code2,      title: "Développeurs",  desc: "Codez plus vite, automatisez vos workflows, accédez à l'API Outio pour vos propres apps." },
              { icon: Briefcase,  title: "Entrepreneurs", desc: "Stratégie, finance, juridique, RH — des agents pour piloter chaque aspect de votre activité." },
            ].map((a) => (
              <div key={a.title} className="rounded-3xl p-7 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "var(--bg-surface)" }}>
                  <a.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="font-black text-base mb-3" style={{ color: "var(--text)" }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-28">
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Tarifs
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight" style={{ color: "var(--text)" }}>
            Commencez gratuitement.<br />
            <span style={{ color: "var(--accent)" }}>Grandissez à votre rythme.</span>
          </h2>
          <p className="text-base" style={{ color: "var(--text-muted)" }}>
            Aucune carte bancaire requise. Annulez à tout moment.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {PLANS.map((p) => (
            <div key={p.name}
              className="rounded-3xl p-7 flex flex-col border transition-all hover:-translate-y-0.5"
              style={{
                background: p.highlight ? "var(--accent)" : "var(--bg-card)",
                borderColor: p.highlight ? "transparent" : "var(--border)",
              }}>
              {p.highlight && (
                <div className="text-[11px] font-black uppercase tracking-widest mb-4 text-white opacity-60">
                  Le plus populaire
                </div>
              )}
              <div className="text-sm font-bold mb-1" style={{ color: p.highlight ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>
                {p.sub}
              </div>
              <div className="text-base font-black mb-3" style={{ color: p.highlight ? "#fff" : "var(--text)" }}>
                {p.name}
              </div>
              <div className="mb-7">
                <span className="text-4xl font-black" style={{ color: p.highlight ? "#fff" : "var(--accent)" }}>
                  {p.price}
                </span>
                <span className="text-sm ml-1" style={{ color: p.highlight ? "rgba(255,255,255,0.5)" : "var(--text-muted)" }}>
                  /mois
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm"
                    style={{ color: p.highlight ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}>
                    <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: p.highlight ? "rgba(255,255,255,0.6)" : "var(--accent)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register"
                className="text-center text-sm font-bold px-4 py-3.5 rounded-2xl transition-all hover:opacity-90"
                style={p.highlight
                  ? { background: "rgba(255,255,255,0.15)", color: "#fff" }
                  : { background: "var(--bg-surface)", color: "var(--accent)" }}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center relative overflow-hidden" style={{ background: "var(--bg-light)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-8"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #6B9080 0%, transparent 55%)" }} />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ color: "var(--text)" }}>
            Prêt à créer<br />
            <span style={{ color: "var(--accent)" }}>différemment ?</span>
          </h2>
          <p className="text-xl mb-12" style={{ color: "var(--text-muted)" }}>
            Rejoignez des créateurs et professionnels qui font plus, en moins de temps.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-12 py-5 rounded-2xl font-black text-lg text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--accent)", boxShadow: "0 16px 48px rgba(107,144,128,0.4)" }}>
            Créer mon compte — C&apos;est gratuit
            <ArrowRight size={20} />
          </Link>
          <p className="mt-5 text-sm" style={{ color: "var(--text-subtle)" }}>
            Aucun engagement · Annulez quand vous voulez
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
            <div className="col-span-2">
              <span className="font-black text-xl block mb-3" style={{ color: "var(--accent)" }}>Outio</span>
              <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
                La plateforme IA tout-en-un pour créateurs, marketeurs et professionnels — en Afrique et dans le monde.
              </p>
              <div className="flex gap-2.5">
                {[MessageCircle, Code2, Briefcase, Mail].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Produit",    links: ["Plateforme", "Agents", "Modèles", "Tarifs", "Changelog"] },
              { title: "Ressources", links: ["Documentation", "Blog", "API", "Status"] },
              { title: "Entreprise", links: ["À propos", "Carrières", "Contact", "Presse"] },
              { title: "Légal",      links: ["Confidentialité", "CGU", "RGPD"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "var(--text-subtle)" }}>
                  {col.title}
                </div>
                <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link href="#" className="hover:text-[var(--accent)] transition-colors">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
              © {new Date().getFullYear()} Outio. Tous droits réservés.
            </p>
            <div className="flex items-center gap-3">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
