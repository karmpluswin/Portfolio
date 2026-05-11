"use client";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useClickSound } from "@/hooks/soundcn/use-click-sound";
import { nameFont } from "@/app/fonts";

const links = [
  { label: "X", href: "https://x.com/karmpluswin" },
  { label: "GitHub", href: "https://github.com/karmpluswin" },
  { label: "Linkedin", href: "https://linkedin.com/in/karmjeetchauhan" },
];

const THEME_STORAGE_KEY = "portfolio:theme";

function getISTTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
    .format(new Date())
    .toUpperCase();
}

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


export default function Header() {
  const [time, setTime] = useState("");
  const [dark, setDark] = useState(false);

  const [click] = useClickSound();

  useEffect(() => {
    setTime(getISTTime());
    const timer = window.setInterval(() => setTime(getISTTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initialize theme from localStorage, otherwise fall back to system preference.
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
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    click();

    if (reducedMotion) {
      setDark(nextDark);
      applyTheme(nextDark);
      return;
    }

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

  return (
    <header className="relative space-y-4">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <Image
            src="/pfp.svg"
            width={100}
            height={100}
            alt="Karmjeet Chauhan"
            priority
            className="mb-3 rounded-[6px] border border-[var(--line)] p-1"
          />
          <h1
            id="rolex-text"
            className={`${nameFont.className} text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--text)] sm:text-[38px]`}
          >
            Karmjeet Chauhan
          </h1>
        </div>
        <div className="shrink-0">
          <button
            type="button"
            aria-label={dark ? "Use light mode" : "Use dark mode"}
            aria-pressed={dark}
            onClick={toggleTheme}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[var(--text)]"
          >
            <MoonIcon className="hidden size-4 [html.dark_&]:block" />
            <SunMediumIcon className="hidden size-4 [html.light_&]:block" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] items-start gap-x-5 gap-y-1">
        <p className="min-w-0 text-[var(--text)]">
          Curious Mind. Born in 2004. India.
        </p>
        <time className="shrink-0 whitespace-nowrap text-right tabular-nums text-[var(--text)]">
          {time}
        </time>
      </div>

      <nav
        aria-label="Personal links"
        className="flex flex-wrap gap-x-2 gap-y-1"
      >
        {links.map((link, index) => (
          <span key={link.label} className="inline-flex gap-x-2">
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
            {index < links.length - 1 ? <span>&middot;</span> : null}
          </span>
        ))}
      </nav>
    </header>
  );
}
