"use client";

import { format } from "date-fns";
import { use } from "react";

import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Activity } from "@/components/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph";

export function GitHubContributions({
  contributions,
  githubProfileUrl,
  className,
}: {
  contributions: Promise<Activity[]>;
  githubProfileUrl: string;
  className?: string;
}) {
  const data = use(contributions);

  return (
    <TooltipProvider delayDuration={0}>
      <ContributionGraph
        className={cn("mx-auto py-2 w-full", className)}
        data={data}
        blockSize={11}
        blockMargin={3}
        blockRadius={2}
      >
        <ContributionGraphCalendar
          className="no-scrollbar px-2"
          title="GitHub Contributions"
        >
          {({ activity, dayIndex, weekIndex }) => (
            <ContributionGraphBlock
              key={`${weekIndex}-${dayIndex}`}
              activity={activity}
              dayIndex={dayIndex}
              weekIndex={weekIndex}
            />
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-2">
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-auto">
              <ContributionGraphTotalCount>
                {({ totalCount, year }) => (
                  <div className="text-[var(--color-muted)] text-center sm:text-left text-sm">
                    {totalCount.toLocaleString("en")} contributions in {year} on{" "}
                    <a
                      className="text-[var(--color-text)] border-b border-[var(--color-text)] hover:text-[var(--color-link-hover)] hover:border-[var(--color-link-hover)] transition-colors pb-0.5"
                      href={githubProfileUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      GitHub
                    </a>
                    .
                  </div>
                )}
              </ContributionGraphTotalCount>
            </div>

            <div className="w-full flex items-center justify-center sm:w-auto sm:justify-end">
              <ContributionGraphLegend />
            </div>
          </div>
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  );
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <Spinner className="text-[var(--color-muted)]" />
    </div>
  );
}
