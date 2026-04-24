"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, Music, FileText, Play, Square, Download, Sparkles,
  Radio, Disc3, Copy, Upload, Wand2, Plus, Trash2, MicOff,
  Volume2, AudioLines, ListMusic,
} from "lucide-react";

const TABS = [
  { id: "tts",       label: "Voix",         icon: Mic        },
  { id: "clone",     label: "Clone vocal",  icon: AudioLines },
  { id: "podcast",   label: "Podcast",      icon: Radio      },
  { id: "music",     label: "Musique",      icon: Music      },
  { id: "album",     label: "Album",        icon: Disc3      },
  { id: "transcription", label: "Transcrire", icon: FileText },
];

const VOICES = [
  { id: "rachel",  label: "Rachel",  lang: "FR", desc: "Féminine, douce et professionnelle",  gender: "F" },
  { id: "thomas",  label: "Thomas",  lang: "FR", desc: "Masculine, claire et journalistique", gender: "M" },
  { id: "alice",   label: "Alice",   lang: "FR", desc: "Féminine, jeune et dynamique",         gender: "F" },
  { id: "antoine", label: "Antoine", lang: "FR", desc: "Masculine, grave et autoritaire",      gender: "M" },
  { id: "sofia",   label: "Sofia",   lang: "EN", desc: "Female, warm and engaging",            gender: "F" },
  { id: "james",   label: "James",   lang: "EN", desc: "Male, deep and confident",             gender: "M" },
];

const MUSIC_STYLES = ["Pop", "Lo-fi", "Jazz", "Électronique", "Cinématique", "Afrobeats", "Acoustique", "Ambiance", "Hip-hop", "Gospel", "Reggae", "Classique"];
const PODCAST_FORMATS = ["Solo", "Interview 2 personnes", "Panel 3+ personnes", "Narration"];
const ALBUM_GENRES = ["Pop", "Afrobeats", "R&B / Soul", "Rap / Hip-hop", "Jazz", "Lo-fi", "Gospel", "Électronique", "Acoustique", "Classique"];

type Track = { id: number; title: string; duration: string; playing: boolean };

const fadeY = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } } };

function AudioPlayer({ title, duration, accent = false }: { title: string; duration: string; accent?: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-3 rounded-2xl border p-3.5"
      style={{ background: accent ? "var(--bg-surface)" : "var(--bg-card)", borderColor: "var(--border)" }}>
      <button onClick={() => setPlaying(!playing)}
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--accent)" }}>
        {playing ? <Square size={12} color="white" /> : <Play size={12} color="white" fill="white" />}
      </button>
      <div className="flex-1">
        <div className="text-xs font-semibold mb-1.5 truncate" style={{ color: "var(--text)" }}>{title}</div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <motion.div className="h-full rounded-full" style={{ background: "var(--accent)" }}
            animate={playing ? { width: ["0%", "100%"] } : { width: "12%" }}
            transition={{ duration: playing ? 15 : 0.3, ease: "linear" }} />
        </div>
      </div>
      <span className="text-[10px] flex-shrink-0" style={{ color: "var(--text-subtle)" }}>{duration}</span>
      <button className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] transition-colors" style={{ color: "var(--text-muted)" }}>
        <Download size={12} />
      </button>
    </div>
  );
}

export default function AudioPage() {
  const [tab, setTab]       = useState("tts");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  // TTS
  const [ttsText, setTtsText]   = useState("");
  const [voice, setVoice]       = useState("rachel");

  // Clone vocal
  const [cloneFile, setCloneFile]   = useState<string | null>(null);
  const [cloneName, setCloneName]   = useState("");
  const [cloneText, setCloneText]   = useState("");

  // Podcast
  const [podcastTopic, setPodcastTopic]   = useState("");
  const [podcastFormat, setPodcastFormat] = useState("Solo");
  const [podcastDuration, setPodcastDuration] = useState(10);

  // Music
  const [musicPrompt, setMusicPrompt] = useState("");
  const [musicStyle, setMusicStyle]   = useState("Lo-fi");
  const [musicDuration, setMusicDuration] = useState(30);

  // Album
  const [albumTitle, setAlbumTitle]   = useState("");
  const [albumGenre, setAlbumGenre]   = useState("Afrobeats");
  const [albumTracks, setAlbumTracks] = useState(6);
  const [albumMood, setAlbumMood]     = useState("");

  // Transcription
  const [transcribeFile, setTranscribeFile] = useState<string | null>(null);

  const simulate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2200));
    setLoading(false);
    setGenerated(true);
  };

  const switchTab = (id: string) => {
    setTab(id);
    setGenerated(false);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Audio & Musique</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Voix, podcast, musique, album, clone vocal et transcription.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl mb-8 overflow-x-auto"
        style={{ background: "var(--bg-surface)" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => switchTab(t.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0"
            style={tab === t.id
              ? { background: "var(--bg-card)", color: "var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
              : { color: "var(--text-muted)" }}>
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── TTS ──────────────────────────────────────────── */}
        {tab === "tts" && (
          <motion.div key="tts" variants={fadeY} initial="hidden" animate="visible" className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Texte à lire</label>
                <textarea rows={7} value={ttsText} onChange={(e) => setTtsText(e.target.value)}
                  placeholder="Entrez le texte à convertir en voix ultra-réaliste..."
                  className="w-full text-sm bg-transparent outline-none resize-none"
                  style={{ color: "var(--text)" }} />
                <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                  <span className="text-xs" style={{ color: "var(--text-subtle)" }}>{ttsText.length} caractères</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>~{Math.max(1, Math.ceil(ttsText.length / 200))} crédit(s)</span>
                </div>
              </div>

              <div className="rounded-3xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <label className="text-[10px] font-black uppercase tracking-wider mb-3 block" style={{ color: "var(--text-subtle)" }}>Choisir une voix</label>
                <div className="space-y-1.5">
                  {VOICES.map((v) => (
                    <button key={v.id} onClick={() => setVoice(v.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all text-left"
                      style={{
                        background:  voice === v.id ? "var(--bg-surface)" : "transparent",
                        borderColor: voice === v.id ? "var(--border-strong)" : "var(--border)",
                      }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                        style={{ background: "var(--accent)", opacity: v.gender === "F" ? 1 : 0.75 }}>
                        {v.label[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: "var(--text)" }}>
                          {v.label}
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-black"
                            style={{ background: "var(--bg-surface)", color: "var(--text-subtle)" }}>{v.lang}</span>
                        </div>
                        <div className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>{v.desc}</div>
                      </div>
                      {voice === v.id && <Volume2 size={12} style={{ color: "var(--accent)" }} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={simulate} disabled={!ttsText.trim() || loading}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--accent)" }}>
                {loading ? <><Mic size={15} className="animate-pulse" /> Synthèse en cours...</> : <><Sparkles size={15} /> Générer la voix</>}
              </button>
            </div>
            {generated && <AudioPlayer title={`Voix — ${VOICES.find(v => v.id === voice)?.label}`} duration="0:14" />}
          </motion.div>
        )}

        {/* ── Clone vocal ──────────────────────────────────── */}
        {tab === "clone" && (
          <motion.div key="clone" variants={fadeY} initial="hidden" animate="visible" className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Upload */}
              <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <AudioLines size={15} style={{ color: "var(--accent)" }} />
                  <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Entraîner ma voix</h3>
                </div>
                <div
                  className="rounded-2xl border-2 border-dashed p-8 text-center mb-4 cursor-pointer transition-all hover:border-[var(--accent)]"
                  style={{ borderColor: "var(--border)" }}>
                  <Upload size={28} className="mx-auto mb-2" style={{ color: "var(--accent)", opacity: 0.5 }} />
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>
                    {cloneFile ?? "Uploadez un échantillon vocal"}
                  </p>
                  <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>MP3 / WAV · 30s min · 5 min max</p>
                  <label className="text-xs font-bold px-4 py-2 rounded-xl text-white inline-block cursor-pointer"
                    style={{ background: "var(--accent)" }}>
                    Choisir un fichier
                    <input type="file" accept="audio/*" className="hidden"
                      onChange={(e) => setCloneFile(e.target.files?.[0]?.name ?? null)} />
                  </label>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Nom du clone vocal</label>
                  <input value={cloneName} onChange={(e) => setCloneName(e.target.value)}
                    placeholder="ex. Ma voix, Voix client, Narrateur..."
                    className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                </div>
              </div>

              {/* Generate from clone */}
              <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 size={15} style={{ color: "var(--accent)" }} />
                  <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Générer avec ce clone</h3>
                </div>
                <textarea rows={6} value={cloneText} onChange={(e) => setCloneText(e.target.value)}
                  placeholder="Texte à lire avec votre voix clonée..."
                  className="w-full text-sm bg-transparent outline-none resize-none mb-4"
                  style={{ color: "var(--text)" }} />
                <div className="p-3 rounded-xl text-xs mb-4" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
                  Le clonage vocal utilise l&apos;IA pour reproduire les caractéristiques uniques de votre voix. Réservé à votre usage propre.
                </div>
                <button onClick={simulate} disabled={!cloneFile || !cloneText.trim() || loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "var(--accent)" }}>
                  {loading ? <><AudioLines size={14} className="animate-pulse" /> Clonage...</> : <><Sparkles size={14} /> Générer · 20 crédits</>}
                </button>
              </div>
            </div>
            {generated && <AudioPlayer title={`Clone — ${cloneName || "Ma voix"}`} duration="0:22" />}
          </motion.div>
        )}

        {/* ── Podcast ──────────────────────────────────────── */}
        {tab === "podcast" && (
          <motion.div key="podcast" variants={fadeY} initial="hidden" animate="visible" className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Radio size={15} style={{ color: "var(--accent)" }} />
                    <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Studio Podcast</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Sujet / Titre de l'épisode</label>
                      <input value={podcastTopic} onChange={(e) => setPodcastTopic(e.target.value)}
                        placeholder="ex. L'IA va-t-elle remplacer les créateurs ?"
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Format</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {PODCAST_FORMATS.map((f) => (
                          <button key={f} onClick={() => setPodcastFormat(f)}
                            className="text-xs px-3 py-2 rounded-xl border font-medium transition-all text-left"
                            style={podcastFormat === f
                              ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                              : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
                        Durée cible — {podcastDuration} min
                      </label>
                      <input type="range" min={3} max={60} step={1}
                        value={podcastDuration} onChange={(e) => setPodcastDuration(Number(e.target.value))}
                        className="w-full accent-[var(--accent)]" />
                      <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-subtle)" }}>
                        <span>3 min</span><span>60 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border p-6 flex flex-col" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <ListMusic size={15} style={{ color: "var(--accent)" }} />
                  <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Ce qui sera généré</h3>
                </div>
                <div className="space-y-2.5 flex-1">
                  {[
                    "Script complet de l'épisode",
                    "Intro et outro avec musique",
                    "Voix IA pour chaque intervenant",
                    "Montage automatique",
                    "Notes d'épisode (show notes)",
                    "Chapitres & timestamps",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={simulate} disabled={!podcastTopic.trim() || loading}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "var(--accent)" }}>
                  {loading ? <><Radio size={14} className="animate-pulse" /> Production...</> : <><Sparkles size={14} /> Produire l'épisode · {podcastDuration * 5} cr</>}
                </button>
              </div>
            </div>
            {generated && (
              <div className="space-y-2">
                <AudioPlayer title={`Podcast — ${podcastTopic || "Épisode"} (intro)`} duration="0:30" />
                <AudioPlayer title={`Podcast — ${podcastTopic || "Épisode"} (épisode complet)`} duration={`${podcastDuration}:00`} />
              </div>
            )}
          </motion.div>
        )}

        {/* ── Music ────────────────────────────────────────── */}
        {tab === "music" && (
          <motion.div key="music" variants={fadeY} initial="hidden" animate="visible" className="space-y-5">
            <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Description de la musique</label>
              <textarea rows={3} value={musicPrompt} onChange={(e) => setMusicPrompt(e.target.value)}
                placeholder="Une mélodie lo-fi relaxante pour travailler, avec piano et beats doux..."
                className="w-full text-sm bg-transparent outline-none resize-none mb-5"
                style={{ color: "var(--text)" }} />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Style / Genre</label>
                  <div className="flex flex-wrap gap-1.5">
                    {MUSIC_STYLES.map((s) => (
                      <button key={s} onClick={() => setMusicStyle(s)}
                        className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                        style={musicStyle === s
                          ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                          : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
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

            <button onClick={simulate} disabled={!musicPrompt.trim() || loading}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--accent)" }}>
              {loading ? <><Music size={15} className="animate-pulse" /> Composition...</> : <><Sparkles size={15} /> Composer · {Math.ceil(musicDuration / 30) * 15} cr</>}
            </button>
            {generated && <AudioPlayer title={`${musicStyle} · ${musicDuration}s`} duration={`0:${musicDuration}`} />}
          </motion.div>
        )}

        {/* ── Album ────────────────────────────────────────── */}
        {tab === "album" && (
          <motion.div key="album" variants={fadeY} initial="hidden" animate="visible" className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Disc3 size={15} style={{ color: "var(--accent)" }} />
                  <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Créer un album</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Titre de l'album</label>
                    <input value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)}
                      placeholder="ex. Lumière d'Afrique, Night Drive..."
                      className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Genre</label>
                    <div className="flex flex-wrap gap-1.5">
                      {ALBUM_GENRES.map((g) => (
                        <button key={g} onClick={() => setAlbumGenre(g)}
                          className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                          style={albumGenre === g
                            ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                            : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Ambiance / Concept</label>
                    <textarea rows={2} value={albumMood} onChange={(e) => setAlbumMood(e.target.value)}
                      placeholder="Décrivez l'univers de votre album..."
                      className="w-full text-sm bg-transparent outline-none resize-none px-3 py-2.5 rounded-xl border focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
                      Nombre de pistes — {albumTracks}
                    </label>
                    <input type="range" min={3} max={16} step={1}
                      value={albumTracks} onChange={(e) => setAlbumTracks(Number(e.target.value))}
                      className="w-full accent-[var(--accent)]" />
                    <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-subtle)" }}>
                      <span>3</span><span>16</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <ListMusic size={15} style={{ color: "var(--accent)" }} />
                  <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Tracklist générée</h3>
                </div>
                {generated ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                    {Array.from({ length: albumTracks }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b last:border-b-0"
                        style={{ borderColor: "var(--border)" }}>
                        <span className="text-xs w-5 text-right flex-shrink-0" style={{ color: "var(--text-subtle)" }}>{i + 1}</span>
                        <span className="flex-1 text-sm truncate" style={{ color: "var(--text)" }}>
                          {["Intro", "Lever du jour", "Freestyle", "Night Mode", "Nostalgie", "On s'envole", "Flow libre", "Outro", "Bonus", "Interlude", "Skit", "Freestyle II", "Lumière", "Soleil couchant", "Rétrospective", "Épilogue"][i]}
                        </span>
                        <span className="text-[10px] flex-shrink-0" style={{ color: "var(--text-subtle)" }}>
                          {2 + Math.floor(Math.random() * 3)}:{String(Math.floor(Math.random() * 60)).padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="h-40 flex items-center justify-center rounded-2xl"
                    style={{ background: "var(--bg-surface)", border: "2px dashed var(--border)" }}>
                    <p className="text-sm" style={{ color: "var(--text-subtle)" }}>La tracklist apparaîtra ici</p>
                  </div>
                )}
                <button onClick={simulate} disabled={!albumTitle.trim() || loading}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "var(--accent)" }}>
                  {loading ? <><Disc3 size={14} className="animate-pulse" /> Production...</> : <><Sparkles size={14} /> Produire l'album · {albumTracks * 30} cr</>}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Transcription ────────────────────────────────── */}
        {tab === "transcription" && (
          <motion.div key="transcription" variants={fadeY} initial="hidden" animate="visible" className="space-y-5">
            <div
              className="rounded-3xl border-2 border-dashed p-16 text-center cursor-pointer transition-all hover:border-[var(--accent)]"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); setTranscribeFile(e.dataTransfer.files[0]?.name ?? null); }}>
              <MicOff size={40} className="mx-auto mb-4" style={{ color: "var(--accent)", opacity: 0.5 }} />
              <p className="font-bold mb-1" style={{ color: "var(--text)" }}>{transcribeFile ?? "Déposez un fichier audio ou vidéo"}</p>
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
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--bg-surface)" }}>
                    <FileText size={16} style={{ color: "var(--accent)" }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{transcribeFile}</span>
                </div>
                <button onClick={simulate} disabled={loading}
                  className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                  style={{ background: "var(--accent)" }}>
                  {loading ? "Transcription..." : <><Sparkles size={14} /> Transcrire · 5 cr/min</>}
                </button>
              </motion.div>
            )}

            {generated && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>Transcription</span>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl"
                      style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
                      <Copy size={11} /> Copier
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl"
                      style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                      <Download size={11} /> Exporter
                    </button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  [La transcription de votre fichier apparaîtra ici — timestamps inclus.
                  Configurez <code className="text-xs px-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>OPENWEBUI_URL</code> pour activer Whisper v3.]
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
