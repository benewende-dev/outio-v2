"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon, Video, Mic, Download,
  Trash2, ExternalLink, Search, LayoutGrid, List,
} from "lucide-react";

type ItemType = "image" | "video" | "audio";

const FILTERS: { id: "all" | ItemType; label: string; icon: typeof ImageIcon }[] = [
  { id: "all",   label: "Tout",    icon: LayoutGrid },
  { id: "image", label: "Images",  icon: ImageIcon  },
  { id: "video", label: "Vidéos",  icon: Video      },
  { id: "audio", label: "Audio",   icon: Mic        },
];

const MOCK_ITEMS = [
  ...Array.from({ length: 6 },  (_, i) => ({ id: `img-${i}`,  type: "image" as ItemType, title: `Image ${i + 1}`,  model: "Flux 2 Pro",    date: "Aujourd'hui",  size: "1:1" })),
  ...Array.from({ length: 3 },  (_, i) => ({ id: `vid-${i}`,  type: "video" as ItemType, title: `Vidéo ${i + 1}`,  model: "Runway Gen-4",  date: "Hier",         size: "16:9" })),
  ...Array.from({ length: 4 },  (_, i) => ({ id: `aud-${i}`,  type: "audio" as ItemType, title: `Audio ${i + 1}`,  model: "ElevenLabs v3", date: "Cette semaine", size: "—" })),
];

const TYPE_COLORS: Record<ItemType, string> = {
  image: "var(--accent)",
  video: "#d97706",
  audio: "#7c3aed",
};

const TYPE_ICONS: Record<ItemType, typeof ImageIcon> = {
  image: ImageIcon,
  video: Video,
  audio: Mic,
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const card = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function GalleryPage() {
  const [filter, setFilter]   = useState<"all" | ItemType>("all");
  const [search, setSearch]   = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const items = MOCK_ITEMS.filter((item) => {
    const matchType   = filter === "all" || item.type === filter;
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Galerie</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {MOCK_ITEMS.length} créations · {MOCK_ITEMS.filter(i => i.type === "image").length} images · {MOCK_ITEMS.filter(i => i.type === "video").length} vidéos · {MOCK_ITEMS.filter(i => i.type === "audio").length} audios
          </p>
        </div>
        {selected.size > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>{selected.size} sélectionné(s)</span>
            <button className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              <Download size={12} /> Télécharger
            </button>
            <button onClick={() => setSelected(new Set())}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border"
              style={{ borderColor: "#dc262630", color: "#dc2626" }}>
              <Trash2 size={12} /> Supprimer
            </button>
          </motion.div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Filter tabs */}
        <div className="flex gap-1 p-1 rounded-2xl" style={{ background: "var(--bg-surface)" }}>
          {FILTERS.map((f) => (
            <button key={f.id}
              onClick={() => setFilter(f.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={filter === f.id
                ? { background: "var(--bg-card)", color: "var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                : { color: "var(--text-muted)" }}>
              <f.icon size={13} />
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-subtle)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border bg-transparent outline-none"
              style={{ borderColor: "var(--border)", color: "var(--text)" }} />
          </div>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--bg-surface)" }}>
            <button onClick={() => setViewMode("grid")}
              className="p-1.5 rounded-lg transition-all"
              style={{ background: viewMode === "grid" ? "var(--bg-card)" : "transparent", color: viewMode === "grid" ? "var(--accent)" : "var(--text-muted)" }}>
              <LayoutGrid size={14} />
            </button>
            <button onClick={() => setViewMode("list")}
              className="p-1.5 rounded-lg transition-all"
              style={{ background: viewMode === "list" ? "var(--bg-card)" : "transparent", color: viewMode === "list" ? "var(--accent)" : "var(--text-muted)" }}>
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {viewMode === "grid" ? (
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => {
              const Icon = TYPE_ICONS[item.type];
              const isSelected = selected.has(item.id);
              return (
                <motion.div key={item.id} variants={card} layout
                  onClick={() => toggleSelect(item.id)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all"
                  style={{ borderColor: isSelected ? "var(--accent)" : "transparent" }}>
                  {/* Thumbnail */}
                  <div className="aspect-square flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, var(--bg-surface), ${TYPE_COLORS[item.type]}22)` }}>
                    <Icon size={28} style={{ color: TYPE_COLORS[item.type], opacity: 0.5 }} />
                  </div>
                  {/* Selected overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(107,144,128,0.25)" }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: "var(--accent)" }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Hover overlay */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 gap-1">
                      <button onClick={(e) => { e.stopPropagation(); }}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/20 backdrop-blur text-white text-[10px] font-semibold">
                        <Download size={11} /> DL
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); }}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur">
                        <ExternalLink size={11} color="white" />
                      </button>
                    </div>
                  )}
                  {/* Type badge */}
                  <div className="absolute top-2 left-2 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full"
                    style={{ background: TYPE_COLORS[item.type], color: "#fff" }}>
                    {item.type}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = TYPE_ICONS[item.type];
            return (
              <motion.div key={item.id} layout
                className="flex items-center gap-4 rounded-xl border p-3"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${TYPE_COLORS[item.type]}18` }}>
                  <Icon size={16} style={{ color: TYPE_COLORS[item.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{item.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-subtle)" }}>{item.model} · {item.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] transition-colors" style={{ color: "var(--text-muted)" }}>
                    <Download size={13} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] transition-colors" style={{ color: "var(--text-muted)" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {items.length === 0 && (
        <div className="py-24 text-center">
          <ImageIcon size={40} className="mx-auto mb-3" style={{ color: "var(--accent)", opacity: 0.3 }} />
          <p className="font-bold" style={{ color: "var(--text-muted)" }}>Aucune création trouvée</p>
        </div>
      )}
    </div>
  );
}
