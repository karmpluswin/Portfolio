"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "X", href: "https://x.com/karmpluswin" },
  { label: "GitHub", href: "https://github.com/karmpluswin" },
  { label: "Linkedin", href: "https://linkedin.com/in/karmjeetchauhan" },
];

const roles = [
  {
    title: "SDE Intern",
    org: "ISRO",
    href: "https://www.isro.gov.in/",
  },
];

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
  document.documentElement.classList.toggle("dark", nextDark);
}

export default function Header() {
  const [time, setTime] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setTime(getISTTime());
    const timer = window.setInterval(() => setTime(getISTTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    updateTheme(dark);
  }, [dark]);

  function toggleTheme() {
    const nextDark = !dark;
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setDark(nextDark);
      return;
    }

    const supportsViewTransition =
      "startViewTransition" in document &&
      typeof (document as unknown as { startViewTransition?: unknown })
        .startViewTransition === "function";

    if (!supportsViewTransition) {
      setDark(nextDark);
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
            className="mb-3 rounded-[6px]"
          />
          <h1 className="text-[30px] font-semibold leading-[1.25] text-[var(--text)]">
            Karmjeet Chauhan
          </h1>
        </div>
        <div className="shrink-0">
          <button
            type="button"
            aria-label={dark ? "Use light mode" : "Use dark mode"}
            aria-pressed={dark}
            onClick={toggleTheme}
            className="inline-flex -m-2 size-8 items-start justify-end p-2"
          >
            <span className="size-4 rounded-full bg-[var(--text)]" />
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

      <p className="text-[var(--text)]">
        {roles.map((role, index) => (
          <span key={`${role.title}-${role.org}`}>
            {role.title}{" "}
            <a href={role.href} target="_blank" rel="noreferrer">
              {role.org}
            </a>
            {index < roles.length - 1 ? " \u00b7 " : null}
          </span>
        ))}
      </p>

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
