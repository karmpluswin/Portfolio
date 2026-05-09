"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)] pt-4 text-[var(--secondary)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-[1.1em] align-middle">©</span>{" "}
          <span suppressHydrationWarning>{year}</span> Karmjeet Chauhan.
        </div>
        <div className="sm:text-right">
          <span>Contact: </span>
          <a href="mailto:karmpluswin@gmail.com" className="hover:underline">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
