"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Music, FileText, Play, Square, Download, Sparkles, ChevronDown } from "lucide-react";

const TABS = [
  { id: "tts",           label: "Voix (TTS)",      icon: Mic },
  { id: "music",         label: "Musique",          icon: Music },
  { id: "transcription", label: "Transcription",   icon: FileText },
];

const VOICES = [
  { id: "rachel",  label: "Rachel",  lang: "FR", desc: "Voix féminine douce et professionnelle" },
  { id: "thomas",  label: "Thomas",  lang: "FR", desc: "Voix masculine claire, journalistique" },
  { id: "alice",   label: "Alice",   lang: "FR", desc: "Voix féminine jeune, dynamique" },
  { id: "antoine", label: "Antoine", lang: "FR", desc: "Voix masculine grave, authoritative" },
  { id: "sofia",   label: "Sofia",   lang: "EN", desc: "Female voice, warm and engaging" },
  { id: "james",   label: "James",   lang: "EN", desc: "Male voice, deep and confident" },
];

const MUSIC_STYLES = ["Pop", "Lo-fi", "Jazz", "Électronique", "Cinématique", "Afrobeats", "Acoustique", "Ambiance"];

export default function AudioPage() {
  const [tab, setTab]         = useState("tts");
  const [ttsText, setTtsText] = useState("");
  const [voice, setVoice]     = useState("rachel");
  const [musicPrompt, setMusicPrompt] = useState("");
  const [musicStyle, setMusicStyle]   = useState("Lo-fi");
  const [musicDuration, setMusicDuration] = useState(30);
  const [transcribeFile, setTranscribeFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [generated, setGenerated] = useState(false);

  const activeVoice = VOICES.find((v) => v.id === voice)!;

  const generate = async () => {
    if (loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setGenerated(true);
  };

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Audio IA</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Voix ultra-réalistes, musique générée, transcription.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl mb-8 w-fit"
        style={{ background: "var(--bg-surface)" }}>
        {TABS.map((t) => (
          <button key={t.id}
            onClick={() => { setTab(t.id); setGenerated(false); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={tab === t.id
              ? { background: "var(--bg-card)", color: "var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
              : { color: "var(--text-muted)" }}>
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* TTS */}
      {tab === "tts" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Text input */}
            <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Texte à lire</label>
              <textarea
                rows={6}
                value={ttsText}
                onChange={(e) => setTtsText(e.target.value)}
                placeholder="Entrez le texte que vous souhaitez convertir en voix..."
                className="w-full text-sm bg-transparent outline-none resize-none"
                style={{ color: "var(--text)" }}
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>{ttsText.length} caractères</span>
                <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>~{Math.ceil(ttsText.length / 200)} crédit(s)</span>
              </div>
            </div>

            {/* Voice selector */}
            <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <label className="text-[10px] font-black uppercase tracking-wider mb-3 block" style={{ color: "var(--text-subtle)" }}>Voix</label>
              <div className="space-y-2">
                {VOICES.map((v) => (
                  <button key={v.id}
                    onClick={() => setVoice(v.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left"
                    style={{
                      background:  voice === v.id ? "var(--bg-surface)" : "transparent",
                      borderColor: voice === v.id ? "var(--border-strong)" : "var(--border)",
                    }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                      style={{ background: "var(--accent)" }}>
                      {v.label[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold flex items-center gap-2" style={{ color: "var(--text)" }}>
                        {v.label}
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-black"
                          style={{ background: "var(--bg-surface)", color: "var(--text-subtle)" }}>{v.lang}</span>
                      </div>
                      <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{v.desc}</div>
                    </div>
                    {voice === v.id && <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate + Player */}
          <div className="flex items-center gap-3">
            <button onClick={generate} disabled={!ttsText.trim() || loading}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--accent)" }}>
              {loading ? <><Mic size={15} className="animate-pulse" /> Génération...</> : <><Sparkles size={15} /> Générer la voix</>}
            </button>

            {generated && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex items-center gap-3 rounded-2xl px-4 py-3 border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <button onClick={() => setPlaying(!playing)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent)" }}>
                  {playing ? <Square size={13} color="white" /> : <Play size={13} color="white" fill="white" />}
                </button>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: "var(--accent)" }}
                    animate={playing ? { width: ["0%", "100%"] } : { width: "0%" }}
                    transition={{ duration: 10, ease: "linear" }} />
                </div>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>0:10</span>
                <button className="p-1.5 rounded-lg transition-all hover:bg-[var(--bg-surface)]"
                  style={{ color: "var(--text-muted)" }}>
                  <Download size={13} />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Music */}
      {tab === "music" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
              Description de la musique
            </label>
            <textarea rows={3} value={musicPrompt} onChange={(e) => setMusicPrompt(e.target.value)}
              placeholder="Une mélodie lo-fi relaxante pour travailler, avec piano et beats doux..."
              className="w-full text-sm bg-transparent outline-none resize-none mb-4"
              style={{ color: "var(--text)" }} />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Style</label>
                <div className="flex flex-wrap gap-1.5">
                  {MUSIC_STYLES.map((s) => (
                    <button key={s} onClick={() => setMusicStyle(s)}
                      className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                      style={{
                        background:  musicStyle === s ? "var(--accent)" : "var(--bg-surface)",
                        borderColor: musicStyle === s ? "transparent" : "var(--border)",
                        color:       musicStyle === s ? "#fff" : "var(--text-muted)",
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
                  Durée — {musicDuration}s
                </label>
                <input type="range" min={15} max={180} step={15}
                  value={musicDuration} onChange={(e) => setMusicDuration(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]" />
                <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-subtle)" }}>
                  <span>15s</span><span>3 min</span>
                </div>
              </div>
            </div>
          </div>

          <button onClick={generate} disabled={!musicPrompt.trim() || loading}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--accent)" }}>
            {loading ? <><Music size={15} className="animate-pulse" /> Composition...</> : <><Sparkles size={15} /> Composer · {Math.ceil(musicDuration / 30) * 15} crédits</>}
          </button>

          {generated && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border p-4 flex items-center gap-3"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <button onClick={() => setPlaying(!playing)}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent)" }}>
                {playing ? <Square size={14} color="white" /> : <Play size={14} color="white" fill="white" />}
              </button>
              <div className="flex-1">
                <div className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>
                  {musicStyle} · {musicDuration}s
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: "var(--accent)" }}
                    animate={playing ? { width: ["0%", "100%"] } : { width: "0%" }}
                    transition={{ duration: musicDuration, ease: "linear" }} />
                </div>
              </div>
              <button className="p-2 rounded-xl hover:bg-[var(--bg-surface)] transition-colors"
                style={{ color: "var(--text-muted)" }}>
                <Download size={14} />
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Transcription */}
      {tab === "transcription" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div
            className="rounded-3xl border-2 border-dashed p-16 text-center cursor-pointer transition-all hover:border-[var(--accent)]"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); setTranscribeFile(e.dataTransfer.files[0]?.name ?? null); }}>
            <Mic size={40} className="mx-auto mb-4" style={{ color: "var(--accent)", opacity: 0.5 }} />
            <p className="font-bold mb-1" style={{ color: "var(--text)" }}>
              {transcribeFile ?? "Déposez un fichier audio ou vidéo"}
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>MP3, MP4, WAV, M4A · Max 500 Mo</p>
            <label className="cursor-pointer text-sm font-bold px-5 py-2.5 rounded-xl text-white inline-block"
              style={{ background: "var(--accent)" }}>
              Choisir un fichier
              <input type="file" accept="audio/*,video/*" className="hidden"
                onChange={(e) => setTranscribeFile(e.target.files?.[0]?.name ?? null)} />
            </label>
          </div>

          {transcribeFile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center justify-between rounded-2xl border p-4"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--bg-surface)" }}>
                  <FileText size={16} style={{ color: "var(--accent)" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{transcribeFile}</span>
              </div>
              <button onClick={generate} disabled={loading}
                className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}>
                {loading ? "Transcription..." : <><Sparkles size={14} /> Transcrire · 5 cr/min</>}
              </button>
            </motion.div>
          )}

          {generated && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border p-6"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>Transcription</span>
                <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl"
                  style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                  <Download size={11} /> Exporter
                </button>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                [La transcription de votre fichier audio apparaîtra ici. Configurez <code className="text-xs px-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>OPENWEBUI_URL</code> pour activer Whisper v3.]
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
