"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Megaphone, Palette, Image as ImageIcon, Plus,
  Sparkles, ChevronRight, Tag, Calendar, CheckCircle2,
  Target, Layers, Wand2,
} from "lucide-react";

const TABS = [
  { id: "campaigns", label: "Campagnes",  icon: Megaphone },
  { id: "brand",     label: "Brand DNA",  icon: Palette },
  { id: "moodboard", label: "Moodboards", icon: Layers },
  { id: "photoshoot",label: "Photoshoots",icon: ImageIcon },
];

const CAMPAIGNS = [
  { id: 1, name: "Lancement Produit Q2", status: "active",   channels: ["Instagram", "LinkedIn"], progress: 65 },
  { id: 2, name: "Campagne Ramadan",      status: "draft",    channels: ["Instagram", "Facebook"], progress: 20 },
  { id: 3, name: "Black Friday 2026",     status: "planned",  channels: ["Instagram", "X", "LinkedIn"], progress: 5 },
];

const MOODBOARDS = [
  { id: 1, name: "Été 2026",         images: 12, style: "Lumineux, nature" },
  { id: 2, name: "Brand Identity",   images: 8,  style: "Minimaliste, vert" },
  { id: 3, name: "Campagne Produit", images: 15, style: "Cinématique" },
];

const TONES = ["Professionnel", "Inspirant", "Décontracté", "Premium", "Audacieux", "Bienveillant"];
const AUDIENCES = ["18-25 ans", "25-35 ans", "35-50 ans", "Entrepreneurs", "Créateurs", "Marketeurs"];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  active:  { bg: "#2d9d6e18", color: "#2d9d6e", label: "Actif" },
  draft:   { bg: "var(--bg-surface)", color: "var(--text-subtle)", label: "Brouillon" },
  planned: { bg: "#d9770618", color: "#d97706", label: "Planifié" },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function CampaignPage() {
  const [tab, setTab]           = useState("campaigns");
  const [brandName, setBrandName]  = useState("Outio");
  const [brandDesc, setBrandDesc]  = useState("");
  const [brandTone, setBrandTone]  = useState("Professionnel");
  const [brandAudience, setBrandAudience] = useState("Entrepreneurs");
  const [brandColors, setBrandColors] = useState(["#6B9080", "#A4C3B2", "#1a2e25"]);
  const [generating, setGenerating] = useState(false);

  const generateDNA = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setBrandDesc("Outio est une plateforme IA professionnelle qui permet aux créateurs et entrepreneurs d'amplifier leur productivité. Notre ton est direct, inspirant et ancré dans l'action. Nous parlons à des professionnels ambitieux qui veulent aller plus vite sans sacrifier la qualité.");
    setGenerating(false);
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
          <button key={t.id}
            onClick={() => setTab(t.id)}
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
                    <div className="font-bold mb-1" style={{ color: "var(--text)" }}>{c.name}</div>
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
                    <div className="h-full rounded-full transition-all" style={{ background: "var(--accent)", width: `${c.progress}%` }} />
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

      {/* ── Brand DNA ────────────────────────────────────── */}
      {tab === "brand" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-5">
          {/* Left */}
          <div className="space-y-4">
            <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-5">
                <Target size={16} style={{ color: "var(--accent)" }} />
                <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Identité de marque</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Nom de la marque</label>
                  <input value={brandName} onChange={(e) => setBrandName(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Ton de voix</label>
                  <div className="flex flex-wrap gap-1.5">
                    {TONES.map((t) => (
                      <button key={t} onClick={() => setBrandTone(t)}
                        className="text-xs px-3 py-1.5 rounded-xl border font-medium transition-all"
                        style={brandTone === t
                          ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                          : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Audience cible</label>
                  <div className="flex flex-wrap gap-1.5">
                    {AUDIENCES.map((a) => (
                      <button key={a} onClick={() => setBrandAudience(a)}
                        className="text-xs px-3 py-1.5 rounded-xl border font-medium transition-all"
                        style={brandAudience === a
                          ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
                          : { background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Couleurs de marque</label>
                  <div className="flex gap-2">
                    {brandColors.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg border cursor-pointer"
                          style={{ background: c, borderColor: "var(--border)" }} />
                        <input value={c} onChange={(e) => {
                          const next = [...brandColors];
                          next[i] = e.target.value;
                          setBrandColors(next);
                        }} className="text-xs w-20 px-2 py-1 rounded-lg border bg-transparent outline-none"
                          style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={generateDNA} disabled={generating}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: "var(--accent)" }}>
                  {generating ? <><Wand2 size={14} className="animate-pulse" /> Génération...</> : <><Sparkles size={14} /> Générer le Brand DNA</>}
                </button>
              </div>
            </div>
          </div>

          {/* Right - Description */}
          <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={16} style={{ color: "var(--accent)" }} />
              <h3 className="font-black text-sm" style={{ color: "var(--text)" }}>Description générée</h3>
            </div>
            {brandDesc ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{brandDesc}</p>
                <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "var(--bg-surface)" }}>
                  <CheckCircle2 size={14} style={{ color: "#2d9d6e" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Brand DNA enregistré</span>
                </div>
              </motion.div>
            ) : (
              <div className="h-40 flex items-center justify-center rounded-2xl"
                style={{ background: "var(--bg-surface)", border: "2px dashed var(--border)" }}>
                <p className="text-sm" style={{ color: "var(--text-subtle)" }}>Remplissez le formulaire et générez votre Brand DNA</p>
              </div>
            )}
          </div>
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
                  <div key={i} className="rounded-lg" style={{
                    background: `hsl(${150 + i * 15}, ${40 - i * 3}%, ${60 + i * 5}%)`,
                    opacity: 0.7 + i * 0.05,
                  }} />
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
          className="rounded-3xl border p-8 text-center"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--bg-surface)" }}>
            <ImageIcon size={28} style={{ color: "var(--accent)" }} />
          </div>
          <h3 className="font-black text-lg mb-2" style={{ color: "var(--text)" }}>Photoshoots IA</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            Créez des shootings produit professionnels avec votre Brand DNA. Uploadez vos produits, choisissez un décor, laissez l&apos;IA faire le reste.
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
