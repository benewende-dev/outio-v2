"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Copy, Check, Bookmark, Plus, BookOpen, Sparkles } from "lucide-react";

const CATEGORIES = ["Tous", "Rédaction", "Marketing", "Business", "Code", "Images", "SEO", "Email", "Social"];

const PROMPTS = [
  { id: 1, cat: "Rédaction",  title: "Article de blog SEO",          desc: "Génère un article complet et optimisé SEO sur [sujet] pour une audience de [cible].",                                           uses: 1240, saved: true  },
  { id: 2, cat: "Marketing",  title: "Stratégie de contenu",          desc: "Crée un plan de contenu mensuel pour [marque] sur [plateforme] avec [objectif] comme objectif principal.",                       uses: 987,  saved: false },
  { id: 3, cat: "Email",      title: "Séquence d'onboarding",         desc: "Rédige une séquence de 5 emails d'onboarding pour [produit] destinée à [type d'utilisateur].",                                  uses: 876,  saved: true  },
  { id: 4, cat: "Business",   title: "Pitch deck executif",           desc: "Génère le contenu de 10 slides pour un pitch deck présentant [startup] à des investisseurs. Inclure le problème, solution et traction.", uses: 743,  saved: false },
  { id: 5, cat: "Social",     title: "Caption Instagram viral",       desc: "Écris 5 variations de captions engageantes pour une publication Instagram sur [sujet] avec un appel à l'action.",                uses: 1560, saved: false },
  { id: 6, cat: "Code",       title: "Revue de code",                 desc: "Analyse ce code [langage] et identifie les bugs, problèmes de performance et mauvaises pratiques. Propose des corrections.",      uses: 634,  saved: true  },
  { id: 7, cat: "Images",     title: "Portrait professionnel",        desc: "Portrait d'une femme/homme d'affaires [description physique], costume élégant, fond neutre studio, éclairage Rembrandt, photorealistic.", uses: 2100, saved: false },
  { id: 8, cat: "SEO",        title: "Meta description optimisée",    desc: "Rédige 3 variations de meta descriptions (150-160 caractères) pour une page sur [sujet], incluant le mot-clé [keyword].",       uses: 445,  saved: false },
  { id: 9, cat: "Marketing",  title: "Analyse concurrentielle",       desc: "Réalise une analyse SWOT complète de [concurrent] par rapport à [votre entreprise] dans le marché de [secteur].",               uses: 389,  saved: true  },
  { id: 10, cat: "Rédaction", title: "Newsletter hebdomadaire",       desc: "Rédige une newsletter engageante de 400 mots sur [thème] pour une audience de [profil], avec un ton [ton] et un CTA vers [action].", uses: 672, saved: false },
  { id: 11, cat: "Business",  title: "Proposition commerciale",       desc: "Crée une proposition commerciale persuasive pour [service/produit] destinée à [type de client], mettant en avant [avantages].",  uses: 521,  saved: false },
  { id: 12, cat: "Social",    title: "Thread LinkedIn viral",         desc: "Écris un thread LinkedIn de 8 posts sur [insight] dans [industrie], commençant par un hook accrocheur et finissant par un CTA.",  uses: 893,  saved: true  },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const card = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function PromptsPage() {
  const [cat, setCat]         = useState("Tous");
  const [search, setSearch]   = useState("");
  const [copied, setCopied]   = useState<number | null>(null);
  const [saved, setSaved]     = useState<Set<number>>(new Set(PROMPTS.filter(p => p.saved).map(p => p.id)));

  const filtered = PROMPTS.filter((p) => {
    const matchCat    = cat === "Tous" || p.cat === cat;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const copy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleSave = (id: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text)" }}>Bibliothèque de Prompts</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Prompts professionnels prêts à l&apos;emploi.</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl text-white"
          style={{ background: "var(--accent)" }}>
          <Plus size={14} /> Créer un prompt
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-subtle)" }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un prompt..."
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border bg-transparent outline-none focus:border-[var(--accent)]"
          style={{ borderColor: "var(--border)", color: "var(--text)" }} />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-7">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border transition-all"
            style={cat === c
              ? { background: "var(--accent)", borderColor: "transparent", color: "#fff" }
              : { background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Saved section */}
      {saved.size > 0 && cat === "Tous" && !search && (
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <Bookmark size={14} style={{ color: "var(--accent)" }} />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>Sauvegardés</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {PROMPTS.filter((p) => saved.has(p.id)).map((p) => (
              <div key={p.id} className="flex-shrink-0 rounded-2xl border p-3 w-52"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="text-xs font-bold mb-1 truncate" style={{ color: "var(--text)" }}>{p.title}</div>
                <div className="text-[10px] mb-2 truncate" style={{ color: "var(--text-muted)" }}>{p.cat}</div>
                <button onClick={() => copy(p.id, p.desc)}
                  className="flex items-center gap-1 text-[10px] font-bold" style={{ color: "var(--accent)" }}>
                  {copied === p.id ? <><Check size={10} /> Copié</> : <><Copy size={10} /> Copier</>}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <motion.div variants={stagger} initial="hidden" animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((p) => (
          <motion.div key={p.id} variants={card} layout
            className="rounded-2xl border p-5 flex flex-col gap-3 transition-all hover:border-[var(--border-strong)]"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            {/* Top */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                  {p.cat}
                </span>
              </div>
              <button onClick={() => toggleSave(p.id)}
                className="flex-shrink-0 transition-colors"
                style={{ color: saved.has(p.id) ? "var(--accent)" : "var(--text-subtle)" }}>
                <Bookmark size={14} fill={saved.has(p.id) ? "var(--accent)" : "none"} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text)" }}>{p.title}</h3>
              <p className="text-xs leading-relaxed line-clamp-3" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
              <span className="text-[10px]" style={{ color: "var(--text-subtle)" }}>
                <Sparkles size={9} className="inline mr-0.5" />{p.uses.toLocaleString()} utilisations
              </span>
              <button onClick={() => copy(p.id, p.desc)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                style={{ background: "var(--bg-surface)", color: "var(--accent)" }}>
                {copied === p.id
                  ? <><Check size={11} /> Copié !</>
                  : <><Copy size={11} /> Copier</>}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <BookOpen size={36} className="mx-auto mb-3" style={{ color: "var(--accent)", opacity: 0.3 }} />
          <p className="font-bold" style={{ color: "var(--text-muted)" }}>Aucun prompt pour « {search} »</p>
        </div>
      )}
    </div>
  );
}
