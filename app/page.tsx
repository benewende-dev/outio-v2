import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Globe, Image, Video, Mic } from "lucide-react";

const FEATURES = [
  { icon: Sparkles, title: "29 Agents IA",        desc: "Agents autonomes spécialisés pour chaque métier" },
  { icon: Zap,      title: "Chat multi-modèles",  desc: "Opus, GPT-5, Gemini, DeepSeek et 30+ modèles" },
  { icon: Image,    title: "Génération d'images", desc: "Flux, Midjourney, DALL-E et plus encore" },
  { icon: Video,    title: "Création vidéo",      desc: "Sora, Kling, Runway — qualité cinéma" },
  { icon: Mic,      title: "Audio & Musique",     desc: "ElevenLabs, Suno, Udio — voix et musique IA" },
  { icon: Globe,    title: "Social & Campagnes",  desc: "Gérez tous vos réseaux en un seul endroit" },
];

const PLANS = [
  { name: "Free",     price: "0€",  credits: "500",    cta: "Commencer",     highlight: false },
  { name: "Starter",  price: "9€",  credits: "3 000",  cta: "Choisir",       highlight: false },
  { name: "Pro",      price: "29€", credits: "15 000", cta: "Choisir",       highlight: true  },
  { name: "Business", price: "89€", credits: "50 000", cta: "Nous contacter", highlight: false },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 glass border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight" style={{ color: "var(--accent)" }}>outio</span>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="#features" className="hover:text-[var(--accent)] transition-colors">Fonctionnalités</Link>
            <Link href="#pricing"  className="hover:text-[var(--accent)] transition-colors">Tarifs</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm px-4 py-2 rounded-lg transition-colors hover:bg-[var(--bg-surface)]"
              style={{ color: "var(--text-muted)" }}>
              Connexion
            </Link>
            <Link href="/register"
              className="text-sm px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}>
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
          <Sparkles size={14} />
          Plateforme IA tout-en-un
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
          style={{ color: "var(--text)" }}>
          Créez plus.<br />
          <span style={{ color: "var(--accent)" }}>Pensez moins.</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: "var(--text-muted)" }}>
          Chat, agents autonomes, images, vidéos, audio — tout ce dont vous avez besoin pour créer, en un seul endroit.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)", boxShadow: "0 4px 16px rgba(107,144,128,0.3)" }}>
            Démarrer gratuitement <ArrowRight size={18} />
          </Link>
          <Link href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:bg-[var(--bg-surface)]"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            Voir les fonctionnalités
          </Link>
        </div>
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "29+",  label: "Agents IA" },
            { value: "50+",  label: "Modèles" },
            { value: "100%", label: "Contrôle" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold" style={{ color: "var(--accent)" }}>{s.value}</div>
              <div className="text-sm mt-1" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--text)" }}>
          Tout ce qu&apos;il vous faut
        </h2>
        <p className="text-center mb-14" style={{ color: "var(--text-muted)" }}>
          Une plateforme complète pour créer, publier et automatiser.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="card card-hover p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--bg-surface)" }}>
                <f.icon size={20} style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{f.title}</h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "var(--text)" }}>
          Tarifs simples et transparents
        </h2>
        <p className="text-center mb-14" style={{ color: "var(--text-muted)" }}>
          Des crédits pour tout — texte, images, vidéos, audio. 1 crédit = 1 action.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((p) => (
            <div key={p.name} className={`card card-hover p-6 flex flex-col ${p.highlight ? "ring-2 ring-[var(--accent)]" : ""}`}>
              {p.highlight && (
                <div className="text-xs font-semibold px-3 py-1 rounded-full mb-4 text-center text-white"
                  style={{ background: "var(--accent)" }}>
                  Populaire
                </div>
              )}
              <div className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>{p.name}</div>
              <div className="text-3xl font-bold mb-1" style={{ color: "var(--accent)" }}>
                {p.price}<span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>/mois</span>
              </div>
              <div className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>{p.credits} crédits/mois</div>
              <Link href="/register"
                className="mt-auto text-center text-sm font-medium px-4 py-3 rounded-lg transition-all"
                style={p.highlight
                  ? { background: "var(--accent)", color: "#fff" }
                  : { background: "var(--bg-surface)", color: "var(--text)" }}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-12" style={{ borderColor: "var(--border)", background: "var(--bg-light)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg" style={{ color: "var(--accent)" }}>outio</span>
          <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
            © {new Date().getFullYear()} Outio. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">Confidentialité</Link>
            <Link href="/terms"   className="hover:text-[var(--accent)] transition-colors">CGU</Link>
            <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
