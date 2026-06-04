"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import { nameFont } from "@/app/fonts";

const links = [
  { label: "X", href: "https://x.com/karmpluswin" },
  { label: "GitHub", href: "https://github.com/karmpluswin" },
  { label: "Linkedin", href: "https://linkedin.com/in/karmjeetchauhan" },
  { label: "Resume", href: "https://cataas.com/cat"}
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

export default function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(getISTTime());
    const timer = window.setInterval(() => setTime(getISTTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

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
            className="mb-3 rounded-[6px] border border-[var(--color-border)]"
          />
          <h1
            id="rolex-text"
            className={`${nameFont.className} text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--color-text)] sm:text-[38px]`}
          >
            Karmjeet Chauhan
          </h1>
        </div>
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] items-start gap-x-5 gap-y-1">
        <p className="min-w-0 text-[var(--color-text)]">
          Think Different. Born in 2004. India.
          {/* Software Engineer. Born in 2004. India. */}
        </p>
        <time className="shrink-0 whitespace-nowrap text-right tabular-nums text-[var(--color-text)] hidden md:block">
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
