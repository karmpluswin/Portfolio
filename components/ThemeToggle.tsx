"use client";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useClickSound } from "@/hooks/soundcn/use-click-sound";

const THEME_STORAGE_KEY = "portfolio-color-theme";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage can be unavailable in private or restricted contexts.
  }
}

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [click] = useClickSound();

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Use light mode" : "Use dark mode"}
      aria-pressed={theme === "dark"}
      onPointerDown={click}
      onClick={toggleTheme}
      className={`inline-flex size-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] transition-colors hover:border-[var(--color-muted)] ${className ?? ""}`}
    >
      <MoonIcon className="hidden size-4 [html.dark_&]:block" />
      <SunMediumIcon className="hidden size-4 [html.light_&]:block" />
    </button>
  );
}
