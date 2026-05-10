"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-[var(--line)] pt-4 text-[var(--secondary)]"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[740px] px-4">
        <div className="flex w-full flex-col items-center gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="text-[1.1em] align-middle">©</span>{" "}
            <span suppressHydrationWarning>{year}</span> Karmjeet Chauhan.
          </div>

          <div className="text-center sm:text-right">
            <span className="mr-1">Contact:</span>
            <a
              href="mailto:karmpluswin@gmail.com"
              className="underline-offset-2 hover:underline"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
