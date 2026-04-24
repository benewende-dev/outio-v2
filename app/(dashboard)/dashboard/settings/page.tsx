"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Lock, Bell, Code2, Trash2, Save,
  Eye, EyeOff, CheckCircle2, Globe,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";

const TABS = [
  { id: "profile",  label: "Profil",       icon: User  },
  { id: "security", label: "Sécurité",      icon: Lock  },
  { id: "prefs",    label: "Préférences",   icon: Globe },
  { id: "api",      label: "API",           icon: Code2 },
];

export default function SettingsPage() {
  const [tab, setTab]           = useState("profile");
  const [saved, setSaved]       = useState(false);
  const [showKey, setShowKey]   = useState(false);
  const [name, setName]         = useState("Mon Compte");
  const [email, setEmail]       = useState("user@outio.app");
  const [bio, setBio]           = useState("");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifCredits, setNotifCredits] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Paramètres</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Gérez votre compte et vos préférences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl mb-7 w-fit" style={{ background: "var(--bg-surface)" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={tab === t.id
              ? { background: "var(--bg-card)", color: "var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
              : { color: "var(--text-muted)" }}>
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Profile ──────────────────────────────────────── */}
      {tab === "profile" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                style={{ background: "var(--accent)" }}>
                {name[0] || "U"}
              </div>
              <div>
                <button className="text-sm font-bold px-4 py-2 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  Changer la photo
                </button>
                <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>JPG ou PNG · Max 2 Mo</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Nom complet</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Adresse email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                  className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>Bio (optionnel)</label>
                <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)}
                  placeholder="Quelques mots sur vous..."
                  className="w-full text-sm px-3 py-2.5 rounded-xl border bg-transparent outline-none resize-none focus:border-[var(--accent)]"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }} />
              </div>
            </div>
          </div>

          <button onClick={save}
            className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}>
            {saved ? <><CheckCircle2 size={14} /> Enregistré !</> : <><Save size={14} /> Sauvegarder</>}
          </button>
        </motion.div>
      )}

      {/* ── Security ─────────────────────────────────────── */}
      {tab === "security" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h3 className="font-black text-sm mb-4" style={{ color: "var(--text)" }}>Changer le mot de passe</h3>
            {["Mot de passe actuel", "Nouveau mot de passe", "Confirmer le nouveau mot de passe"].map((label) => (
              <div key={label} className="mb-3">
                <label className="text-[10px] font-black uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-subtle)" }}>{label}</label>
                <div className="relative">
                  <input type={showKey ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full text-sm px-3 py-2.5 pr-10 rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }} />
                  <button onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-subtle)" }}>
                    {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            ))}
            <button onClick={save}
              className="mt-2 flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white"
              style={{ background: "var(--accent)" }}>
              {saved ? <><CheckCircle2 size={14} /> Enregistré !</> : "Mettre à jour"}
            </button>
          </div>

          <div className="rounded-2xl border p-4 flex items-center justify-between"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div>
              <div className="text-sm font-bold mb-0.5" style={{ color: "var(--text)" }}>Authentification à deux facteurs</div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Renforcez la sécurité de votre compte</p>
            </div>
            <button className="text-xs font-bold px-4 py-2 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
              style={{ borderColor: "var(--border)", color: "var(--accent)" }}>
              Activer
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Preferences ──────────────────────────────────── */}
      {tab === "prefs" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h3 className="font-black text-sm mb-5" style={{ color: "var(--text)" }}>Apparence</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text)" }}>Thème</div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Clair / Sauge / Noir</p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text)" }}>Langue</div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>FR / EN</p>
              </div>
              <LangToggle />
            </div>
          </div>

          <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h3 className="font-black text-sm mb-5" style={{ color: "var(--text)" }}>Notifications</h3>
            {[
              { label: "Emails de résumé hebdomadaire",  val: notifEmail,   set: setNotifEmail   },
              { label: "Alerte crédits bas (< 10%)",     val: notifCredits, set: setNotifCredits },
              { label: "Nouveautés et mises à jour",     val: notifUpdates, set: setNotifUpdates },
            ].map(({ label, val, set }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b last:border-b-0"
                style={{ borderColor: "var(--border)" }}>
                <span className="text-sm" style={{ color: "var(--text)" }}>{label}</span>
                <button onClick={() => set(!val)}
                  className="w-10 h-6 rounded-full transition-all relative"
                  style={{ background: val ? "var(--accent)" : "var(--border)" }}>
                  <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: val ? "calc(100% - 20px)" : "4px" }} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── API ──────────────────────────────────────────── */}
      {tab === "api" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h3 className="font-black text-sm mb-2" style={{ color: "var(--text)" }}>Clé API Outio</h3>
            <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
              Utilisez cette clé pour accéder à l&apos;API Outio depuis vos applications.
            </p>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center px-3 py-2.5 rounded-xl border font-mono text-xs"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-surface)" }}>
                {showKey ? "otk_live_sk_••••••••••••••••••••••••••" : "otk_live_sk_••••••••••••••••••••••••••"}
              </div>
              <button onClick={() => setShowKey(!showKey)}
                className="px-3 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button className="px-4 rounded-xl text-xs font-bold text-white"
                style={{ background: "var(--accent)" }}>
                Copier
              </button>
            </div>
            <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
              <span style={{ color: "var(--accent)" }}>Documentation API</span> disponible sur docs.outio.app
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-3xl border p-6" style={{ background: "var(--bg-card)", borderColor: "#dc262630" }}>
            <h3 className="font-black text-sm mb-2" style={{ color: "#dc2626" }}>Zone de danger</h3>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Ces actions sont irréversibles. Procédez avec prudence.
            </p>
            <button className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl border transition-all hover:bg-red-50"
              style={{ borderColor: "#dc262630", color: "#dc2626" }}>
              <Trash2 size={14} /> Supprimer mon compte
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
