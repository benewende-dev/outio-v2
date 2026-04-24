"use client";

import { useState } from "react";

export function LangToggle() {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  return (
    <button
      onClick={() => setLang(lang === "fr" ? "en" : "fr")}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
      style={{
        background: "var(--bg-surface)",
        color: "var(--accent)",
        border: "1px solid var(--border)",
        letterSpacing: "0.05em",
      }}
      aria-label="Changer la langue"
    >
      <span>{lang === "fr" ? "🇫🇷" : "🇬🇧"}</span>
      <span>{lang === "fr" ? "FR" : "EN"}</span>
    </button>
  );
}
