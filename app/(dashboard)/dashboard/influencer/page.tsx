"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Sparkles, Users, Image as ImageIcon, MessageSquare,
  TrendingUp, Wand2, RefreshCw, Check, ChevronRight,
  Camera, Heart, Share2, Plus, ArrowRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */
const NICHES = [
  "Mode & Lifestyle", "Tech & Innovation", "Business & Finance",
  "Santé & Bien-être", "Beauté & Cosmétique", "Voyage & Culture",
  "Alimentation & Cuisine", "Musique & Art", "Sport & Fitness",
  "Éducation & Dev perso", "Entrepreneuriat", "Gaming",
];

const PERSONALITIES = [
  { id: "inspiring",    label: "Inspirant(e)",    emoji: "✨" },
  { id: "educational",  label: "Éducatif(ve)",    emoji: "📚" },
  { id: "entertaining", label: "Divertissant(e)", emoji: "🎭" },
  { id: "authentic",    label: "Authentique",     emoji: "💯" },
  { id: "luxury",       label: "Luxe & Premium",  emoji: "💎" },
  { id: "activist",     label: "Engagé(e)",       emoji: "🌍" },
];

const CONTENT_TYPES = ["Post photo", "Carrousel", "Reel / Short", "Story", "Thread", "Article long"];

const PLATFORMS_AI = [
  { id: "instagram", label: "Instagram", color: "#E1306C" },
  { id: "tiktok",    label: "TikTok",    color: "#000000" },
  { id: "linkedin",  label: "LinkedIn",  color: "#0077B5" },
  { id: "youtube",   label: "YouTube",   color: "#FF0000" },
  { id: "twitter",   label: "X / Twitter", color: "#1DA1F2" },
];

const GENERATED_POSTS = [
  {
    platform: "Instagram",
    color: "#E1306C",
    type: "Carrousel",
    caption: "5 erreurs que font 90% des entrepreneurs africains au démarrage — et comment les éviter 🚀\n\n[Swipe →]\n\n#Entrepreneuriat #Afrique #Business",
    likes: "2.4K",
    reach: "18K",
  },
  {
    platform: "LinkedIn",
    color: "#0077B5",
    type: "Article",
    caption: "J'ai analysé 100 startups africaines en 2025. Voici ce que les plus performantes ont en commun...\n\nThread 👇",
    likes: "891",
    reach: "12K",
  },
  {
    platform: "TikTok",
    color: "#000000",
    type: "Reel",
    caption: "POV : tu construis ta marque personnelle depuis le Sénégal en 2026 🇸🇳✨",
    likes: "5.1K",
    reach: "42K",
  },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const WIZARD_STEPS = ["Profil", "Contenu", "Générer"];

export default function InfluencerPage() {
  const [step, setStep]           = useState(0);
  const [influName, setInfluName] = useState("");
  const [niche, setNiche]         = useState("Tech & Innovation");
  const [personality, setPersonality] = useState("inspiring");
  const [platforms, setPlatforms] = useState<string[]>(["instagram"]);
  const [contentTypes, setContentTypes] = useState<string[]>(["Post photo", "Reel / Short"]);
  const [frequency, setFrequency] = useState(5);
  const [targetAudience, setTargetAudience] = useState("");
  const [loading, setLoading]     = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggleArr = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const generate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2400));
    setLoading(false);
    setGenerated(true);
  };

  const selectedPersonality = PERSONALITIES.find((p) => p.id === personality)!;

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Star size={22} style={{ color: "var(--accent)" }} />
            <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>Influenceur IA</h1>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Créez et gérez un influenceur IA pour votre marque ou vous-même.</p>
        </div>
      </div>

      {/* Step nav */}
      <div className="flex items-center gap-0 mb-8">
        {WIZARD_STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <button onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all"
              style={i === step ? { color: "var(--accent)" } : i < step ? { color: "#2d9d6e" } : { color: "var(--text-subtle)" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                style={{
                  background: i === step ? "var(--accent)" : i < step ? "#2d9d6e" : "var(--bg-surface)",
                  color: i <= step ? "#fff" : "var(--text-subtle)",
                }}>
                {i < step ? <Check size={10} /> : i + 1}
              </div>
              <span className="text-sm font-semibold">{s}</span>
            </button>
            {i < WIZARD_STEPS.length - 1 && (
              <ChevronRight size={14} className="mx-1" style={{ color: "var(--border)" }} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Step 0 — Profil ──────────────────────────────── */}
        {step === 0 && (
          <motion.div key="profile"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }}
            className="grid md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <h3 className="font-black text-sm mb-5" style={{ color: "var(--text)" }}>Identité de l'influenceur</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Nom / Pseudo</label>
                    <input value={influName} onChange={(e) => setInfluName(e.target.value)}
                      placeholder="ex. @ayo_creates, @leila_tech..."
                      className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Niche</label>
                    <div className="flex flex-wrap gap-1.5">
                      {NICHES.map((n) => (
                        <button key={n} onClick={() => setNiche(n)}
                          className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                          style={niche === n
                            ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                            : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Audience cible</label>
                    <input value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="ex. Entrepreneurs africains 25-35 ans..."
                      className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <h3 className="font-black text-sm mb-4" style={{ color: "var(--text)" }}>Personnalité</h3>
                <div className="grid grid-cols-2 gap-2">
                  {PERSONALITIES.map((p) => (
                    <button key={p.id} onClick={() => setPersonality(p.id)}
                      className="flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left"
                      style={personality === p.id
                        ? { background: "var(--bg-surface)", borderColor: "var(--border-strong)" }
                        : { borderColor: "var(--border)" }}>
                      <span className="text-lg">{p.emoji}</span>
                      <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{p.label}</span>
                      {personality === p.id && <Check size={11} className="ml-auto" style={{ color: "var(--accent)" }} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <h3 className="font-black text-sm mb-3" style={{ color: "var(--text)" }}>Plateformes cibles</h3>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS_AI.map((p) => (
                    <button key={p.id}
                      onClick={() => toggleArr(platforms, setPlatforms, p.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all"
                      style={platforms.includes(p.id)
                        ? { background: `${p.color}18`, borderColor: p.color, color: p.color }
                        : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <button onClick={() => setStep(1)} disabled={!influName.trim()}
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--accent)" }}>
                Continuer <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 1 — Stratégie de contenu ────────────────── */}
        {step === 1 && (
          <motion.div key="content"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }}
            className="grid md:grid-cols-2 gap-5">
            <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <h3 className="font-black text-sm mb-5" style={{ color: "var(--text)" }}>Stratégie de contenu</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Types de contenus</label>
                  <div className="flex flex-wrap gap-1.5">
                    {CONTENT_TYPES.map((ct) => (
                      <button key={ct}
                        onClick={() => toggleArr(contentTypes, setContentTypes, ct)}
                        className="text-xs px-3 py-1.5 rounded-xl border font-medium transition-all"
                        style={contentTypes.includes(ct)
                          ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                          : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                        {ct}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
                    Fréquence de publication — {frequency}x / semaine
                  </label>
                  <input type="range" min={1} max={14} step={1}
                    value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full accent-[var(--accent)]" />
                  <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-subtle)" }}>
                    <span>1x</span><span>14x</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <h3 className="font-black text-sm mb-4" style={{ color: "var(--text)" }}>Résumé de l'influenceur</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "var(--bg-surface)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ background: "var(--accent)" }}>
                    {influName?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: "var(--text)" }}>{influName || "@influenceur"}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{niche}</div>
                  </div>
                </div>
                {[
                  { label: "Personnalité", value: selectedPersonality.label },
                  { label: "Plateformes", value: PLATFORMS_AI.filter(p => platforms.includes(p.id)).map(p => p.label).join(", ") },
                  { label: "Contenu", value: contentTypes.slice(0, 3).join(", ") },
                  { label: "Fréquence", value: `${frequency}x / semaine` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider mt-0.5 w-20 flex-shrink-0" style={{ color: "var(--text-subtle)" }}>{label}</span>
                    <span className="text-xs" style={{ color: "var(--text)" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button onClick={() => setStep(0)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:bg-[var(--bg-surface)]"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                Retour
              </button>
              <button onClick={() => setStep(2)}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}>
                Générer les contenus <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 2 — Générer ─────────────────────────────── */}
        {step === 2 && (
          <motion.div key="generate"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }}
            className="space-y-5">
            {!generated ? (
              <div className="rounded-3xl border p-10 text-center max-w-lg mx-auto"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "var(--bg-surface)" }}>
                  <Star size={28} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="font-black text-lg mb-2" style={{ color: "var(--text)" }}>
                  Prêt à lancer {influName || "votre influenceur"}
                </h3>
                <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                  L&apos;IA va générer un plan de contenu complet + vos premiers posts pour {PLATFORMS_AI.filter(p => platforms.includes(p.id)).map(p => p.label).join(", ")}.
                </p>
                <button onClick={generate} disabled={loading}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90"
                  style={{ background: "var(--accent)" }}>
                  {loading
                    ? <><RefreshCw size={15} className="animate-spin" /> Création en cours...</>
                    : <><Sparkles size={15} /> Lancer l'influenceur · 50 cr</>}
                </button>
              </div>
            ) : (
              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
                {/* Stats */}
                <motion.div variants={item} className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Posts générés", value: "12", icon: ImageIcon },
                    { label: "Portée estimée", value: "72K", icon: TrendingUp },
                    { label: "Eng. moyen", value: "4.2%", icon: Heart },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-2xl border p-4 text-center"
                      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                      <Icon size={16} className="mx-auto mb-1" style={{ color: "var(--accent)" }} />
                      <div className="text-lg font-black mb-0.5" style={{ color: "var(--text)" }}>{value}</div>
                      <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Generated posts */}
                <div className="grid md:grid-cols-3 gap-4">
                  {GENERATED_POSTS.map((post, i) => (
                    <motion.div key={i} variants={item}
                      className="rounded-3xl border overflow-hidden"
                      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                      <div className="h-32 flex items-center justify-center"
                        style={{ background: `${post.color}18` }}>
                        <Camera size={28} style={{ color: post.color, opacity: 0.6 }} />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                            style={{ background: `${post.color}18`, color: post.color }}>{post.platform}</span>
                          <span className="text-[10px]" style={{ color: "var(--text-subtle)" }}>{post.type}</span>
                        </div>
                        <p className="text-xs leading-relaxed line-clamp-3 mb-3" style={{ color: "var(--text-muted)" }}>{post.caption}</p>
                        <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--text-subtle)" }}>
                          <span className="flex items-center gap-1"><Heart size={10} /> {post.likes}</span>
                          <span className="flex items-center gap-1"><Users size={10} /> {post.reach}</span>
                          <button className="flex items-center gap-1 font-bold" style={{ color: "var(--accent)" }}>
                            <Share2 size={10} /> Publier
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button variants={item}
                  onClick={generate}
                  className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  <Plus size={14} /> Générer plus de contenus
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
