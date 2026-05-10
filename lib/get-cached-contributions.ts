import { unstable_cache } from "next/cache"

import type { Activity } from "@/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

type GetCachedContributionsOptions = {
  year?: number | "last"
}

export const getCachedContributions = unstable_cache(
  async (username: string, options?: GetCachedContributionsOptions) => {
    const yearParam = options?.year ?? "last"
    const apiBase = process.env.GITHUB_CONTRIBUTIONS_API_URL ||
      "https://github-contributions-api.jogruber.de"

    const res = await fetch(`${apiBase}/v4/${username}?y=${yearParam}`)
    const data = (await res.json()) as GitHubContributionsResponse
    return data.contributions
  },
  ["github-contributions"],
  { revalidate: 3600 } // Cache for 1 hour (3600 seconds)
)
