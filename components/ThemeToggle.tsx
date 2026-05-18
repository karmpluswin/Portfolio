"use client";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

function copyThemeVariables(source: CSSStyleDeclaration, target: HTMLElement) {
  [
    "--background",
    "--text",
    "--secondary",
    "--line",
    "--hover",
    "--theme-duration",
    "--expo-out",
  ].forEach((name) => {
    target.style.setProperty(name, source.getPropertyValue(name));
  });
}

function runFallbackCurtain(nextDark: boolean, onComplete: () => void) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    applyTheme(nextDark);
    onComplete();
    return;
  }

  const rootStyle = window.getComputedStyle(document.documentElement);
  const bodyStyle = window.getComputedStyle(document.body);
  const scrollY = window.scrollY;
  const overlay = document.createElement("div");
  const snapshot = document.createElement("div");

  overlay.setAttribute("aria-hidden", "true");
  overlay.setAttribute("data-theme-curtain", "true");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.zIndex = "2147483647";
  overlay.style.pointerEvents = "none";
  overlay.style.overflow = "hidden";
  overlay.style.background = rootStyle.getPropertyValue("--background");
  overlay.style.color = rootStyle.getPropertyValue("--text");
  overlay.style.clipPath = "inset(0 0 0 0)";
  overlay.style.maskImage =
    "linear-gradient(to bottom, transparent 0, rgba(0, 0, 0, 0.72) 28px, #000 56px, #000 100%)";
  overlay.style.willChange = "clip-path";

  copyThemeVariables(rootStyle, overlay);

  snapshot.style.position = "absolute";
  snapshot.style.top = `${-scrollY}px`;
  snapshot.style.left = "0";
  snapshot.style.right = "0";
  snapshot.style.minHeight = `${document.documentElement.scrollHeight}px`;
  snapshot.style.background = rootStyle.getPropertyValue("--background");
  snapshot.style.color = rootStyle.getPropertyValue("--text");
  snapshot.style.font = bodyStyle.font;
  snapshot.style.letterSpacing = bodyStyle.letterSpacing;
  snapshot.style.lineHeight = bodyStyle.lineHeight;

  Array.from(document.body.children).forEach((child) => {
    if (child.hasAttribute("data-theme-curtain")) return;
    snapshot.appendChild(child.cloneNode(true));
  });

  overlay.appendChild(snapshot);
  document.body.appendChild(overlay);

  applyTheme(nextDark);

  const durationRaw = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--theme-curtain-duration")
    .trim();
  const duration = Number.isFinite(Number.parseFloat(durationRaw))
    ? Number.parseFloat(durationRaw)
    : 980;
  const animation = overlay.animate(
    [{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(100% 0 0 0)" }],
    {
      duration,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards",
    },
  );

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    onComplete();
    overlay.remove();
  };

  animation.finished.then(cleanup, cleanup);
  window.setTimeout(cleanup, duration + 240);
}

export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [animating, setAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const revealingRef = useRef(false);
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
    if (revealingRef.current) return;

    const nextDark = !dark;
    const root = document.documentElement;
    revealingRef.current = true;

    if (buttonRef.current) {
      setAnimating(true);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      animationTimeoutRef.current = setTimeout(() => {
        setAnimating(false);
      }, 420);
    }

    const supportsViewTransition =
      "startViewTransition" in document &&
      typeof (document as unknown as { startViewTransition?: unknown })
        .startViewTransition === "function";

    if (!supportsViewTransition) {
      root.classList.add("theme-revealing");
      runFallbackCurtain(nextDark, () => {
        setDark(nextDark);
        revealingRef.current = false;
        root.classList.remove("theme-revealing");
      });
      return;
    }

    root.classList.add("theme-revealing");

    try {
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
        revealingRef.current = false;
        root.classList.remove("theme-revealing");
      });
    } catch {
      runFallbackCurtain(nextDark, () => {
        setDark(nextDark);
        revealingRef.current = false;
        root.classList.remove("theme-revealing");
      });
    }
  }

  function handlePointerDown() {
    if (revealingRef.current) return;
    click();
  }

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      document.documentElement.classList.remove("theme-revealing");
      revealingRef.current = false;
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={dark ? "Use light mode" : "Use dark mode"}
      aria-pressed={dark}
      onPointerDown={handlePointerDown}
      onClick={toggleTheme}
      ref={buttonRef}
      data-animating={animating}
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
