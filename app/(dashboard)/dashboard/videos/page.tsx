"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Sparkles, Play, Download, RefreshCw, ChevronDown, Check, Clock } from "lucide-react";

const VIDEO_MODELS = [
  { id: "sora-2",       label: "Sora 2",          studio: "OpenAI",    credits: 80, duration: "5-20s", quality: "Cinématique" },
  { id: "kling-3",      label: "Kling 3.0",       studio: "Kuaishou",  credits: 40, duration: "5-10s", quality: "Réaliste" },
  { id: "veo-3",        label: "Veo 3",           studio: "Google",    credits: 60, duration: "5-8s",  quality: "Ultra HD" },
  { id: "runway-gen4",  label: "Runway Gen-4.5",  studio: "Runway",    credits: 30, duration: "4-10s", quality: "Créatif" },
  { id: "minimax-v1",   label: "MiniMax Video-01", studio: "MiniMax",  credits: 20, duration: "6s",    quality: "Standard" },
  { id: "wan-2-1",      label: "Wan 2.1",         studio: "Alibaba",   credits: 15, duration: "4-8s",  quality: "Budget" },
];

const MOTIONS = ["Lent et cinématique", "Dynamique", "Panoramique", "Zoom avant", "Zoom arrière", "Statique"];
const STYLES  = ["Réaliste", "Cinématique", "Animation 3D", "Stop-motion", "Peinture animée"];

export default function VideosPage() {
  const [prompt, setPrompt]     = useState("");
  const [model, setModel]       = useState("runway-gen4");
  const [motion_, setMotion]    = useState("Lent et cinématique");
  const [style, setStyle]       = useState("Cinématique");
  const [loading, setLoading]   = useState(false);
  const [videos, setVideos]     = useState<{ id: string; status: "done" | "processing" }[]>([]);
  const [modelOpen, setModelOpen] = useState(false);

  const activeModel = VIDEO_MODELS.find((m) => m.id === model)!;

  const generate = async () => {
    if (!prompt.trim() || loading) return;
    const newId = Math.random().toString(36).slice(2);
    setVideos((prev) => [{ id: newId, status: "processing" }, ...prev]);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 4000));
    setVideos((prev) => prev.map((v) => v.id === newId ? { ...v, status: "done" } : v));
    setLoading(false);
  };

  return (
    <div className="flex h-full" style={{ background: "var(--bg)" }}>

      {/* Left — Controls */}
      <div className="w-80 flex-shrink-0 flex flex-col border-r overflow-y-auto"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-1">
            <Video size={16} style={{ color: "var(--accent)" }} />
            <h2 className="font-black text-sm" style={{ color: "var(--text)" }}>Génération vidéo</h2>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Transformez vos idées en vidéos IA</p>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Prompt */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Prompt vidéo</label>
            <textarea rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)}
              placeholder="Un lion marchant fièrement au coucher du soleil dans la savane, mouvement lent cinématique..."
              className="w-full text-sm px-3 py-3 rounded-xl border bg-transparent outline-none resize-none focus:border-[var(--accent)] transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text)" }} />
          </div>

          {/* Model */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Modèle</label>
            <div className="relative">
              <button onClick={() => setModelOpen(!modelOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm"
                style={{ borderColor: "var(--border)", background: "var(--bg-surface)", color: "var(--text)" }}>
                <div>
                  <span className="font-semibold">{activeModel.label}</span>
                  <span className="text-xs ml-2" style={{ color: "var(--text-subtle)" }}>{activeModel.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>{activeModel.credits} cr/s</span>
                  <ChevronDown size={13} style={{ color: "var(--text-muted)" }} />
                </div>
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
                    {VIDEO_MODELS.map((m) => (
                      <button key={m.id} onClick={() => { setModel(m.id); setModelOpen(false); }}
                        className="w-full flex items-start justify-between px-4 py-3 text-sm hover:bg-[var(--bg-surface)] transition-colors"
                        style={{ color: m.id === model ? "var(--accent)" : "var(--text)" }}>
                        <div className="text-left">
                          <div className="font-semibold">{m.label}</div>
                          <div className="text-xs" style={{ color: "var(--text-subtle)" }}>{m.studio} · {m.quality}</div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>{m.credits} cr</span>
                          {m.id === model && <Check size={12} style={{ color: "var(--accent)" }} />}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Motion */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Mouvement</label>
            <div className="flex flex-wrap gap-1.5">
              {MOTIONS.map((m) => (
                <button key={m} onClick={() => setMotion(m)}
                  className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                  style={{
                    background:  motion_ === m ? "var(--accent)" : "var(--bg-surface)",
                    borderColor: motion_ === m ? "transparent" : "var(--border)",
                    color:       motion_ === m ? "#fff" : "var(--text-muted)",
                  }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Style</label>
            <div className="flex flex-wrap gap-1.5">
              {STYLES.map((s) => (
                <button key={s} onClick={() => setStyle(s)}
                  className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                  style={{
                    background:  style === s ? "var(--accent)" : "var(--bg-surface)",
                    borderColor: style === s ? "transparent" : "var(--border)",
                    color:       style === s ? "#fff" : "var(--text-muted)",
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate */}
        <div className="p-5 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="rounded-xl p-3 mb-3 text-xs"
            style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
            <Clock size={11} className="inline mr-1" />
            Génération estimée : <strong>1–3 minutes</strong>
          </div>
          <button onClick={generate} disabled={!prompt.trim() || loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--accent)" }}>
            {loading
              ? <><RefreshCw size={15} className="animate-spin" /> En cours...</>
              : <><Sparkles size={15} /> Générer · {activeModel.credits} cr</>}
          </button>
        </div>
      </div>

      {/* Right — Gallery */}
      <div className="flex-1 overflow-y-auto p-6">
        {videos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: "var(--bg-surface)" }}>
              <Video size={32} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p className="font-black text-lg mb-1" style={{ color: "var(--text)" }}>Vos vidéos apparaîtront ici</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Écrivez un prompt et lancez la génération</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => (
              <motion.div key={v.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group rounded-2xl overflow-hidden border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="aspect-video flex items-center justify-center relative"
                  style={{ background: "linear-gradient(135deg, var(--bg-surface), var(--accent))" }}>
                  {v.status === "processing" ? (
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw size={24} className="animate-spin" style={{ color: "rgba(255,255,255,0.7)" }} />
                      <span className="text-xs text-white/70">Génération en cours...</span>
                    </div>
                  ) : (
                    <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/60 transition-colors">
                      <Play size={20} color="white" fill="white" />
                    </button>
                  )}
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                      {v.status === "processing" ? "En cours de génération..." : "Vidéo générée"}
                    </div>
                    <div className="text-[10px]" style={{ color: "var(--text-subtle)" }}>{activeModel.label}</div>
                  </div>
                  {v.status === "done" && (
                    <button className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
                      style={{ color: "var(--text-muted)" }}>
                      <Download size={13} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
