"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone, Palette, Image as ImageIcon, Plus,
  Sparkles, ChevronRight, ChevronLeft, CheckCircle2,
  Layers, Target, Users, Eye, Wand2, Tag, Calendar,
  ArrowRight, Pencil,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */
const TABS = [
  { id: "campaigns", label: "Campagnes",  icon: Megaphone },
  { id: "brand",     label: "Brand DNA",  icon: Palette   },
  { id: "moodboard", label: "Moodboards", icon: Layers    },
  { id: "photoshoot",label: "Photoshoots",icon: ImageIcon },
];

const CAMPAIGNS = [
  { id: 1, name: "Lancement Produit Q2", status: "active",  channels: ["Instagram", "LinkedIn"], progress: 65  },
  { id: 2, name: "Campagne Ramadan",      status: "draft",   channels: ["Instagram", "Facebook"], progress: 20  },
  { id: 3, name: "Black Friday 2026",     status: "planned", channels: ["Instagram", "X"],         progress: 5   },
];
const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  active:  { bg: "#2d9d6e18", color: "#2d9d6e", label: "Actif"     },
  draft:   { bg: "var(--bg-surface)", color: "var(--text-subtle)", label: "Brouillon" },
  planned: { bg: "#d9770618", color: "#d97706", label: "Planifié"  },
};

const MOODBOARDS = [
  { id: 1, name: "Été 2026",         images: 12, style: "Lumineux, nature"    },
  { id: 2, name: "Brand Identity",   images: 8,  style: "Minimaliste, vert"   },
  { id: 3, name: "Campagne Produit", images: 15, style: "Cinématique, sombre" },
];

const TONES      = ["Professionnel", "Inspirant", "Décontracté", "Premium", "Audacieux", "Bienveillant"];
const AUDIENCES  = ["18-25 ans", "25-35 ans", "35-50 ans", "Entrepreneurs", "Créateurs", "Marketeurs", "PME", "Artistes"];
const GOALS      = ["Notoriété", "Engagement", "Conversion", "Fidélisation", "Recrutement", "Lancement"];
const FONT_PAIRS = ["Inter + Playfair Display", "Syne + DM Sans", "Plus Jakarta + Fraunces", "Space Grotesk + Lora", "Clash Display + Inter"];
const BRAND_COLORS_PRESET = [
  { name: "Vert naturel", colors: ["#6B9080", "#A4C3B2", "#1a2e25"] },
  { name: "Noir premium",  colors: ["#111111", "#333333", "#f5f5f5"] },
  { name: "Soleil africain", colors: ["#F5A623", "#D44000", "#1a1a1a"] },
  { name: "Bleu digital",  colors: ["#0057FF", "#00C9FF", "#0a0a1a"] },
  { name: "Rose moderne",  colors: ["#FF6B6B", "#FFB3B3", "#1a0a0a"] },
];

const DNA_STEPS = [
  { id: "identity",  label: "Identité",   icon: Pencil  },
  { id: "visuals",   label: "Visuels",    icon: Palette },
  { id: "voice",     label: "Ton & Voix", icon: Megaphone },
  { id: "audience",  label: "Audience",   icon: Users   },
  { id: "preview",   label: "Aperçu",     icon: Eye     },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};
const slideIn = (dir: number) => ({
  hidden:  { opacity: 0, x: dir * 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: "easeOut" as const } },
});

export default function CampaignPage() {
  const [tab, setTab]     = useState("campaigns");

  /* Brand DNA wizard state */
  const [dnaStep, setDnaStep]           = useState(0);
  const [brandName, setBrandName]       = useState("");
  const [brandTagline, setBrandTagline] = useState("");
  const [brandMission, setBrandMission] = useState("");
  const [brandColors, setBrandColors]   = useState(BRAND_COLORS_PRESET[0].colors);
  const [fontPair, setFontPair]         = useState(FONT_PAIRS[0]);
  const [brandTone, setBrandTone]       = useState<string[]>(["Professionnel"]);
  const [brandPersonality, setBrandPersonality] = useState("");
  const [brandAudience, setBrandAudience] = useState<string[]>(["Entrepreneurs"]);
  const [brandGoals, setBrandGoals]     = useState<string[]>(["Notoriété"]);
  const [generating, setGenerating]     = useState(false);
  const [dnaResult, setDnaResult]       = useState("");
  const [dir, setDir]                   = useState(1);

  const goTo = (next: number) => {
    setDir(next > dnaStep ? 1 : -1);
    setDnaStep(next);
  };

  const toggleArr = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const generateDNA = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2200));
    setDnaResult(
      `${brandName || "Votre marque"} est une marque ${brandTone.join(", ").toLowerCase()} qui s'adresse à ${brandAudience.join(", ").toLowerCase()}. ` +
      `Notre mission : ${brandMission || "créer de la valeur durable pour nos clients"}. ` +
      `Ton de voix : direct, inspirant, ancré dans l'action — jamais dans la sur-promesse. ` +
      `Nous parlons en terrain égal avec nos clients, comme un allié qui connaît le chemin.`
    );
    setGenerating(false);
    goTo(4);
  };

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Campagnes</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Brand DNA, moodboards, campagnes et photoshoots IA.</p>
        </div>
        {tab === "campaigns" && (
          <button className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl text-white"
            style={{ background: "var(--accent)" }}>
            <Plus size={14} /> Nouvelle campagne
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl mb-7 w-fit" style={{ background: "var(--bg-surface)" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={tab === t.id
              ? { background: "var(--bg-card)", color: "var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
              : { color: "var(--text-muted)" }}>
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Campaigns ────────────────────────────────────── */}
      {tab === "campaigns" && (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
          {CAMPAIGNS.map((c) => {
            const st = STATUS_STYLE[c.status];
            return (
              <motion.div key={c.id} variants={item}
                className="rounded-2xl border p-5 cursor-pointer transition-all hover:border-[var(--border-strong)] hover:-translate-y-0.5"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold mb-1.5" style={{ color: "var(--text)" }}>{c.name}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                        style={{ background: st.bg, color: st.color }}>{st.label}</span>
                      {c.channels.map((ch) => (
                        <span key={ch} className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: "var(--bg-surface)", color: "var(--text-subtle)" }}>{ch}</span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--text-subtle)" }} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full rounded-full" style={{ background: "var(--accent)", width: `${c.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-subtle)" }}>{c.progress}%</span>
                </div>
              </motion.div>
            );
          })}
          <motion.button variants={item}
            className="w-full rounded-2xl border-2 border-dashed p-5 flex items-center justify-center gap-2 text-sm font-semibold transition-all hover:border-[var(--accent)] hover:bg-[var(--bg-surface)]"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
            <Plus size={16} /> Nouvelle campagne
          </motion.button>
        </motion.div>
      )}

      {/* ── Brand DNA wizard ─────────────────────────────── */}
      {tab === "brand" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          {/* Step progress */}
          <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-1">
            {DNA_STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-shrink-0">
                <button onClick={() => i < dnaStep && goTo(i)}
                  className="flex flex-col items-center gap-1.5 group"
                  disabled={i > dnaStep}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      background: i === dnaStep ? "var(--accent)" : i < dnaStep ? "#2d9d6e" : "var(--bg-surface)",
                      color: i <= dnaStep ? "#fff" : "var(--text-subtle)",
                    }}>
                    {i < dnaStep ? <CheckCircle2 size={14} /> : <s.icon size={13} />}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider"
                    style={{ color: i === dnaStep ? "var(--accent)" : i < dnaStep ? "#2d9d6e" : "var(--text-subtle)" }}>
                    {s.label}
                  </span>
                </button>
                {i < DNA_STEPS.length - 1 && (
                  <div className="w-8 h-px mx-1 mt-[-12px]"
                    style={{ background: i < dnaStep ? "#2d9d6e" : "var(--border)" }} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0 — Identité */}
            {dnaStep === 0 && (
              <motion.div key="identity" variants={slideIn(dir)} initial="hidden" animate="visible"
                className="rounded-3xl border p-7 space-y-5 max-w-xl"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <Pencil size={15} style={{ color: "var(--accent)" }} />
                    <h3 className="font-black text-base" style={{ color: "var(--text)" }}>Identité de marque</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Nom de la marque *</label>
                      <input value={brandName} onChange={(e) => setBrandName(e.target.value)}
                        placeholder="ex. Outio, Lumo, Kora..."
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Tagline</label>
                      <input value={brandTagline} onChange={(e) => setBrandTagline(e.target.value)}
                        placeholder="ex. Créez plus. Pensez moins."
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Mission</label>
                      <textarea rows={3} value={brandMission} onChange={(e) => setBrandMission(e.target.value)}
                        placeholder="Quelle valeur apportez-vous au monde ?"
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none resize-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                  </div>
                </div>
                <button onClick={() => goTo(1)} disabled={!brandName.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "var(--accent)" }}>
                  Suivant <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {/* Step 1 — Visuels */}
            {dnaStep === 1 && (
              <motion.div key="visuals" variants={slideIn(dir)} initial="hidden" animate="visible"
                className="rounded-3xl border p-7 max-w-2xl"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-6">
                  <Palette size={15} style={{ color: "var(--accent)" }} />
                  <h3 className="font-black text-base" style={{ color: "var(--text)" }}>Identité visuelle</h3>
                </div>

                <div className="space-y-6">
                  {/* Colors */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-3 block" style={{ color: "var(--text-subtle)" }}>Palette de couleurs</label>
                    <div className="space-y-2">
                      {BRAND_COLORS_PRESET.map((preset) => (
                        <button key={preset.name}
                          onClick={() => setBrandColors(preset.colors)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left"
                          style={{
                            background:  JSON.stringify(brandColors) === JSON.stringify(preset.colors) ? "var(--bg-surface)" : "transparent",
                            borderColor: JSON.stringify(brandColors) === JSON.stringify(preset.colors) ? "var(--border-strong)" : "var(--border)",
                          }}>
                          <div className="flex gap-1 flex-shrink-0">
                            {preset.colors.map((c) => (
                              <div key={c} className="w-5 h-5 rounded-md" style={{ background: c }} />
                            ))}
                          </div>
                          <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{preset.name}</span>
                          {JSON.stringify(brandColors) === JSON.stringify(preset.colors) &&
                            <CheckCircle2 size={13} className="ml-auto" style={{ color: "#2d9d6e" }} />}
                        </button>
                      ))}
                    </div>
                    {/* Custom */}
                    <div className="flex gap-2 mt-3">
                      {brandColors.map((c, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded-lg border cursor-pointer" style={{ background: c, borderColor: "var(--border)" }} />
                          <input value={c}
                            onChange={(e) => { const n = [...brandColors]; n[i] = e.target.value; setBrandColors(n); }}
                            className="text-[10px] w-16 px-2 py-1 rounded-lg border bg-transparent outline-none"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Typographie</label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {FONT_PAIRS.map((f) => (
                        <button key={f} onClick={() => setFontPair(f)}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-left"
                          style={fontPair === f
                            ? { background: "var(--bg-surface)", borderColor: "var(--border-strong)" }
                            : { borderColor: "var(--border)" }}>
                          <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{f}</span>
                          {fontPair === f && <CheckCircle2 size={13} style={{ color: "#2d9d6e" }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => goTo(0)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:bg-[var(--bg-surface)]"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <ChevronLeft size={14} /> Retour
                  </button>
                  <button onClick={() => goTo(2)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "var(--accent)" }}>
                    Suivant <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Ton & Voix */}
            {dnaStep === 2 && (
              <motion.div key="voice" variants={slideIn(dir)} initial="hidden" animate="visible"
                className="rounded-3xl border p-7 max-w-xl"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-6">
                  <Megaphone size={15} style={{ color: "var(--accent)" }} />
                  <h3 className="font-black text-base" style={{ color: "var(--text)" }}>Ton de marque & Voix</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Ton de voix (plusieurs possibles)</label>
                    <div className="flex flex-wrap gap-1.5">
                      {TONES.map((t) => (
                        <button key={t} onClick={() => toggleArr(brandTone, setBrandTone, t)}
                          className="text-xs px-3 py-1.5 rounded-xl border font-medium transition-all"
                          style={brandTone.includes(t)
                            ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                            : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Personnalité de marque</label>
                    <textarea rows={3} value={brandPersonality} onChange={(e) => setBrandPersonality(e.target.value)}
                      placeholder="ex. Comme un mentor africain moderne — direct, chaleureux, exigeant..."
                      className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none resize-none focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => goTo(1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:bg-[var(--bg-surface)]"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <ChevronLeft size={14} /> Retour
                  </button>
                  <button onClick={() => goTo(3)} disabled={brandTone.length === 0}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "var(--accent)" }}>
                    Suivant <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Audience & Objectifs */}
            {dnaStep === 3 && (
              <motion.div key="audience" variants={slideIn(dir)} initial="hidden" animate="visible"
                className="rounded-3xl border p-7 max-w-xl"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-6">
                  <Users size={15} style={{ color: "var(--accent)" }} />
                  <h3 className="font-black text-base" style={{ color: "var(--text)" }}>Audience & Objectifs</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Audience cible</label>
                    <div className="flex flex-wrap gap-1.5">
                      {AUDIENCES.map((a) => (
                        <button key={a} onClick={() => toggleArr(brandAudience, setBrandAudience, a)}
                          className="text-xs px-3 py-1.5 rounded-xl border font-medium transition-all"
                          style={brandAudience.includes(a)
                            ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                            : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Objectifs prioritaires</label>
                    <div className="flex flex-wrap gap-1.5">
                      {GOALS.map((g) => (
                        <button key={g} onClick={() => toggleArr(brandGoals, setBrandGoals, g)}
                          className="text-xs px-3 py-1.5 rounded-xl border font-medium transition-all"
                          style={brandGoals.includes(g)
                            ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                            : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => goTo(2)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:bg-[var(--bg-surface)]"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <ChevronLeft size={14} /> Retour
                  </button>
                  <button onClick={generateDNA} disabled={generating || brandAudience.length === 0}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "var(--accent)" }}>
                    {generating ? <><Wand2 size={14} className="animate-pulse" /> Génération...</> : <><Sparkles size={14} /> Générer le DNA</>}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4 — Preview */}
            {dnaStep === 4 && (
              <motion.div key="preview" variants={slideIn(dir)} initial="hidden" animate="visible"
                className="space-y-4 max-w-2xl">
                <div className="rounded-3xl border p-7" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 mb-6">
                    <Eye size={15} style={{ color: "var(--accent)" }} />
                    <h3 className="font-black text-base" style={{ color: "var(--text)" }}>Brand DNA — {brandName}</h3>
                  </div>

                  {/* Color swatch */}
                  <div className="flex gap-2 mb-5">
                    {brandColors.map((c) => (
                      <div key={c} title={c}
                        className="w-12 h-12 rounded-xl border" style={{ background: c, borderColor: "var(--border)" }} />
                    ))}
                  </div>

                  <div className="space-y-4">
                    {brandTagline && (
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>Tagline</span>
                        <p className="text-base font-black mt-0.5" style={{ color: "var(--text)" }}>{brandTagline}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>DNA généré</span>
                      <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>{dnaResult}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{ color: "var(--text-subtle)" }}>Ton</span>
                        <div className="flex flex-wrap gap-1">
                          {brandTone.map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{ color: "var(--text-subtle)" }}>Audience</span>
                        <div className="flex flex-wrap gap-1">
                          {brandAudience.map((a) => (
                            <span key={a} className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>{a}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "#2d9d6e18" }}>
                      <CheckCircle2 size={14} style={{ color: "#2d9d6e" }} />
                      <span className="text-xs font-semibold" style={{ color: "#2d9d6e" }}>Brand DNA enregistré — utilisé pour tous vos contenus</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => { setDnaStep(0); setDnaResult(""); }}
                  className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  <Pencil size={13} /> Modifier le DNA
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Moodboards ───────────────────────────────────── */}
      {tab === "moodboard" && (
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOODBOARDS.map((mb) => (
            <motion.div key={mb.id} variants={item}
              className="rounded-3xl border overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="aspect-video grid grid-cols-3 grid-rows-2 gap-0.5 p-2"
                style={{ background: "var(--bg-surface)" }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-lg"
                    style={{ background: `hsl(${150 + i * 15}, ${40 - i * 3}%, ${60 + i * 5}%)`, opacity: 0.7 + i * 0.05 }} />
                ))}
              </div>
              <div className="p-4">
                <div className="font-bold text-sm mb-1" style={{ color: "var(--text)" }}>{mb.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{mb.images} images · {mb.style}</span>
                  <ChevronRight size={14} style={{ color: "var(--text-subtle)" }} />
                </div>
              </div>
            </motion.div>
          ))}
          <motion.button variants={item}
            className="rounded-3xl border-2 border-dashed aspect-video flex items-center justify-center gap-2 text-sm font-semibold transition-all hover:border-[var(--accent)] hover:bg-[var(--bg-surface)]"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
            <Plus size={18} /> Nouveau moodboard
          </motion.button>
        </motion.div>
      )}

      {/* ── Photoshoot ───────────────────────────────────── */}
      {tab === "photoshoot" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border p-10 text-center"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--bg-surface)" }}>
            <ImageIcon size={28} style={{ color: "var(--accent)" }} />
          </div>
          <h3 className="font-black text-lg mb-2" style={{ color: "var(--text)" }}>Photoshoots IA</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            Uploadez vos produits ou décrivez la scène, choisissez un décor, et laissez l&apos;IA générer un shooting professionnel cohérent avec votre Brand DNA.
          </p>
          <button className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white"
            style={{ background: "var(--accent)" }}>
            <Sparkles size={14} /> Créer un photoshoot
          </button>
        </motion.div>
      )}
    </div>
  );
}
