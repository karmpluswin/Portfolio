"use client";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useClickSound } from "@/hooks/soundcn/use-click-sound";

const THEME_STORAGE_KEY = "portfolio:theme";

function updateTheme(nextDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", nextDark);
  root.classList.toggle("light", !nextDark);
}

function persistTheme(nextDark: boolean) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextDark ? "dark" : "light");
  } catch {
    // ignore
  }
}

function applyTheme(nextDark: boolean) {
  updateTheme(nextDark);
  persistTheme(nextDark);
}

export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [click] = useClickSound();

  useEffect(() => {
    let nextDark = document.documentElement.classList.contains("dark");

    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark") nextDark = true;
      else if (stored === "light") nextDark = false;
      else {
        nextDark =
          window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ??
          nextDark;
      }
    } catch {
      // ignore
    }

    setDark(nextDark);
    applyTheme(nextDark);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    const root = document.documentElement;

    // small button animation
    setAnimating(true);
    window.setTimeout(() => setAnimating(false), 350);

    const supportsViewTransition =
      "startViewTransition" in document &&
      typeof (document as unknown as { startViewTransition?: unknown })
        .startViewTransition === "function";

    if (!supportsViewTransition) {
      setDark(nextDark);
      applyTheme(nextDark);
      return;
    }

    root.classList.add("theme-revealing");

    const transition = (
      document as unknown as {
        startViewTransition: (callback: () => void) => {
          finished: Promise<void>;
        };
      }
    ).startViewTransition(() => {
      setDark(nextDark);
      applyTheme(nextDark);
    });

    transition.finished.finally(() => {
      root.classList.remove("theme-revealing");
    });
  }

  function handlePointerDown() {
    click();
  }

  return (
    <button
      type="button"
      aria-label={dark ? "Use light mode" : "Use dark mode"}
      aria-pressed={dark}
      onPointerDown={handlePointerDown}
      onClick={toggleTheme}
      data-animating={animating ? "true" : "false"}
      className={`theme-toggle-button inline-flex size-9 items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[var(--text)] ${className ?? ""}`}
    >
      <span
        className={`inline-flex items-center justify-center transition-all duration-300 ease-out ${
          animating ? "rotate-180 scale-125" : "rotate-0 scale-100"
        }`}
      >
        <MoonIcon className="hidden size-4 [html.dark_&]:block" />
        <SunMediumIcon className="hidden size-4 [html.light_&]:block" />
      </span>
    </button>
  );
}
