"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle, Upload, Sparkles, Download, RefreshCw,
  Sliders, Camera, Wand2, Check, Image as ImageIcon,
} from "lucide-react";

const STYLES = [
  { id: "realistic",  label: "Réaliste",      desc: "Photo-réaliste, qualité studio",        gradient: "135deg, #2d2d2d, #6B9080" },
  { id: "anime",      label: "Anime",          desc: "Style anime japonais moderne",           gradient: "135deg, #7b2ff7, #f107a3" },
  { id: "3d",         label: "3D Render",      desc: "Rendu 3D haute qualité",                gradient: "135deg, #0066ff, #00c2ff" },
  { id: "cartoon",    label: "Cartoon",        desc: "Style illustré / bande dessinée",       gradient: "135deg, #ff6b35, #f7c59f" },
  { id: "cinematic",  label: "Cinématique",    desc: "Éclairage dramatique, ambiance film",   gradient: "135deg, #1a1a2e, #e94560" },
  { id: "artistic",   label: "Artistique",     desc: "Peinture numérique, style unique",      gradient: "135deg, #134e5e, #71b280" },
];

const ETHNICITIES = ["Non spécifié", "Africain(e)", "Asiatique", "Européen(ne)", "Latino(a)", "Moyen-Oriental(e)", "Métis(se)"];
const AGES         = ["18-25 ans", "25-35 ans", "35-45 ans", "45-55 ans", "55+ ans"];
const MOODS        = ["Professionnel", "Souriant", "Sérieux", "Confiant", "Décontracté", "Mystérieux"];
const BACKGROUNDS  = ["Studio blanc", "Fond flou urbain", "Nature", "Bureau moderne", "Gradient coloré", "Noir uni"];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const card = {
  hidden:  { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const SAMPLE_AVATARS = [
  { id: 1, style: "Réaliste",   gradient: "135deg, #2d4a3e, #6B9080" },
  { id: 2, style: "Cinématique",gradient: "135deg, #1a1a2e, #6B9080" },
  { id: 3, style: "3D Render",  gradient: "135deg, #0a1628, #1e4d8c" },
  { id: 4, style: "Artistique", gradient: "135deg, #1a2e20, #4a8f6a" },
];

export default function AvatarPage() {
  const [style, setStyle]           = useState("realistic");
  const [ethnicity, setEthnicity]   = useState("Non spécifié");
  const [age, setAge]               = useState("25-35 ans");
  const [mood, setMood]             = useState("Professionnel");
  const [background, setBackground] = useState("Studio blanc");
  const [description, setDescription] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [loading, setLoading]       = useState(false);
  const [generated, setGenerated]   = useState(false);
  const [activeTab, setActiveTab]   = useState<"describe" | "upload">("describe");

  const generate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2500));
    setLoading(false);
    setGenerated(true);
  };

  const selectedStyle = STYLES.find((s) => s.id === style)!;
  const credits = style === "3d" ? 20 : style === "realistic" || style === "cinematic" ? 15 : 10;

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserCircle size={22} style={{ color: "var(--accent)" }} />
            <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>Avatar IA</h1>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Créez votre avatar personnalisé en quelques secondes.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Left — Controls */}
        <div className="space-y-5">

          {/* Input method tabs */}
          <div className="flex gap-1 p-1 rounded-2xl w-fit" style={{ background: "var(--bg-surface)" }}>
            {[
              { id: "describe", label: "Décrire", icon: Wand2 },
              { id: "upload",   label: "Photo",   icon: Camera },
            ].map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id as typeof activeTab)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                style={activeTab === t.id
                  ? { background: "var(--bg-card)", color: "var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                  : { color: "var(--text-muted)" }}>
                <t.icon size={13} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Description or Upload */}
          <AnimatePresence mode="wait">
            {activeTab === "describe" ? (
              <motion.div key="desc" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Description</label>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="ex. Femme africaine, 30 ans, sourire confiant, vêtements business modernes..."
                  className="w-full text-sm bg-transparent outline-none resize-none"
                  style={{ color: "var(--text)" }} />
              </motion.div>
            ) : (
              <motion.div key="upload" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border-2 border-dashed p-10 text-center cursor-pointer transition-all hover:border-[var(--accent)]"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                <Upload size={32} className="mx-auto mb-3" style={{ color: "var(--accent)", opacity: 0.5 }} />
                <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>
                  {uploadedPhoto ?? "Uploadez une photo de référence"}
                </p>
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>JPG / PNG · Visage visible</p>
                <label className="text-xs font-bold px-4 py-2 rounded-xl text-white inline-block cursor-pointer"
                  style={{ background: "var(--accent)" }}>
                  Choisir une photo
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => setUploadedPhoto(e.target.files?.[0]?.name ?? null)} />
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Styles */}
          <div className="rounded-3xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <label className="text-[10px] font-black uppercase tracking-wider mb-3 block" style={{ color: "var(--text-subtle)" }}>Style de rendu</label>
            <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STYLES.map((s) => (
                <motion.button key={s.id} variants={card}
                  onClick={() => setStyle(s.id)}
                  className="rounded-2xl border overflow-hidden text-left transition-all"
                  style={style === s.id
                    ? { borderColor: "var(--accent)", boxShadow: "0 0 0 2px var(--accent)" }
                    : { borderColor: "var(--border)" }}>
                  <div className="h-16 relative" style={{ background: `linear-gradient(${s.gradient})` }}>
                    {style === s.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "var(--accent)" }}>
                        <Check size={10} color="white" />
                      </div>
                    )}
                  </div>
                  <div className="p-2.5" style={{ background: "var(--bg-card)" }}>
                    <div className="text-xs font-bold" style={{ color: "var(--text)" }}>{s.label}</div>
                    <div className="text-[10px]" style={{ color: "var(--text-subtle)" }}>{s.desc}</div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Options */}
          <div className="rounded-3xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Sliders size={14} style={{ color: "var(--accent)" }} />
              <label className="text-[10px] font-black uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>Paramètres</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Ethnie", value: ethnicity, set: setEthnicity, opts: ETHNICITIES },
                { label: "Tranche d'âge", value: age, set: setAge, opts: AGES },
                { label: "Expression", value: mood, set: setMood, opts: MOODS },
                { label: "Arrière-plan", value: background, set: setBackground, opts: BACKGROUNDS },
              ].map(({ label, value, set, opts }) => (
                <div key={label}>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>{label}</label>
                  <select value={value} onChange={(e) => set(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border bg-transparent outline-none"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                    {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Generate */}
          <button onClick={generate} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "var(--accent)" }}>
            {loading
              ? <><RefreshCw size={16} className="animate-spin" /> Génération en cours...</>
              : <><Sparkles size={16} /> Générer l'avatar · {credits} crédits</>}
          </button>
        </div>

        {/* Right — Preview */}
        <div className="space-y-4">
          {/* Main canvas */}
          <div className="rounded-3xl border overflow-hidden"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="aspect-square relative flex items-center justify-center"
              style={{ background: generated ? `linear-gradient(${selectedStyle.gradient})` : "var(--bg-surface)" }}>
              {loading && (
                <div className="flex flex-col items-center gap-3">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Sparkles size={32} style={{ color: "var(--accent)" }} />
                  </motion.div>
                  <span className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>Génération...</span>
                </div>
              )}
              {!loading && !generated && (
                <div className="flex flex-col items-center gap-3 opacity-40">
                  <UserCircle size={64} style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--text-subtle)" }}>Votre avatar apparaîtra ici</span>
                </div>
              )}
              {generated && !loading && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-end">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <UserCircle size={120} color="white" strokeWidth={1} opacity={0.3} />
                  </div>
                  <div className="relative w-full p-4 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between">
                    <div>
                      <div className="text-white text-xs font-bold">{selectedStyle.label}</div>
                      <div className="text-white/60 text-[10px]">{age} · {mood}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={generate}
                        className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors">
                        <RefreshCw size={13} color="white" />
                      </button>
                      <button
                        className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors">
                        <Download size={13} color="white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Variations gallery */}
          <div className="rounded-3xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>Historique</span>
              <span className="text-[10px]" style={{ color: "var(--text-subtle)" }}>{generated ? "4" : "0"} avatars</span>
            </div>
            {generated ? (
              <div className="grid grid-cols-4 gap-2">
                {SAMPLE_AVATARS.map((a) => (
                  <motion.div key={a.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: a.id * 0.1 }}
                    className="aspect-square rounded-xl cursor-pointer hover:ring-2 transition-all"
                    style={{ background: `linear-gradient(${a.gradient})`, ringColor: "var(--accent)" } as React.CSSProperties}>
                    <div className="w-full h-full flex items-end p-1.5">
                      <span className="text-[8px] text-white/70">{a.style}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl" style={{ background: "var(--bg-surface)" }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
