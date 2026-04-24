"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film, Tv, BookOpen, Video, Sparkles, Wand2,
  FileText, ChevronRight, Plus, Play, Clock,
  List, RefreshCw, Download, Layers, User,
  Clapperboard, ScanSearch,
} from "lucide-react";

/* ─── Types & Data ──────────────────────────────────────── */
const TABS = [
  { id: "film",        label: "Films",          icon: Film       },
  { id: "series",      label: "Séries",         icon: Tv         },
  { id: "doc",         label: "Documentaires",  icon: BookOpen   },
  { id: "ugc",         label: "UGC",            icon: Video      },
];

const FILM_GENRES    = ["Drame", "Thriller", "Comédie", "Romance", "Action", "Sci-Fi", "Horreur", "Historique", "Fantastique", "Biopic"];
const DOC_THEMES     = ["Société & Culture", "Nature & Environnement", "Technologie", "Histoire", "Portrait", "Investigation", "Art & Création", "Science", "Économie", "Sport"];
const UGC_FORMATS    = ["Témoignage client", "Unboxing produit", "Tutoriel 60s", "Review produit", "Day in the life", "Avant / Après", "FAQ réponses", "Behind the scenes"];
const SERIES_GENRES  = ["Série drama", "Sitcom", "Thriller", "Romance", "Comédie noire", "Policier", "Fantastique", "Réalité"];
const DURATIONS      = ["15 min", "30 min", "45 min", "60 min", "90 min", "120+ min"];
const SERIES_EPISODES = [1, 3, 6, 8, 10, 12, 13];
const LANGUAGES      = ["Français", "Anglais", "Wolof", "Lingala", "Swahili", "Bambara", "Arabe"];

type SceneType = { id: number; title: string; location: string; duration: string; desc: string };

const SAMPLE_SCENES: SceneType[] = [
  { id: 1, title: "Scène d'ouverture",      location: "Ext. Dakar — Aube",         duration: "3 min",  desc: "Plan large de la ville au lever du soleil. La caméra suit un jeune homme marchant vers son destin." },
  { id: 2, title: "Acte I — La rencontre",  location: "Int. Bureau — Jour",         duration: "5 min",  desc: "Dialogue tendu entre les deux protagonistes. Révélation partielle du conflit principal." },
  { id: 3, title: "Montée des tensions",    location: "Ext. Marché — Après-midi",   duration: "4 min",  desc: "Scène dynamique, montage cut rapide. La musique monte. Le personnage prend une décision." },
  { id: 4, title: "Point de bascule",       location: "Int. Appartement — Nuit",    duration: "6 min",  desc: "La vérité éclate. Scène émotionnelle intense. Pleurs, silence, départ." },
  { id: 5, title: "Résolution",             location: "Ext. Plage — Coucher",       duration: "4 min",  desc: "Réconciliation ou séparation définitive. Plan symbolique. La caméra s'éloigne lentement." },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const card = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" as const } },
};

function ScriptOutput({ scenes }: { scenes: SceneType[] }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-2">
      {scenes.map((scene) => (
        <motion.div key={scene.id} variants={card}
          className="rounded-2xl border p-4 flex items-start gap-4"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white flex-shrink-0"
            style={{ background: "var(--accent)" }}>{scene.id}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{scene.title}</span>
              <span className="text-[10px] flex-shrink-0 px-2 py-0.5 rounded-full"
                style={{ background: "var(--bg-surface)", color: "var(--text-subtle)" }}>{scene.duration}</span>
            </div>
            <div className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--accent)", opacity: 0.8 }}>{scene.location}</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{scene.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function StudioPage() {
  const [tab, setTab]           = useState("film");
  const [loading, setLoading]   = useState(false);
  const [generated, setGenerated] = useState(false);
  const [view, setView]         = useState<"form" | "script" | "production">("form");

  // Film
  const [filmTitle, setFilmTitle]   = useState("");
  const [filmGenre, setFilmGenre]   = useState("Drame");
  const [filmDuration, setFilmDuration] = useState("60 min");
  const [filmSynopsis, setFilmSynopsis] = useState("");
  const [filmLang, setFilmLang]     = useState("Français");

  // Séries
  const [seriesTitle, setSeriesTitle]   = useState("");
  const [seriesGenre, setSeriesGenre]   = useState("Série drama");
  const [seriesEp, setSeriesEp]         = useState(6);
  const [seriesSynopsis, setSeriesSynopsis] = useState("");

  // Doc
  const [docTitle, setDocTitle]     = useState("");
  const [docTheme, setDocTheme]     = useState("Société & Culture");
  const [docDuration, setDocDuration] = useState("45 min");
  const [docAngle, setDocAngle]     = useState("");

  // UGC
  const [ugcFormat, setUgcFormat]   = useState("Témoignage client");
  const [ugcProduct, setUgcProduct] = useState("");
  const [ugcTone, setUgcTone]       = useState("Authentique");
  const [ugcCount, setUgcCount]     = useState(3);

  const simulate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2500));
    setLoading(false);
    setGenerated(true);
    setView("script");
  };

  const switchTab = (id: string) => {
    setTab(id);
    setGenerated(false);
    setLoading(false);
    setView("form");
  };

  const credits = tab === "film" ? 80 : tab === "series" ? seriesEp * 20 : tab === "doc" ? 60 : ugcCount * 10;
  const currentTitle = tab === "film" ? filmTitle : tab === "series" ? seriesTitle : tab === "doc" ? docTitle : ugcProduct;

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1">
          <Clapperboard size={22} style={{ color: "var(--accent)" }} />
          <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>Studio IA</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Écrivez et produisez films, séries, documentaires et contenus UGC.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl mb-7 w-fit" style={{ background: "var(--bg-surface)" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => switchTab(t.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={tab === t.id
              ? { background: "var(--bg-card)", color: "var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
              : { color: "var(--text-muted)" }}>
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* View toggle (when script generated) */}
      {generated && (
        <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: "var(--bg-surface)" }}>
          {[
            { id: "form",       label: "Paramètres", icon: Layers    },
            { id: "script",     label: "Script",     icon: FileText  },
            { id: "production", label: "Production", icon: Play      },
          ].map((v) => (
            <button key={v.id} onClick={() => setView(v.id as typeof view)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={view === v.id
                ? { background: "var(--bg-card)", color: "var(--accent)" }
                : { color: "var(--text-muted)" }}>
              <v.icon size={11} />
              {v.label}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ── Script view ──────────────────────────────────── */}
        {view === "script" && generated && (
          <motion.div key="script-view"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black text-base" style={{ color: "var(--text)" }}>
                  {currentTitle || "Titre du projet"} — Script
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {tab === "series" ? `Saison 1 · ${seriesEp} épisodes` : tab === "ugc" ? `${ugcCount} vidéos générées` : filmDuration || docDuration}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={simulate}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  <RefreshCw size={11} /> Régénérer
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-white"
                  style={{ background: "var(--accent)" }}>
                  <Download size={11} /> Exporter PDF
                </button>
              </div>
            </div>
            <ScriptOutput scenes={SAMPLE_SCENES} />
          </motion.div>
        )}

        {/* ── Production view ───────────────────────────────── */}
        {view === "production" && generated && (
          <motion.div key="prod-view"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border p-8 text-center"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--bg-surface)" }}>
              <Play size={28} style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="font-black text-lg mb-2" style={{ color: "var(--text)" }}>Production vidéo</h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
              Votre script est prêt. La génération vidéo scène par scène sera disponible prochainement avec nos partenaires Sora, Kling et Runway.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Sora", "Kling AI", "Runway Gen-3", "Pika Labs"].map((tool) => (
                <span key={tool} className="text-xs font-bold px-3 py-1.5 rounded-xl"
                  style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>{tool}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Form views ───────────────────────────────────── */}
        {view === "form" && (
          <>
            {/* Film */}
            {tab === "film" && (
              <motion.div key="film"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2 mb-5">
                      <Film size={15} style={{ color: "var(--accent)" }} />
                      <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Concept du film</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Titre</label>
                        <input value={filmTitle} onChange={(e) => setFilmTitle(e.target.value)}
                          placeholder="ex. Les Héritiers de Dakar"
                          className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                          style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Genre</label>
                        <div className="flex flex-wrap gap-1.5">
                          {FILM_GENRES.map((g) => (
                            <button key={g} onClick={() => setFilmGenre(g)}
                              className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                              style={filmGenre === g
                                ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                                : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Durée</label>
                          <select value={filmDuration} onChange={(e) => setFilmDuration(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-xl border bg-transparent outline-none"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                            {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Langue</label>
                          <select value={filmLang} onChange={(e) => setFilmLang(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-xl border bg-transparent outline-none"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                            {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Synopsis</label>
                        <textarea rows={4} value={filmSynopsis} onChange={(e) => setFilmSynopsis(e.target.value)}
                          placeholder="Décrivez votre histoire en quelques lignes..."
                          className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none resize-none focus:border-[var(--accent)]"
                          style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <ScanSearch size={14} style={{ color: "var(--accent)" }} />
                      <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Ce qui sera généré</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        { icon: FileText, label: "Script complet scène par scène" },
                        { icon: List,     label: "Découpage technique + storyboard textuel" },
                        { icon: User,     label: "Fiches personnages détaillées" },
                        { icon: Clock,    label: `Timing estimé : ${filmDuration}` },
                        { icon: BookOpen, label: "Pitch document (PDF)" },
                        { icon: Sparkles, label: "Suggestions de cast & décors" },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2.5 py-1.5">
                          <Icon size={13} style={{ color: "var(--accent)", opacity: 0.7 }} />
                          <span className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={simulate} disabled={loading || !filmTitle.trim()}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "var(--accent)" }}>
                    {loading
                      ? <><RefreshCw size={15} className="animate-spin" /> Écriture en cours...</>
                      : <><Wand2 size={15} /> Écrire le script · {credits} cr</>}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Séries */}
            {tab === "series" && (
              <motion.div key="series"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid md:grid-cols-2 gap-5">
                <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <Tv size={15} style={{ color: "var(--accent)" }} />
                    <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Concept de la série</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Titre de la série</label>
                      <input value={seriesTitle} onChange={(e) => setSeriesTitle(e.target.value)}
                        placeholder="ex. Abidjan Vice, Lagos Dreams..."
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Genre</label>
                      <div className="flex flex-wrap gap-1.5">
                        {SERIES_GENRES.map((g) => (
                          <button key={g} onClick={() => setSeriesGenre(g)}
                            className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                            style={seriesGenre === g
                              ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                              : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
                        Nombre d'épisodes (saison 1) — {seriesEp} ép.
                      </label>
                      <div className="flex gap-2">
                        {SERIES_EPISODES.map((n) => (
                          <button key={n} onClick={() => setSeriesEp(n)}
                            className="w-9 h-9 rounded-xl text-xs font-bold border transition-all"
                            style={seriesEp === n
                              ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                              : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Synopsis</label>
                      <textarea rows={3} value={seriesSynopsis} onChange={(e) => setSeriesSynopsis(e.target.value)}
                        placeholder="L'arc narratif de la saison..."
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none resize-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <h3 className="font-black text-sm mb-3" style={{ color: "var(--text)" }}>Structure saison 1</h3>
                    <div className="space-y-1.5">
                      {Array.from({ length: Math.min(seriesEp, 5) }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 py-1.5">
                          <span className="text-xs font-bold w-16 flex-shrink-0"
                            style={{ color: "var(--text-subtle)" }}>Ép. {i + 1}</span>
                          <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--bg-surface)" }}>
                            <div className="h-full rounded-full" style={{ background: "var(--accent)", width: `${80 - i * 8}%` }} />
                          </div>
                        </div>
                      ))}
                      {seriesEp > 5 && (
                        <div className="text-xs text-center pt-1" style={{ color: "var(--text-subtle)" }}>
                          + {seriesEp - 5} épisodes supplémentaires
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={simulate} disabled={loading || !seriesTitle.trim()}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "var(--accent)" }}>
                    {loading
                      ? <><RefreshCw size={15} className="animate-spin" /> Écriture...</>
                      : <><Wand2 size={15} /> Écrire la série · {credits} cr</>}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Documentaires */}
            {tab === "doc" && (
              <motion.div key="doc"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid md:grid-cols-2 gap-5">
                <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <BookOpen size={15} style={{ color: "var(--accent)" }} />
                    <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Concept du documentaire</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Titre</label>
                      <input value={docTitle} onChange={(e) => setDocTitle(e.target.value)}
                        placeholder="ex. Bâtisseurs du Sahel"
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Thème</label>
                      <div className="flex flex-wrap gap-1.5">
                        {DOC_THEMES.map((t) => (
                          <button key={t} onClick={() => setDocTheme(t)}
                            className="text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition-all"
                            style={docTheme === t
                              ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                              : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Angle narratif</label>
                      <textarea rows={3} value={docAngle} onChange={(e) => setDocAngle(e.target.value)}
                        placeholder="Quelle histoire voulez-vous raconter ?"
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none resize-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Durée</label>
                      <select value={docDuration} onChange={(e) => setDocDuration(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border bg-transparent outline-none"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                        {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <h3 className="font-black text-sm mb-3" style={{ color: "var(--text)" }}>Ce qui sera inclus</h3>
                    <div className="space-y-2">
                      {[
                        "Narration complète avec voix off",
                        "Structure en actes",
                        "Questions d'interview suggérées",
                        "Liste de séquences B-roll",
                        "Textes d'intro & conclusion",
                        "Légendes et infographies",
                      ].map((t) => (
                        <div key={t} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                          <span className="text-sm" style={{ color: "var(--text-muted)" }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={simulate} disabled={loading || !docTitle.trim()}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "var(--accent)" }}>
                    {loading
                      ? <><RefreshCw size={15} className="animate-spin" /> Écriture...</>
                      : <><Wand2 size={15} /> Écrire le doc · {credits} cr</>}
                  </button>
                </div>
              </motion.div>
            )}

            {/* UGC */}
            {tab === "ugc" && (
              <motion.div key="ugc"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid md:grid-cols-2 gap-5">
                <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <Video size={15} style={{ color: "var(--accent)" }} />
                    <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Contenus UGC</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>Format</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {UGC_FORMATS.map((f) => (
                          <button key={f} onClick={() => setUgcFormat(f)}
                            className="text-xs px-3 py-2 rounded-xl border font-medium transition-all text-left"
                            style={ugcFormat === f
                              ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                              : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Produit / Marque</label>
                      <input value={ugcProduct} onChange={(e) => setUgcProduct(e.target.value)}
                        placeholder="ex. Crème Karité BioNature, App Outio..."
                        className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider mb-2 block" style={{ color: "var(--text-subtle)" }}>
                        Nombre de vidéos — {ugcCount}
                      </label>
                      <input type="range" min={1} max={10} step={1}
                        value={ugcCount} onChange={(e) => setUgcCount(Number(e.target.value))}
                        className="w-full accent-[var(--accent)]" />
                      <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-subtle)" }}>
                        <span>1</span><span>10</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <h3 className="font-black text-sm mb-3" style={{ color: "var(--text)" }}>Aperçu</h3>
                    <div className="space-y-2.5">
                      {[
                        { label: "Format", value: ugcFormat },
                        { label: "Vidéos", value: `${ugcCount}x scripts` },
                        { label: "Crédit", value: `${credits} crédits` },
                        { label: "Durée", value: "15 – 60s / vidéo" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between py-1.5 border-b last:border-b-0"
                          style={{ borderColor: "var(--border)" }}>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                          <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={simulate} disabled={loading || !ugcProduct.trim()}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "var(--accent)" }}>
                    {loading
                      ? <><RefreshCw size={15} className="animate-spin" /> Génération...</>
                      : <><Sparkles size={15} /> Générer les scripts UGC · {credits} cr</>}
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
