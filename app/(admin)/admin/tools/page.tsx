"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GripVertical, Eye, EyeOff, RotateCcw, Save,
  CheckCircle2, ArrowUp, ArrowDown,
} from "lucide-react";
import { DEFAULT_TOOLS, loadTools, saveTools, TOOL_ICONS, type ToolConfig } from "@/lib/data/tools";

export default function AdminToolsPage() {
  const [tools, setTools]     = useState<ToolConfig[]>([]);
  const [saved, setSaved]     = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTools(loadTools());
    setMounted(true);
  }, []);

  const toggle = (id: string) => {
    setTools((prev) => prev.map((t) => t.id === id ? { ...t, visible: !t.visible } : t));
  };

  const move = (id: string, dir: -1 | 1) => {
    setTools((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx    = sorted.findIndex((t) => t.id === id);
      const target = idx + dir;
      if (target < 0 || target >= sorted.length) return prev;
      const updated = [...sorted];
      [updated[idx].order, updated[target].order] = [updated[target].order, updated[idx].order];
      return updated;
    });
  };

  const updateField = (id: string, field: "label" | "desc" | "tag", value: string) => {
    setTools((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
  };

  const reset = () => {
    setTools(DEFAULT_TOOLS);
    setSaved(false);
  };

  const handleSave = () => {
    saveTools(tools);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sorted = [...tools].sort((a, b) => a.order - b.order);

  if (!mounted) return (
    <div className="p-8">
      <div className="h-8 w-48 rounded-xl animate-pulse" style={{ background: "var(--bg-surface)" }} />
    </div>
  );

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Outils — Landing page</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Activez, masquez, réordonnez et éditez les cartes affichées sur la landing page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reset}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
            <RotateCcw size={12} /> Réinitialiser
          </button>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl font-bold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}>
            {saved
              ? <><CheckCircle2 size={13} /> Enregistré</>
              : <><Save size={13} /> Enregistrer</>}
          </button>
        </div>
      </div>

      {/* Info note */}
      <div className="rounded-xl p-3.5 border mb-6 text-xs"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
        💾 Les modifications sont sauvegardées localement. La synchronisation avec la base de données sera disponible prochainement.
      </div>

      {/* Tool list */}
      <div className="space-y-2">
        <AnimatePresence>
          {sorted.map((t, idx) => {
            const Icon = TOOL_ICONS[t.iconName];
            const isEditing = editing === t.id;

            return (
              <motion.div key={t.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  borderColor: t.visible ? "var(--border)" : "var(--border)",
                  opacity: t.visible ? 1 : 0.55,
                }}>
                <div className="flex items-center gap-3 p-4">
                  {/* Drag handle (cosmetic) */}
                  <GripVertical size={14} style={{ color: "var(--text-subtle)" }} className="flex-shrink-0 cursor-grab" />

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--bg-surface)" }}>
                    {Icon && <Icon size={15} style={{ color: "var(--accent)" }} />}
                  </div>

                  {/* Label + tag */}
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <input
                        autoFocus
                        value={t.label}
                        onChange={(e) => updateField(t.id, "label", e.target.value)}
                        onBlur={() => setEditing(null)}
                        className="text-sm font-bold bg-transparent border-b outline-none w-full"
                        style={{ color: "var(--text)", borderColor: "var(--accent)" }}
                      />
                    ) : (
                      <button
                        onClick={() => setEditing(t.id)}
                        className="text-sm font-bold text-left hover:underline decoration-dotted"
                        style={{ color: "var(--text)" }}>
                        {t.label}
                      </button>
                    )}
                    <div className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>{t.desc}</div>
                  </div>

                  {/* Tag pill */}
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--bg-surface)", color: "var(--text-subtle)" }}>
                    {t.tag}
                  </span>

                  {/* Order controls */}
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => move(t.id, -1)} disabled={idx === 0}
                      className="p-1 rounded transition-colors hover:bg-[var(--bg-surface)] disabled:opacity-30"
                      style={{ color: "var(--text-muted)" }}>
                      <ArrowUp size={11} />
                    </button>
                    <button onClick={() => move(t.id, 1)} disabled={idx === sorted.length - 1}
                      className="p-1 rounded transition-colors hover:bg-[var(--bg-surface)] disabled:opacity-30"
                      style={{ color: "var(--text-muted)" }}>
                      <ArrowDown size={11} />
                    </button>
                  </div>

                  {/* Visibility toggle */}
                  <button onClick={() => toggle(t.id)}
                    className="p-2 rounded-xl transition-all hover:bg-[var(--bg-surface)]"
                    style={{ color: t.visible ? "var(--accent)" : "var(--text-subtle)" }}
                    title={t.visible ? "Masquer" : "Afficher"}>
                    {t.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </div>

                {/* Expanded edit row */}
                {isEditing && (
                  <div className="px-4 pb-4 pt-0 border-t" style={{ borderColor: "var(--border)" }}>
                    <label className="block text-[10px] font-black uppercase tracking-wider mb-1.5 mt-3"
                      style={{ color: "var(--text-subtle)" }}>Description</label>
                    <input
                      value={t.desc}
                      onChange={(e) => updateField(t.id, "desc", e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }}
                    />
                    <label className="block text-[10px] font-black uppercase tracking-wider mb-1.5 mt-3"
                      style={{ color: "var(--text-subtle)" }}>Tag</label>
                    <input
                      value={t.tag}
                      onChange={(e) => updateField(t.id, "tag", e.target.value)}
                      className="w-48 text-sm px-3 py-2 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Save bottom */}
      <div className="mt-6 flex justify-end">
        <button onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}>
          {saved ? <><CheckCircle2 size={15} /> Enregistré !</> : <><Save size={15} /> Sauvegarder les modifications</>}
        </button>
      </div>
    </div>
  );
}
