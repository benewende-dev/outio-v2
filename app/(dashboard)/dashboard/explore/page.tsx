"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles, TrendingUp, Users, Star, ArrowRight } from "lucide-react";

const TRENDING_PROMPTS = [
  { id: 1, title: "Portrait professionnel studio",    uses: 2100, cat: "Images"   },
  { id: 2, title: "Caption Instagram viral",          uses: 1560, cat: "Social"   },
  { id: 3, title: "Article de blog SEO complet",      uses: 1240, cat: "Rédaction"},
  { id: 4, title: "Stratégie de contenu mensuelle",   uses: 987,  cat: "Marketing"},
  { id: 5, title: "Thread LinkedIn 8 posts",          uses: 893,  cat: "Social"   },
];

const FEATURED = [
  { id: 1, author: "Sofia M.",   type: "image",  title: "Shooting produit cosmétique",   likes: 248, gradient: "135deg, #6B9080, #A4C3B2" },
  { id: 2, author: "Koffi A.",   type: "video",  title: "Teaser lancement startup",       likes: 189, gradient: "135deg, #4e8a78, #7aaa96" },
  { id: 3, author: "Aya D.",     type: "image",  title: "Portrait CEO lumière naturelle", likes: 312, gradient: "135deg, #111a16, #6B9080" },
  { id: 4, author: "Marc T.",    type: "image",  title: "Logo minimaliste SaaS",          likes: 156, gradient: "135deg, #263c2e, #A4C3B2" },
  { id: 5, author: "Fatou N.",   type: "audio",  title: "Jingle podcast 30s",             likes: 94,  gradient: "135deg, #5a9e8a, #CCE3DE" },
  { id: 6, author: "Ibrahim K.", type: "image",  title: "Affiche événement culturel",     likes: 271, gradient: "135deg, #4a7d6e, #EAF4F4" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const card = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function ExplorePage() {
  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Compass size={20} style={{ color: "var(--accent)" }} />
          <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>Explorer</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Découvrez les créations de la communauté Outio.
        </p>
      </div>

      {/* Stats banner */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border p-6 mb-8 flex flex-col sm:flex-row items-center gap-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <div className="flex-1 text-center sm:text-left">
          <div className="text-3xl font-black mb-1" style={{ color: "var(--accent)" }}>+14 000</div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>créations cette semaine</div>
        </div>
        <div className="w-px h-10 hidden sm:block" style={{ background: "var(--border)" }} />
        <div className="flex-1 text-center">
          <div className="text-3xl font-black mb-1" style={{ color: "var(--accent)" }}>+2 300</div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>créateurs actifs</div>
        </div>
        <div className="w-px h-10 hidden sm:block" style={{ background: "var(--border)" }} />
        <div className="flex-1 text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-end gap-1.5 mb-1">
            <Sparkles size={16} style={{ color: "var(--accent)" }} />
            <span className="text-sm font-bold" style={{ color: "var(--text)" }}>Communauté</span>
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>Afrique & monde entier</div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-7">
        {/* Featured creations */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star size={15} style={{ color: "var(--accent)" }} />
              <h2 className="font-black text-base" style={{ color: "var(--text)" }}>Créations en vedette</h2>
            </div>
            <button className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--accent)" }}>
              Voir tout <ArrowRight size={11} />
            </button>
          </div>

          <motion.div variants={stagger} initial="hidden" animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FEATURED.map((item) => (
              <motion.div key={item.id} variants={card}
                className="group rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: "var(--border)" }}>
                <div className="aspect-square relative"
                  style={{ background: `linear-gradient(${item.gradient})` }}>
                  <div className="absolute inset-0 flex items-end p-2.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1 text-white">
                      <Star size={11} fill="white" />
                      <span className="text-[10px] font-bold">{item.likes}</span>
                    </div>
                  </div>
                </div>
                <div className="p-2.5" style={{ background: "var(--bg-card)" }}>
                  <div className="text-xs font-bold truncate mb-0.5" style={{ color: "var(--text)" }}>{item.title}</div>
                  <div className="text-[10px]" style={{ color: "var(--text-subtle)" }}>{item.author}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trending prompts */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} style={{ color: "var(--accent)" }} />
            <h2 className="font-black text-base" style={{ color: "var(--text)" }}>Prompts tendance</h2>
          </div>
          <div className="space-y-2">
            {TRENDING_PROMPTS.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border p-3.5 flex items-center gap-3 cursor-pointer transition-all hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <span className="text-sm font-black w-5 text-center flex-shrink-0"
                  style={{ color: i < 3 ? "var(--accent)" : "var(--text-subtle)" }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>{p.title}</div>
                  <div className="text-[10px]" style={{ color: "var(--text-subtle)" }}>{p.cat} · {p.uses.toLocaleString()} fois</div>
                </div>
                <ArrowRight size={12} style={{ color: "var(--text-subtle)" }} />
              </motion.div>
            ))}
          </div>

          {/* Community CTA */}
          <div className="mt-5 rounded-2xl border p-4 text-center"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
            <Users size={20} className="mx-auto mb-2" style={{ color: "var(--accent)", opacity: 0.7 }} />
            <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>Rejoignez la communauté</p>
            <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>Discord, forum, partages et collaborations.</p>
            <button className="text-xs font-bold px-4 py-2 rounded-xl text-white w-full"
              style={{ background: "var(--accent)" }}>
              Rejoindre le Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
