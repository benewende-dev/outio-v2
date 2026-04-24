"use client";

import { useEffect, useRef, useState } from "react";
import { Sun, Leaf, Moon } from "lucide-react";

type Theme = "light" | "dark" | "noir";

const THEMES: { id: Theme; label: string; icon: typeof Sun; preview: string }[] = [
  { id: "light", label: "Clair",  icon: Sun,   preview: "#F6FFF8" },
  { id: "dark",  label: "Sauge",  icon: Leaf,  preview: "#111a16" },
  { id: "noir",  label: "Noir",   icon: Moon,  preview: "#0a0a0a" },
];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "noir");
  if (theme === "dark") root.classList.add("dark");
  if (theme === "noir") root.classList.add("noir");
  localStorage.setItem("outio-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("outio-theme") as Theme) ?? "light";
    setTheme(saved);
    applyTheme(saved);
    setMounted(true);
  }, []);

  // Fermer en cliquant ailleurs
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
    setOpen(false);
  };

  if (!mounted) return <div className="w-9 h-9" />;

  const current = THEMES.find((t) => t.id === theme)!;
  const Icon = current.icon;

  return (
    <div ref={ref} className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:scale-105"
        style={{
          background: "var(--bg-surface)",
          color: "var(--accent)",
          border: "1px solid var(--border)",
        }}
        aria-label="Changer le thème"
      >
        <Icon size={16} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-11 z-50 rounded-2xl overflow-hidden shadow-xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            minWidth: "140px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          {THEMES.map((t) => {
            const TIcon = t.icon;
            const isActive = t.id === theme;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:bg-[var(--bg-surface)] text-left"
                style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
              >
                {/* Dot couleur */}
                <span
                  className="w-4 h-4 rounded-full border flex-shrink-0"
                  style={{
                    background: t.preview,
                    borderColor: isActive ? "var(--accent)" : "var(--border-strong)",
                    boxShadow: isActive ? "0 0 0 2px var(--accent)" : "none",
                  }}
                />
                <TIcon size={14} />
                {t.label}
                {isActive && (
                  <span className="ml-auto text-xs" style={{ color: "var(--accent)" }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
