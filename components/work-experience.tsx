"use client";

import ReactMarkdown from "react-markdown";
import { useMemo, useState, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { nameFont } from "@/app/fonts";

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  location?: string;
  employmentPeriod: {
    start: string;
    end?: string;
  };
  employmentType?: string;
  description?: string;
  icon?: React.ReactElement;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

export type WorkExperienceProps = {
  className?: string;
  experiences: ExperienceItemType[];
};

function parsePeriod(input: string, monthFallback: "first" | "last") {
  // Supports "MM.YYYY" or "YYYY".
  if (input.includes(".")) {
    const [mm, yyyy] = input.split(".");
    const month = Number(mm);
    const year = Number(yyyy);
    if (!Number.isFinite(month) || !Number.isFinite(year)) return null;
    return { year, month };
  }

  const year = Number(input);
  if (!Number.isFinite(year)) return null;
  return { year, month: monthFallback === "last" ? 12 : 1 };
}

function comparePeriods(
  a: { year: number; month: number },
  b: { year: number; month: number },
) {
  if (a.year !== b.year) return a.year - b.year;
  return a.month - b.month;
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function formatDisplayPeriod(input: string) {
  if (!input) return "";
  if (!input.includes(".")) return input;
  const parsed = parsePeriod(input, "first");
  if (!parsed) return input;
  const monthName = MONTHS_SHORT[Math.min(12, Math.max(1, parsed.month)) - 1];
  return `${monthName} ${parsed.year}`;
}

function formatRangeLabel(start: string, end?: string) {
  const startLabel = formatDisplayPeriod(start);
  const endLabel = end ? formatDisplayPeriod(end) : "Present";
  if (!startLabel) return "";
  return `${startLabel} - ${endLabel}`;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn(
        "size-[18px] text-[var(--color-muted)] transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function WorkExperience({
  className,
  experiences,
}: WorkExperienceProps) {
  return (
    <section aria-label="Work experience" className={cn("w-full", className)}>
      <ul className="space-y-8">
        {experiences.map((experience) => (
          <li key={experience.id}>
            <ExperienceItem experience={experience} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ExperienceItem({ experience }: { experience: ExperienceItemType }) {
  const [open, setOpen] = useState(
    experience.positions.some((p) => Boolean(p.isExpanded)),
  );

  const rangeLabel = useMemo(() => {
    if (!experience.positions.length) return "";

    const starts = experience.positions
      .map((p) => parsePeriod(p.employmentPeriod.start, "first"))
      .filter(Boolean) as { year: number; month: number }[];

    if (!starts.length) return "";

    const earliestStart = starts.sort(comparePeriods)[0];
    const startStr = `${String(earliestStart.month).padStart(2, "0")}.${earliestStart.year}`;

    const hasOpenEnded = experience.isCurrentEmployer
      ? true
      : experience.positions.some((p) => !p.employmentPeriod.end);

    if (hasOpenEnded) return formatRangeLabel(startStr, undefined);

    const ends = experience.positions
      .map((p) =>
        p.employmentPeriod.end
          ? parsePeriod(p.employmentPeriod.end, "last")
          : null,
      )
      .filter(Boolean) as { year: number; month: number }[];

    if (!ends.length) return formatRangeLabel(startStr, undefined);

    const latestEnd = ends.sort(comparePeriods).at(-1)!;
    const endStr = `${String(latestEnd.month).padStart(2, "0")}.${latestEnd.year}`;
    return formatRangeLabel(startStr, endStr);
  }, [experience.isCurrentEmployer, experience.positions]);

  const canToggle = experience.positions.some((p) => Boolean(p.description));

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => {
          if (!canToggle) return;
          setOpen((v) => !v);
        }}
        disabled={!canToggle}
        className={cn(
          "flex w-full items-center justify-between gap-3 text-left",
          canToggle ? "cursor-pointer" : "cursor-default",
        )}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={`${experience.companyName} logo`}
              className="w-10 h-10 rounded-sm object-cover border border-[var(--color-border)]"
            />
          ) : null}

          <h3 className={`${nameFont.className} text-[20px] font-semibold leading-snug text-[var(--color-text)]`}>
            {experience.companyWebsite ? (
              <a
                href={experience.companyWebsite}
                target="_blank"
                rel="noreferrer"
              >
                {experience.companyName}
              </a>
            ) : (
              experience.companyName
            )}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {rangeLabel ? (
            <span className="text-sm tabular-nums text-[var(--color-muted)]">
              {rangeLabel}
            </span>
          ) : null}
          {canToggle ? <ChevronIcon open={open} /> : null}
        </div>
      </button>

      {experience.positions.map((position) => (
        <ExperiencePositionBlock
          key={position.id}
          position={position}
          open={open}
        />
      ))}
    </div>
  );
}

function ExperiencePositionBlock({
  position,
  open,
}: {
  position: ExperiencePositionItemType;
  open: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <div className="space-y-2">
      <p className="text-[15px] text-[var(--color-muted)]">
        <span className="text-[var(--color-text)]">{position.title}</span>
        {position.location ? (
          <>
            <span className="px-2">·</span>
            <span>{position.location}</span>
          </>
        ) : null}
      </p>

      {Array.isArray(position.skills) && position.skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {position.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-md border border-[var(--color-border)] bg-transparent px-2 py-0.5 text-xs text-[var(--color-muted)]"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}

      {position.description ? (
        <div
          aria-hidden={!open}
          style={{
            height: open ? `${height}px` : "0px",
            opacity: open ? 1 : 0,
            overflow: "hidden",
            transitionProperty: "height, opacity",
            transitionDuration: "260ms",
            transitionTimingFunction: "ease",
            pointerEvents: open ? "auto" : "none",
            willChange: "height, opacity",
          }}
        >
          <div ref={contentRef} className="pt-1 text-[15px] text-[var(--color-muted)]">
            <ReactMarkdown
              components={{
                a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
                p: (props) => <p {...props} className="mb-2 last:mb-0" />,
                ul: (props) => (
                  <ul
                    {...props}
                    className="ml-5 list-disc space-y-1 marker:text-[var(--color-muted)]"
                  />
                ),
                li: (props) => <li {...props} className="leading-relaxed" />,
              }}
            >
              {position.description}
            </ReactMarkdown>
          </div>
        </div>
      ) : null}
    </div>
  );
}
