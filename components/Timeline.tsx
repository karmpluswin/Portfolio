"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { PROJECTS, type Project } from "@/lib/projects";

type TimelineProps = {
  projects?: Project[];
  limit?: number;
  showHeader?: boolean;
  showAll?: boolean;
  showAllHref?: string;
  alwaysShowDescription?: boolean;
  showImages?: boolean;
  showProjectDividers?: boolean;
};

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[24px] fill-current"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.86 8.35 6.84 9.7.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.92c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .28.18.6.69.5A10.04 10.04 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "down" | "up" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "down" ? (
        <path d="M6 9l6 6 6-6" />
      ) : (
        <path d="M6 15l6-6 6 6" />
      )}
    </svg>
  );
}

export default function Timeline({
  projects = PROJECTS,
  limit,
  showHeader = false,
  showAll = false,
  showAllHref = "/projects",
  alwaysShowDescription = false,
  showImages = false,
  showProjectDividers = false,
}: TimelineProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const descriptionRef = useRef<Array<HTMLDivElement | null>>([]);
  const [descriptionHeight, setDescriptionHeight] = useState<
    Record<number, number>
  >({});

  const featured = projects.filter((p) => p.featured);
  // Only filter to featured projects if we are limiting the list (e.g. on the home page)
  const baseList =
    typeof limit === "number" && featured.length > 0 ? featured : projects;
  const visibleProjects =
    typeof limit === "number" ? baseList.slice(0, limit) : baseList;

  useLayoutEffect(() => {
    if (openIndex === null) return;

    const element = descriptionRef.current[openIndex];
    if (!element) return;

    setDescriptionHeight((current) => ({
      ...current,
      [openIndex]: element.scrollHeight,
    }));
  }, [openIndex]);

  if (visibleProjects.length === 0) {
    return (
      <section className="flex min-h-40 items-center justify-center py-10 text-[var(--text)]">
        Coming soon
      </section>
    );
  }

  return (
    <section aria-label="Projects" className="space-y-4">
      {showHeader ? (
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--secondary)]">
            Projects
          </h2>
          {showAll ? (
            <Link
              href={showAllHref}
              className="inline-flex items-center justify-center gap-1 rounded-md border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--text)] hover:bg-[var(--line)]/50 transition-colors"
            >
              <span>Show all</span>
              <ArrowUpRightIcon className="size-3" />
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </div>
      ) : null}

      {visibleProjects.map((project, index) => {
        const isOpen = openIndex === index;
        const hasProjectImage = showImages && Boolean(project.image);
        const isLastProject = index === visibleProjects.length - 1;

        return (
          <div
            key={`${index}-${project.date}-${project.name}`}
            className="space-y-2"
          >
            {hasProjectImage ? (
              <div className="space-y-3">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded border border-[var(--line)] bg-[var(--line)]/10"
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="block aspect-[16/9] h-full w-full bg-[var(--background)] object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </a>
                ) : (
                  <div className="group overflow-hidden rounded border border-[var(--line)] bg-[var(--line)]/10">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="block aspect-[16/9] h-full w-full bg-[var(--background)] object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between gap-4">
                  <p className="text-[1.04rem] text-[var(--text)]">
                    {project.date}
                  </p>
                  <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-x-3 gap-y-1 text-right">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[1.04rem] text-[var(--text)]"
                      >
                        {project.name}
                      </a>
                    ) : (
                      <p className="text-[1.04rem] text-[var(--text)]">
                        {project.name}
                      </p>
                    )}
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.name} on GitHub`}
                        className="inline-flex -m-2 items-center justify-center p-2 text-[var(--secondary)]"
                      >
                        <GitHubIcon />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-[96px_1fr] gap-5 sm:grid-cols-[1fr_auto]">
                <p className="text-[1.04rem] text-[var(--text)]">
                  {project.date}
                </p>
                <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-x-3 gap-y-1 text-right">
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[1.04rem] text-[var(--text)]"
                    >
                      {project.name}
                    </a>
                  ) : (
                    <p className="text-[1.04rem] text-[var(--text)]">
                      {project.name}
                    </p>
                  )}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className="inline-flex -m-2 items-center justify-center p-2 text-[var(--secondary)]"
                    >
                      <GitHubIcon />
                    </a>
                  ) : null}
                  {!alwaysShowDescription && project.description ? (
                    <button
                      type="button"
                      aria-label={
                        isOpen
                          ? `Hide ${project.name} description`
                          : `Show ${project.name} description`
                      }
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenIndex((current) =>
                          current === index ? null : index,
                        )
                      }
                      className="inline-flex -m-2 items-center justify-center p-2 text-[var(--secondary)]"
                    >
                      <ChevronIcon direction={isOpen ? "up" : "down"} />
                    </button>
                  ) : null}
                </div>
              </div>
            )}

            {/* Description - either always visible or collapsible */}
            {project.description ? (
              <div
                aria-hidden={!alwaysShowDescription && !isOpen}
                className="text-left"
                style={
                  alwaysShowDescription
                    ? undefined
                    : {
                        height: isOpen
                          ? `${descriptionHeight[index] ?? 0}px`
                          : "0px",
                        opacity: isOpen ? 1 : 0,
                        overflow: "hidden",
                        transitionProperty: "height, opacity",
                        transitionDuration: "260ms",
                        transitionTimingFunction: "ease",
                        pointerEvents: isOpen ? "auto" : "none",
                        willChange: "height, opacity",
                      }
                }
              >
                <div
                  ref={(element) => {
                    descriptionRef.current[index] = element;
                  }}
                  className="pt-3 text-[1rem] text-[var(--secondary)]"
                >
                  {project.description}
                </div>
              </div>
            ) : null}

            {showProjectDividers && !isLastProject ? (
              <div className="pt-6">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--line)]/70 to-transparent opacity-80" />
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
