"use client";

import { Mail } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-[var(--color-border)] pt-4 text-[var(--color-muted)]"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[740px] px-4">
        <div className="flex w-full flex-col items-center gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="text-[1.1em] align-middle">©</span>{" "}
            <span suppressHydrationWarning>{year}</span> Karmjeet Chauhan.
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-5">
            <a
              href="https://github.com/karmpluswin"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-link-hover)] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href="https://linkedin.com/in/karmpluswin"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-link-hover)] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href="https://x.com/karmjeetchauhan"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-link-hover)] transition-colors"
              aria-label="X (Twitter)"
            >
              <XIcon className="size-4" />
            </a>
            <a
              href="mailto:karmpluswin@gmail.com"
              className="text-[var(--color-muted)] hover:text-[var(--color-link-hover)] transition-colors"
              aria-label="Email"
            >
              <Mail className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
