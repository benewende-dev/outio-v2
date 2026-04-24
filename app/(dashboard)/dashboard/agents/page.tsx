"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

/* ── Data ─────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "creation", label: "Création & Contenu", color: "#6B9080",
    agents: [
      { id: "penelope", name: "Penelope", role: "Rédaction & Copywriting",     desc: "Articles, scripts, emails, slogans — elle écrit tout mieux que vous." },
      { id: "dante",    name: "Dante",    role: "Scénarios & Storytelling",    desc: "Histoires, podcasts, pitch decks, narratifs de marque." },
      { id: "echo",     name: "Echo",     role: "Podcast & Scripts",           desc: "Scripts podasts, intros, transitions, show notes." },
      { id: "pixel",    name: "Pixel",    role: "Design & Direction artistique",desc: "Briefs créatifs, moodboards, guidelines visuelles." },
    ],
  },
  {
    id: "marketing", label: "Marketing & Growth", color: "#5a9e8a",
    agents: [
      { id: "nova",   name: "Nova",   role: "Stratégie Marketing",    desc: "Plans marketing, positionnement, analyse de marché." },
      { id: "soshie", name: "Soshie", role: "Social Media",           desc: "Calendrier éditorial, captions, hashtags, stratégie." },
      { id: "emmie",  name: "Emmie",  role: "Email Marketing",        desc: "Séquences d'emails, newsletters, A/B testing." },
      { id: "max",    name: "Max",    role: "Publicité Payante",      desc: "Copies ads, ciblage, optimisation Meta & Google." },
      { id: "adria",  name: "Adria",  role: "Campagnes Ads",          desc: "Stratégie full-funnel, créatifs, reporting." },
      { id: "scout",  name: "Scout",  role: "SEO & Référencement",    desc: "Audits, mots-clés, contenus optimisés, backlinks." },
    ],
  },
  {
    id: "business", label: "Business & Finance", color: "#4e8a78",
    agents: [
      { id: "buddy",    name: "Buddy",    role: "Sales & Prospection",  desc: "Scripts de vente, cold emails, objections, closing." },
      { id: "finn",     name: "Finn",     role: "Finance & Budget",     desc: "Prévisions, analyses de rentabilité, tableaux de bord." },
      { id: "atlas",    name: "Atlas",    role: "Opérations & Process", desc: "SOPs, workflows, optimisation des processus." },
      { id: "theo",     name: "Theo",     role: "Juridique & RGPD",     desc: "Contrats, CGU, politique de confidentialité." },
      { id: "luna",     name: "Luna",     role: "RH & Recrutement",     desc: "Fiches de poste, onboarding, culture d'entreprise." },
      { id: "guardian", name: "Guardian", role: "Conformité & Audit",   desc: "Vérifications réglementaires, audits internes." },
    ],
  },
  {
    id: "tech", label: "Tech & Automatisation", color: "#7a9e90",
    agents: [
      { id: "devvy",  name: "Devvy",  role: "Développement & Code",    desc: "Code, debug, revue, documentation, tests unitaires." },
      { id: "rex",    name: "Rex",    role: "Automatisation & APIs",   desc: "Zapier, Make, n8n, scripts Python, intégrations." },
      { id: "dexter", name: "Dexter", role: "Data & Analyse",          desc: "SQL, visualisations, insights, rapports de données." },
      { id: "iris",   name: "Iris",   role: "Deep Research",           desc: "Veille, synthèses, rapports de recherche approfondis." },
    ],
  },
  {
    id: "client", label: "Client & Support", color: "#A4C3B2",
    agents: [
      { id: "cassie", name: "Cassie", role: "Support Client 24/7",       desc: "FAQ, tickets, chatbot, escalades intelligentes." },
      { id: "cleo",   name: "Cleo",   role: "Service Après-Vente",       desc: "Remboursements, réclamations, fidélisation." },
      { id: "zara",   name: "Zara",   role: "E-Commerce",               desc: "Fiches produit, cross-sell, abandon de panier." },
      { id: "marc",   name: "Marc",   role: "Traduction 50+ langues",    desc: "Traduction professionnelle avec contexte culturel." },
      { id: "aria",   name: "Aria",   role: "Assistant Personnel",       desc: "Agenda, emails, recherches, tâches quotidiennes." },
      { id: "hugo",   name: "Hugo",   role: "Relations Presse",          desc: "Communiqués, pitchs médias, gestion d'image." },
      { id: "sofia",  name: "Sofia",  role: "Branding & Identité",      desc: "Charte graphique, ton de voix, cohérence de marque." },
      { id: "lena",   name: "Lena",   role: "Formation & Pédagogie",    desc: "Cours, quiz, e-learning, supports pédagogiques." },
      { id: "vibe",   name: "Vibe",   role: "Communauté & Discord",     desc: "Animation, modération, engagement communautaire." },
    ],
  },
];

const ALL_AGENTS = CATEGORIES.flatMap((c) =>
  c.agents.map((a) => ({ ...a, category: c.id, categoryLabel: c.label, color: c.color }))
);

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const card = {
  hidden:  { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
};

/* ── Page ─────────────────────────────────────────────── */
export default function AgentsPage() {
  const [search, setSearch]     = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = ALL_AGENTS.filter((a) => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === "all" || a.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Agents IA</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Des experts spécialisés qui travaillent pour vous, 24h/24.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-subtle)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un agent..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[{ id: "all", label: "Tous" }, ...CATEGORIES.map(c => ({ id: c.id, label: c.label.split(" ")[0] }))].map((f) => (
            <button key={f.id}
              onClick={() => setCatFilter(f.id)}
              className="text-xs font-semibold px-3 py-2 rounded-xl border transition-all"
              style={{
                background:   catFilter === f.id ? "var(--accent)" : "var(--bg-card)",
                borderColor:  catFilter === f.id ? "transparent"   : "var(--border)",
                color:        catFilter === f.id ? "#fff"           : "var(--text-muted)",
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((agent) => (
          <motion.div key={agent.id} variants={card} layout>
            <Link href={`/dashboard/agents/${agent.id}`}
              className="group rounded-2xl p-5 border flex flex-col gap-3 transition-all hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:shadow-md block"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>

              {/* Avatar + category */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black text-white flex-shrink-0"
                  style={{ background: agent.color }}>
                  {agent.name[0]}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{ background: "var(--bg-surface)", color: "var(--text-subtle)" }}>
                  {agent.categoryLabel.split(" ")[0]}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="font-bold text-sm mb-0.5" style={{ color: "var(--text)" }}>{agent.name}</div>
                <div className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>{agent.role}</div>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>{agent.desc}</p>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--accent)" }}>
                <Zap size={11} /> Lancer <ArrowRight size={11} />
              </div>
            </Link>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <p className="font-bold" style={{ color: "var(--text-muted)" }}>Aucun agent trouvé pour « {search} »</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
