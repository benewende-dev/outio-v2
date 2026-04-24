"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, Copy, RefreshCw, ChevronDown, ImageIcon, Sliders } from "lucide-react";

const IMAGE_MODELS = [
  { id: "flux-2-pro",      label: "Flux 2 Pro",      speed: "Rapide",  quality: "Haute",    credits: 8  },
  { id: "flux-schnell",    label: "Flux Schnell",    speed: "Ultra",   quality: "Standard", credits: 3  },
  { id: "midjourney-v7",   label: "Midjourney v7",   speed: "Moyen",   quality: "Artistique",credits: 20 },
  { id: "dall-e-4",        label: "DALL-E 4",        speed: "Rapide",  quality: "Précise",  credits: 15 },
  { id: "ideogram-v3",     label: "Ideogram v3",     speed: "Rapide",  quality: "Texte IA", credits: 10 },
  { id: "stable-diff-3-5", label: "SD 3.5 Ultra",    speed: "Moyen",   quality: "Détaillée",credits: 6  },
];

const STYLES = ["Photo-réaliste", "Illustration", "Anime", "Peinture", "Cinématique", "Abstrait", "Minimaliste", "3D Render"];
const SIZES  = ["1:1 — Carré", "16:9 — Paysage", "9:16 — Portrait", "4:3 — Standard", "3:2 — Photo"];

const PLACEHOLDERS = [
  "Un coucher de soleil sur la savane africaine, style photographique",
  "Portrait d'une femme entrepreneur en studio, lumière dorée",
  "Logo minimaliste pour une startup tech, fond blanc",
  "Paysage urbain futuriste de Dakar en 2080",
];

export default function ImagesPage() {
  const [prompt, setPrompt]     = useState("");
  const [model, setModel]       = useState("flux-2-pro");
  const [style, setStyle]       = useState("Photo-réaliste");
  const [size, setSize]         = useState("1:1 — Carré");
  const [loading, setLoading]   = useState(false);
  const [images, setImages]     = useState<string[]>([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const activeModel = IMAGE_MODELS.find((m) => m.id === model)!;

  const generate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    // Simulate generation delay - replace with real API call
    await new Promise((r) => setTimeout(r, 2500));
    // Placeholder gradient images
    const colors = ["#6B9080,#A4C3B2", "#4e8a78,#CCE3DE", "#263c2e,#6B9080"];
    setImages((prev) => [
      `https://via.placeholder.com/512/6B9080/ffffff?text=Outio+Image`,
      ...prev.slice(0, 7),
    ]);
    setLoading(false);
  };

  return (
    <div className="flex h-full" style={{ background: "var(--bg)" }}>

      {/* Left — Controls */}
      <div className="w-80 flex-shrink-0 flex flex-col border-r overflow-y-auto"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon size={16} style={{ color: "var(--accent)" }} />
            <h2 className="font-black text-sm" style={{ color: "var(--text)" }}>Génération d&apos;images</h2>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Décrivez l&apos;image que vous souhaitez créer</p>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Prompt */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
              Prompt
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]}
              className="w-full text-sm px-3 py-3 rounded-xl border bg-transparent outline-none resize-none focus:border-[var(--accent)] transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            />
            {/* Quick prompts */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["portrait", "paysage", "logo", "futuriste"].map((t) => (
                <button key={t} onClick={() => setPrompt((p) => p ? p + `, ${t}` : t)}
                  className="text-[10px] px-2 py-1 rounded-full border transition-all hover:border-[var(--border-strong)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  + {t}
                </button>
              ))}
            </div>
          </div>

          {/* Model selector */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
              Modèle
            </label>
            <div className="relative">
              <button
                onClick={() => setModelOpen(!modelOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-all hover:border-[var(--border-strong)]"
                style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--bg-surface)" }}>
                <div className="flex items-center gap-2">
                  <span>{activeModel.label}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: "var(--bg-card)", color: "var(--accent)" }}>
                    {activeModel.credits} cr
                  </span>
                </div>
                <ChevronDown size={13} style={{ color: "var(--text-muted)" }} />
              </button>
              <AnimatePresence>
                {modelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-10 w-full top-11 rounded-2xl border overflow-hidden shadow-xl"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                    {IMAGE_MODELS.map((m) => (
                      <button key={m.id}
                        onClick={() => { setModel(m.id); setModelOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-[var(--bg-surface)] transition-colors"
                        style={{ color: m.id === model ? "var(--accent)" : "var(--text)" }}>
                        <div>
                          <div className="font-semibold text-left">{m.label}</div>
                          <div className="text-xs" style={{ color: "var(--text-subtle)" }}>{m.speed} · {m.quality}</div>
                        </div>
                        <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>{m.credits} cr</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Settings toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-xs font-semibold w-full"
            style={{ color: "var(--text-muted)" }}>
            <Sliders size={13} />
            Paramètres avancés
            <ChevronDown size={12} className={`ml-auto transition-transform ${showSettings ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden">

                {/* Style */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Style</label>
                  <div className="flex flex-wrap gap-1.5">
                    {STYLES.map((s) => (
                      <button key={s}
                        onClick={() => setStyle(s)}
                        className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                        style={{
                          background:  style === s ? "var(--accent)" : "var(--bg-surface)",
                          borderColor: style === s ? "transparent"   : "var(--border)",
                          color:       style === s ? "#fff"           : "var(--text-muted)",
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Format</label>
                  <div className="space-y-1">
                    {SIZES.map((s) => (
                      <button key={s}
                        onClick={() => setSize(s)}
                        className="w-full text-left text-xs px-3 py-2 rounded-xl border transition-all"
                        style={{
                          background:  size === s ? "var(--accent)" : "var(--bg-surface)",
                          borderColor: size === s ? "transparent"   : "var(--border)",
                          color:       size === s ? "#fff"           : "var(--text-muted)",
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Generate button */}
        <div className="p-5 border-t" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={generate}
            disabled={!prompt.trim() || loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm text-white transition-all hover:opacity-90 disabled:opacity-50">
            <span style={{ background: "var(--accent)" }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl">
              {loading
                ? <><RefreshCw size={15} className="animate-spin" /> Génération en cours...</>
                : <><Sparkles size={15} /> Générer · {activeModel.credits} crédits</>}
            </span>
          </button>
        </div>
      </div>

      {/* Right — Canvas */}
      <div className="flex-1 overflow-y-auto p-6">
        {images.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: "var(--bg-surface)" }}>
              <ImageIcon size={32} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p className="font-black text-lg mb-1" style={{ color: "var(--text)" }}>Votre image apparaîtra ici</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Écrivez un prompt et cliquez sur Générer</p>
            </div>
          </motion.div>
        ) : (
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {loading && (
              <div className="rounded-2xl overflow-hidden aspect-square animate-pulse"
                style={{ background: "var(--bg-surface)" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <RefreshCw size={24} className="animate-spin" style={{ color: "var(--accent)" }} />
                </div>
              </div>
            )}
            {images.map((src, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden break-inside-avoid">
                <div className="aspect-square rounded-2xl"
                  style={{ background: `linear-gradient(135deg, var(--bg-surface), var(--accent))` }}>
                  {/* Real image: <img src={src} className="w-full h-full object-cover" /> */}
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={40} style={{ color: "rgba(255,255,255,0.4)" }} />
                  </div>
                </div>
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center transition-all hover:bg-white/30">
                    <Download size={14} color="white" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center transition-all hover:bg-white/30">
                    <Copy size={14} color="white" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center transition-all hover:bg-white/30">
                    <RefreshCw size={14} color="white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
