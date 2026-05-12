import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";

import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = "karmpluswin";
const GITHUB_PROFILE_URL = "https://github.com/karmpluswin";
const GITHUB_YEAR = 2026;

export default function GitHubContributionsSection() {
  const contributions = getCachedContributions(GITHUB_USERNAME, {
    year: GITHUB_YEAR,
  });

  return (
    <section aria-label="GitHub Contributions" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--secondary)]">
            GitHub Contributions
          </h2>
        </div>
      </div>
      <div className="rounded border border-[var(--line)] p-4 shadow-none transition-all duration-300 hover:border-[var(--text)]/20 hover:shadow-[0_0_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_16px_rgba(255,255,255,0.08)] animate-fade-in">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={GITHUB_PROFILE_URL}
          />
        </Suspense>
      </div>
    </section>
  );
}
