"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:scale-105"
      style={{
        background: "var(--bg-surface)",
        color: "var(--accent)",
        border: "1px solid var(--border)",
      }}
      aria-label="Changer le thème"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
