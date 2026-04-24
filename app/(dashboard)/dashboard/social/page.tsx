"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, MessageCircle, Briefcase, Play, Globe,
  Plus, Send, Sparkles, Clock,
  Image as ImageIcon, Hash, BarChart3, CheckCircle2,
  Link as LinkIcon, type LucideIcon,
} from "lucide-react";

/* ── Platforms ─────────────────────────────────────────── */
const PLATFORMS: { id: string; label: string; icon: LucideIcon; color: string; connected: boolean }[] = [
  { id: "instagram",  label: "Instagram",  icon: Camera,         color: "#E1306C", connected: true  },
  { id: "twitter",    label: "X / Twitter",icon: MessageCircle,  color: "#1DA1F2", connected: false },
  { id: "linkedin",   label: "LinkedIn",   icon: Briefcase,      color: "#0077B5", connected: true  },
  { id: "facebook",   label: "Facebook",   icon: Globe,          color: "#1877F2", connected: false },
  { id: "youtube",    label: "YouTube",    icon: Play,           color: "#FF0000", connected: false },
];

const SCHEDULED = [
  { id: 1, platform: "instagram", text: "Nouvelle collection disponible ! 🌿 Découvrez nos dernières créations...", time: "Aujourd'hui 14:00", status: "scheduled" },
  { id: 2, platform: "linkedin",  text: "Retour sur notre dernier partenariat — 3 enseignements clés pour votre business...", time: "Demain 09:30",     status: "scheduled" },
  { id: 3, platform: "instagram", text: "Behind the scenes de notre shooting photo du mois ✨", time: "Mer. 10:00", status: "draft" },
];

const TONES = ["Professionnel", "Décontracté", "Inspirant", "Humoristique", "Éducatif", "Engageant"];

export default function SocialPage() {
  const [caption, setCaption]     = useState("");
  const [selected, setSelected]   = useState<string[]>(["instagram"]);
  const [tone, setTone]           = useState("Engageant");
  const [generating, setGenerating] = useState(false);
  const [tab, setTab]             = useState<"compose" | "scheduled" | "analytics">("compose");

  const togglePlatform = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const generateCaption = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setCaption(`✨ [Caption générée par Outio — ton : ${tone}]\n\nLe succès ne s'improvise pas, il se construit chaque jour avec méthode et passion. Découvrez comment notre approche unique transforme vos idées en résultats concrets. 💪\n\n#Innovation #Business #Créativité #Outio`);
    setGenerating(false);
  };

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Social Media</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Créez, planifiez et publiez sur tous vos réseaux.</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl text-white"
          style={{ background: "var(--accent)" }}>
          <Plus size={14} /> Nouveau post
        </button>
      </div>

      {/* Platforms */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-7">
        {PLATFORMS.map((p) => (
          <div key={p.id} className="rounded-2xl border p-4 flex flex-col items-center gap-2"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: p.connected ? `${p.color}18` : "var(--bg-surface)" }}>
              <p.icon size={18} style={{ color: p.connected ? p.color : "var(--text-subtle)" }} />
            </div>
            <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{p.label}</span>
            {p.connected
              ? <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: "#2d9d6e" }}>
                  <CheckCircle2 size={10} /> Connecté
                </span>
              : <button className="flex items-center gap-1 text-[10px] font-bold" style={{ color: "var(--accent)" }}>
                  <LinkIcon size={10} /> Connecter
                </button>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl mb-6 w-fit"
        style={{ background: "var(--bg-surface)" }}>
        {[
          { id: "compose",   label: "Composer" },
          { id: "scheduled", label: "Planifié" },
          { id: "analytics", label: "Stats" },
        ].map((t) => (
          <button key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
            style={tab === t.id
              ? { background: "var(--bg-card)", color: "var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
              : { color: "var(--text-muted)" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Compose */}
      {tab === "compose" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-5">
          {/* Left */}
          <div className="space-y-4">
            {/* Platform selector */}
            <div className="rounded-2xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <label className="text-[10px] font-black uppercase tracking-wider mb-3 block" style={{ color: "var(--text-subtle)" }}>
                Publier sur
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.filter((p) => p.connected).map((p) => (
                  <button key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all"
                    style={selected.includes(p.id)
                      ? { background: `${p.color}18`, borderColor: p.color, color: p.color }
                      : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <p.icon size={12} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div className="rounded-2xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] font-black uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>Caption</label>
                <div className="flex items-center gap-2">
                  <select value={tone} onChange={(e) => setTone(e.target.value)}
                    className="text-xs px-2 py-1 rounded-lg border bg-transparent outline-none"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    {TONES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <button onClick={generateCaption} disabled={generating}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl text-white transition-all hover:opacity-90"
                    style={{ background: "var(--accent)" }}>
                    <Sparkles size={11} />
                    {generating ? "..." : "IA"}
                  </button>
                </div>
              </div>
              <textarea rows={5} value={caption} onChange={(e) => setCaption(e.target.value)}
                placeholder="Rédigez votre caption ou générez-la avec l'IA..."
                className="w-full text-sm bg-transparent outline-none resize-none"
                style={{ color: "var(--text)" }} />
              <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <ImageIcon size={13} /> Média
                  </button>
                  <button className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Hash size={13} /> Hashtags
                  </button>
                </div>
                <span className="text-xs" style={{ color: caption.length > 2200 ? "#dc2626" : "var(--text-subtle)" }}>
                  {caption.length}/2200
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Preview */}
            <div className="rounded-2xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <label className="text-[10px] font-black uppercase tracking-wider mb-3 block" style={{ color: "var(--text-subtle)" }}>Aperçu</label>
              <div className="rounded-xl p-3 border" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full" style={{ background: "var(--accent)" }} />
                  <div>
                    <div className="text-xs font-bold" style={{ color: "var(--text)" }}>votre_compte</div>
                    <div className="text-[10px]" style={{ color: "var(--text-subtle)" }}>Maintenant</div>
                  </div>
                </div>
                <div className="aspect-square rounded-xl mb-3 flex items-center justify-center"
                  style={{ background: "var(--border)" }}>
                  <ImageIcon size={24} style={{ color: "var(--text-subtle)" }} />
                </div>
                <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text)" }}>
                  {caption || <span style={{ color: "var(--text-subtle)" }}>Votre caption apparaîtra ici...</span>}
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div className="rounded-2xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <label className="text-[10px] font-black uppercase tracking-wider mb-3 block" style={{ color: "var(--text-subtle)" }}>Publication</label>
              <div className="flex gap-2">
                <input type="datetime-local" className="flex-1 text-xs px-3 py-2 rounded-xl border bg-transparent outline-none"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }} />
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-[var(--bg-surface)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  <Clock size={14} /> Planifier
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "var(--accent)" }}>
                  <Send size={14} /> Publier
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scheduled */}
      {tab === "scheduled" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          {SCHEDULED.map((post) => {
            const platform = PLATFORMS.find((p) => p.id === post.platform)!;
            return (
              <div key={post.id} className="rounded-2xl border p-4 flex items-start gap-4"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${platform.color}18` }}>
                  <platform.icon size={16} style={{ color: platform.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed line-clamp-2 mb-1" style={{ color: "var(--text)" }}>{post.text}</p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-subtle)" }}>
                      <Clock size={11} /> {post.time}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={post.status === "scheduled"
                        ? { background: "#2d9d6e18", color: "#2d9d6e" }
                        : { background: "var(--bg-surface)", color: "var(--text-subtle)" }}>
                      {post.status === "scheduled" ? "Planifié" : "Brouillon"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Analytics placeholder */}
      {tab === "analytics" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border p-12 text-center"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <BarChart3 size={40} className="mx-auto mb-4" style={{ color: "var(--accent)", opacity: 0.4 }} />
          <p className="font-black text-lg mb-1" style={{ color: "var(--text)" }}>Analytics en cours de développement</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Connectez vos comptes pour voir vos statistiques.</p>
        </motion.div>
      )}
    </div>
  );
}
