"use client";

import Link from "next/link";
import {
  ArrowRight, Sparkles, Bot, ImageIcon, Video, Mic,
  Share2, Megaphone, BookOpen, GalleryHorizontal,
  Search, MessageSquare, Check, ChevronRight,
  Compass, CreditCard, Zap, Globe, ShieldCheck,
  BarChart3, Mail, Code2, Briefcase, MessageCircle,
  Pen, Megaphone as Speaker, Headphones, Palette,
  TrendingUp, Users, FileText, Radio,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const TOOLS = [
  { icon: MessageSquare, label: "Chat IA",         desc: "30+ modèles, streaming temps réel",      tag: "Core" },
  { icon: Bot,           label: "Agents",           desc: "29 agents autonomes spécialisés",        tag: "Puissant" },
  { icon: ImageIcon,     label: "Images",           desc: "Flux, Midjourney, DALL-E, Ideogram",     tag: "Créatif" },
  { icon: Video,         label: "Vidéos",           desc: "Sora 2, Kling 3.0, Veo 3, Runway",      tag: "Cinéma" },
  { icon: Mic,           label: "Audio",            desc: "TTS, STT, musique IA, podcast",          tag: "Son" },
  { icon: Share2,        label: "Social Media",     desc: "5 plateformes, planification & auto",    tag: "Growth" },
  { icon: Megaphone,     label: "Campagnes",        desc: "Brand DNA, moodboards, photoshoots",     tag: "Marketing" },
  { icon: GalleryHorizontal, label: "Galerie",      desc: "Toutes vos créations en un endroit",    tag: "Stockage" },
  { icon: BookOpen,      label: "Prompts",          desc: "Bibliothèque de 40+ prompts pro",        tag: "Ressources" },
  { icon: Search,        label: "Deep Research",    desc: "Synthèse web, rapports en profondeur",   tag: "Analyse" },
  { icon: Compass,       label: "Explorer",         desc: "Découvrez la communauté Outio",          tag: "Communauté" },
  { icon: BarChart3,     label: "Analytics",        desc: "Suivi crédits, générations, stats",      tag: "Données" },
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
      { name: "Nova",    role: "Stratégie Marketing" },
      { name: "Soshie",  role: "Social Media" },
      { name: "Emmie",   role: "Email Marketing" },
      { name: "Max",     role: "Publicité Payante" },
      { name: "Adria",   role: "Campagnes Ads" },
      { name: "Scout",   role: "SEO & Référencement" },
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

const MODELS_TEXT = ["Claude Opus 4.7", "GPT-5.5", "Gemini Ultra", "DeepSeek V4", "Mistral Large", "Llama 4", "Grok 4", "Qwen 3.6", "Kimi K2"];
const MODELS_MEDIA = ["Flux 2 Pro", "Midjourney v7", "DALL-E 4", "Sora 2", "Kling 3.0", "Veo 3", "Runway Gen-4.5", "ElevenLabs v3", "Suno v5.5"];

const PLANS = [
  {
    name: "Free", price: "0€", credits: "500",
    features: ["500 crédits/mois", "Modèles budget", "5 agents", "Galerie 1 Go"],
    cta: "Commencer gratuitement", highlight: false,
  },
  {
    name: "Starter", price: "9€", credits: "3 000",
    features: ["3 000 crédits/mois", "Modèles mid-tier", "Tous les agents", "Galerie 10 Go", "Support email"],
    cta: "Choisir Starter", highlight: false,
  },
  {
    name: "Pro", price: "29€", credits: "15 000",
    features: ["15 000 crédits/mois", "Modèles ≤ Opus 4.6", "Agents autonomes", "Galerie 50 Go", "Deep Research", "Support prioritaire"],
    cta: "Choisir Pro", highlight: true,
  },
  {
    name: "Business", price: "89€", credits: "50 000",
    features: ["50 000 crédits/mois", "Tous modèles + Opus 4.7", "API Access", "Équipe 10 membres", "Galerie illimitée", "Support dédié"],
    cta: "Nous contacter", highlight: false,
  },
];

const AUDIENCES = [
  { icon: Pen,        title: "Créateurs de contenu", desc: "Générez articles, scripts, visuels et musique en quelques secondes. Publiez sur tous vos réseaux d'un clic." },
  { icon: TrendingUp, title: "Marketeurs & Agences", desc: "Planifiez des campagnes entières, créez du contenu de marque et analysez vos performances avec des agents IA." },
  { icon: Code2,      title: "Développeurs",          desc: "Codez plus vite avec Devvy, automatisez vos workflows avec Rex, et accédez à l'API Outio pour vos apps." },
  { icon: Briefcase,  title: "Entrepreneurs",         desc: "De la stratégie à l'exécution — agents business, finance, juridique et RH pour piloter votre entreprise." },
];

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Nav ────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 glass border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight" style={{ color: "var(--accent)" }}>
            Outio
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            <Link href="#tools"   className="hover:text-[var(--accent)] transition-colors">Outils</Link>
            <Link href="#agents"  className="hover:text-[var(--accent)] transition-colors">Agents</Link>
            <Link href="#models"  className="hover:text-[var(--accent)] transition-colors">Modèles</Link>
            <Link href="#pricing" className="hover:text-[var(--accent)] transition-colors">Tarifs</Link>
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
              Essayer gratuitement <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-15 blur-3xl pointer-events-none rounded-full"
          style={{ background: "radial-gradient(ellipse, #6B9080 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 border"
            style={{ background: "var(--bg-surface)", color: "var(--accent)", borderColor: "var(--border-strong)" }}>
            <Sparkles size={13} />
            12 outils · 29 agents · 50+ modèles
            <ChevronRight size={13} />
          </div>
          <h1 className="text-5xl md:text-[76px] font-black tracking-tight mb-6 leading-[1.05]"
            style={{ color: "var(--text)" }}>
            L&apos;IA qui travaille<br />
            <span style={{
              background: "linear-gradient(135deg, #6B9080 0%, #A4C3B2 50%, #6B9080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              pendant que vous créez.
            </span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Outio réunit les meilleurs modèles d&apos;IA du monde dans une seule plateforme — chat, agents autonomes, images, vidéos, audio, social media et bien plus.
            <strong style={{ color: "var(--text)" }}> Tout ce qu&apos;il vous faut. Un seul outil.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-white text-base transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "var(--accent)", boxShadow: "0 12px 32px rgba(107,144,128,0.4)" }}>
              Créer mon compte — 500 crédits offerts
              <ArrowRight size={18} />
            </Link>
            <Link href="#tools"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:bg-[var(--bg-surface)]"
              style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
              Découvrir la plateforme
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: "12",   label: "Outils intégrés" },
              { value: "29",   label: "Agents autonomes" },
              { value: "50+",  label: "Modèles d'IA" },
              { value: "100%", label: "Sous votre contrôle" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 rounded-2xl border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="text-3xl font-black" style={{ color: "var(--accent)" }}>{s.value}</div>
                <div className="text-xs mt-1 font-medium" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modèles IA ─────────────────────────────────────── */}
      <section id="models" className="py-12 border-y overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--bg-light)" }}>
        <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "var(--text-subtle)" }}>
          Propulsé par les meilleurs modèles du monde
        </p>
        <div className="flex flex-wrap justify-center gap-3 px-6 mb-4">
          {MODELS_TEXT.map((m) => (
            <span key={m} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg-card)" }}>
              {m}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 px-6">
          {MODELS_MEDIA.map((m) => (
            <span key={m} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: "var(--accent)", borderColor: "var(--border-strong)", background: "var(--bg-surface)" }}>
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* ── 12 Outils ──────────────────────────────────────── */}
      <section id="tools" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5"
            style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
            La plateforme
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight" style={{ color: "var(--text)" }}>
            12 outils puissants.<br />
            <span style={{ color: "var(--accent)" }}>Une seule plateforme.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Du chat à la vidéo, de la recherche au social media — chaque outil est conçu pour vous faire gagner des heures.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {TOOLS.map((t, i) => (
            <Link key={t.label} href="/register"
              className="group rounded-2xl p-5 border flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--bg-surface)" }}>
                  <t.icon size={18} style={{ color: "var(--accent)" }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                  {t.tag}
                </span>
              </div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: "var(--text)" }}>{t.label}</div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{t.desc}</div>
              </div>
              <div className="mt-auto text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--accent)" }}>
                Explorer <ArrowRight size={11} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section visuelle — Capacités clés ──────────────── */}
      <section className="py-24" style={{ background: "var(--bg-light)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--text)" }}>
              Tout, vraiment <span style={{ color: "var(--accent)" }}>tout.</span>
            </h2>
            <p className="text-lg" style={{ color: "var(--text-muted)" }}>
              Ce que vous faisiez avec 10 abonnements différents, Outio le fait en un.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Chat */}
            <div className="rounded-3xl p-8 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--bg-surface)" }}>
                  <MessageSquare size={22} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="font-black text-lg" style={{ color: "var(--text)" }}>Chat multi-modèles</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Streaming · Historique · Mémoire</div>
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Chattez avec Claude Opus 4.7, GPT-5, Gemini Ultra, DeepSeek V4 et 25+ autres modèles. Changez de modèle en pleine conversation. Comparez les réponses.
              </p>
              <div className="space-y-2">
                {["Streaming temps réel", "Historique illimité", "Contexte 1M+ tokens", "Recherche web intégrée"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    <Check size={13} style={{ color: "var(--accent)" }} /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Images + Vidéos */}
            <div className="rounded-3xl p-8 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--bg-surface)" }}>
                  <ImageIcon size={22} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="font-black text-lg" style={{ color: "var(--text)" }}>Images & Vidéos</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>12 modèles images · 12 modèles vidéo</div>
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                De Flux Schnell pour la vitesse à Midjourney v7 pour l&apos;esthétique, de Sora 2 pour la narration à Veo 3 pour le réalisme — le meilleur de la génération visuelle.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["Flux 2 Pro", "Midjourney v7", "Sora 2", "Kling 3.0", "DALL-E 4", "Veo 3"].map((m) => (
                  <div key={m} className="text-xs px-3 py-2 rounded-xl text-center font-semibold"
                    style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Audio */}
            <div className="rounded-3xl p-8 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--bg-surface)" }}>
                  <Mic size={22} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="font-black text-lg" style={{ color: "var(--text)" }}>Audio complet</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Voix · Transcription · Musique</div>
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Créez des voix-off professionnelles, transcrivez des heures d&apos;audio, composez des jingles et des musiques complètes avec l&apos;IA.
              </p>
              <div className="space-y-2">
                {["ElevenLabs v3 — 70+ langues", "Suno v5.5 — Musique complète", "Whisper v3 — Transcription", "Gemini 3.1 Flash TTS"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    <Check size={13} style={{ color: "var(--accent)" }} /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Social & Campagnes */}
            <div className="rounded-3xl p-8 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--bg-surface)" }}>
                  <Megaphone size={22} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="font-black text-lg" style={{ color: "var(--text)" }}>Social & Campagnes</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>5 réseaux · Brand DNA · Moodboards</div>
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Planifiez, créez et publiez sur Instagram, LinkedIn, TikTok, Twitter et Facebook. Définissez votre Brand DNA et laissez l&apos;IA créer du contenu cohérent.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Brand DNA", "Moodboards", "Photoshoots IA", "Planification", "Photodumps", "Analytics"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full font-medium border"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-surface)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 29 Agents ──────────────────────────────────────── */}
      <section id="agents" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5"
            style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
            Agents IA
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight" style={{ color: "var(--text)" }}>
            29 experts IA.<br />
            <span style={{ color: "var(--accent)" }}>À votre service 24/7.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Chaque agent est entraîné pour son domaine. Ils planifient, exécutent et livrent des résultats — de manière autonome ou en collaboration avec vous.
          </p>
        </div>

        <div className="space-y-6">
          {AGENT_CATEGORIES.map((cat) => (
            <div key={cat.label} className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: "var(--text)" }}>
                  {cat.label}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold ml-auto"
                  style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                  {cat.agents.length} agents
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {cat.agents.map((agent) => (
                  <div key={agent.name}
                    className="rounded-2xl p-4 border flex flex-col gap-1.5 hover:border-[var(--border-strong)] transition-all cursor-pointer"
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

        <div className="mt-10 text-center">
          <Link href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}>
            Accéder à tous les agents <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Pour qui ? ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--bg-light)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--text)" }}>
              Conçu pour <span style={{ color: "var(--accent)" }}>vous.</span>
            </h2>
            <p className="text-lg" style={{ color: "var(--text-muted)" }}>
              Que vous soyez créateur, marketeur, développeur ou entrepreneur — Outio s&apos;adapte à votre réalité.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="rounded-3xl p-7 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "var(--bg-surface)" }}>
                  <a.icon size={22} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="font-black text-base mb-3" style={{ color: "var(--text)" }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Crédits explication ────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
          Système de crédits
        </span>
        <h2 className="text-4xl font-black mb-5" style={{ color: "var(--text)" }}>
          Simple comme <span style={{ color: "var(--accent)" }}>1 crédit = 1 action.</span>
        </h2>
        <p className="text-lg mb-12" style={{ color: "var(--text-muted)" }}>
          Pas d&apos;abonnements multiples, pas de surprise. Chaque action affiche son coût avant d&apos;être exécutée.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { action: "Message Haiku",   cost: "1 crédit",   color: "#6B9080" },
            { action: "Message Opus 4.7", cost: "100 crédits", color: "#4e8a78" },
            { action: "Image HD",        cost: "25 crédits",  color: "#5a9e8a" },
            { action: "Vidéo /sec Sora", cost: "40 crédits",  color: "#7a9e90" },
          ].map((item) => (
            <div key={item.action} className="rounded-2xl p-5 border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="text-2xl font-black mb-2" style={{ color: item.color }}>{item.cost}</div>
              <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{item.action}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────── */}
      <section id="pricing" className="py-24" style={{ background: "var(--bg-light)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5"
              style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
              Tarifs
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--text)" }}>
              Commencez gratuitement.<br />
              <span style={{ color: "var(--accent)" }}>Grandissez à votre rythme.</span>
            </h2>
            <p className="text-lg" style={{ color: "var(--text-muted)" }}>
              Aucune carte bancaire requise · Annulez à tout moment · Rollover des crédits non utilisés
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {PLANS.map((p) => (
              <div key={p.name}
                className="rounded-3xl p-7 flex flex-col border transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: p.highlight ? "var(--accent)" : "var(--bg-card)",
                  borderColor: p.highlight ? "transparent" : "var(--border)",
                }}>
                {p.highlight && (
                  <div className="text-xs font-black uppercase tracking-widest mb-4 opacity-75 text-white">
                    ✦ Le plus populaire
                  </div>
                )}
                <div className="text-base font-black mb-3" style={{ color: p.highlight ? "#fff" : "var(--text)" }}>
                  {p.name}
                </div>
                <div className="mb-1">
                  <span className="text-5xl font-black" style={{ color: p.highlight ? "#fff" : "var(--accent)" }}>
                    {p.price}
                  </span>
                  <span className="text-sm ml-1" style={{ color: p.highlight ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}>
                    /mois
                  </span>
                </div>
                <div className="text-sm font-semibold mb-7"
                  style={{ color: p.highlight ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>
                  {p.credits} crédits/mois
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm"
                      style={{ color: p.highlight ? "rgba(255,255,255,0.85)" : "var(--text-muted)" }}>
                      <Check size={14} className="flex-shrink-0 mt-0.5" style={{ opacity: 0.8 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register"
                  className="text-center text-sm font-bold px-4 py-3.5 rounded-2xl transition-all hover:opacity-90"
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

      {/* ── CTA final ──────────────────────────────────────── */}
      <section className="py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #6B9080 0%, transparent 60%)" }} />
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 border"
            style={{ background: "var(--bg-surface)", color: "var(--accent)", borderColor: "var(--border-strong)" }}>
            <Zap size={13} />
            Gratuit pour toujours · Sans carte bancaire
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ color: "var(--text)" }}>
            Prêt à aller<br />
            <span style={{ color: "var(--accent)" }}>10× plus vite ?</span>
          </h2>
          <p className="text-xl mb-12 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Rejoignez des milliers de créateurs et professionnels qui utilisent déjà Outio pour créer plus, en moins de temps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-2xl font-black text-lg text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "var(--accent)", boxShadow: "0 16px 48px rgba(107,144,128,0.45)" }}>
              Créer mon compte — C&apos;est gratuit
              <ArrowRight size={22} />
            </Link>
          </div>
          <p className="mt-6 text-sm" style={{ color: "var(--text-subtle)" }}>
            500 crédits offerts · Aucun engagement · Annulez quand vous voulez
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--bg-light)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
            <div className="col-span-2">
              <span className="font-black text-2xl block mb-3" style={{ color: "var(--accent)" }}>Outio</span>
              <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
                La plateforme IA tout-en-un pour créateurs, marketeurs et professionnels en Afrique et dans le monde entier.
              </p>
              <div className="flex gap-3">
                {[MessageCircle, Code2, Briefcase, Mail].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Produit",    links: ["Fonctionnalités", "Agents IA", "Modèles", "Tarifs", "Changelog", "Roadmap"] },
              { title: "Ressources", links: ["Documentation", "Blog", "Guides", "API", "Status", "Exemples"] },
              { title: "Entreprise", links: ["À propos", "Carrières", "Partenaires", "Presse", "Contact"] },
              { title: "Légal",      links: ["Confidentialité", "CGU", "Cookies", "RGPD"] },
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
              © {new Date().getFullYear()} Outio. Tous droits réservés. · Fait avec ♥ pour l&apos;Afrique et le monde.
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
