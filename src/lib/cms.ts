import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import type { Banner, Branch, Testimonial, TeamMember } from "@prisma/client";

export type SettingsMap = Record<string, string>;

/**
 * Every helper here feeds shared page chrome (the footer reads settings on
 * every page), so a database blip — typically Neon waking a suspended
 * compute — must not take the whole site down with a 500.
 *
 * The try/catch sits OUTSIDE unstable_cache on purpose: a failure falls back
 * for this one request, but is never written to the cache, so the next
 * request retries the database instead of serving "empty" for 60 seconds.
 * Components already have sensible defaults for missing settings.
 */
async function withFallback<T>(label: string, load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await load();
  } catch (e) {
    console.error(`[cms] ${label} unavailable, rendering with fallback:`, (e as Error).message?.split("\n").pop());
    return fallback;
  }
}

const cachedSettings = unstable_cache(
  async (): Promise<SettingsMap> => {
    const rows = await prisma.siteSetting.findMany();
    const map: SettingsMap = {};
    for (const r of rows) map[r.key] = r.value;
    return map;
  },
  ["site-settings"],
  { tags: ["settings"], revalidate: 60 }
);

/** All SiteSettings as a key→value map. Tagged so admin writes can revalidateTag("settings"). */
export const getSettings = () => withFallback("settings", cachedSettings, {} as SettingsMap);

const cachedBanner = unstable_cache(
  async (page: string): Promise<Banner | null> =>
    prisma.banner.findUnique({ where: { page } }),
  ["banner"],
  { tags: ["banners"], revalidate: 60 }
);

export const getBanner = (page: string) =>
  withFallback(`banner:${page}`, () => cachedBanner(page), null);

const cachedBranches = unstable_cache(
  async (): Promise<Branch[]> =>
    prisma.branch.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    }),
  ["branches"],
  { tags: ["branches"], revalidate: 60 }
);

export const getBranches = () => withFallback("branches", cachedBranches, [] as Branch[]);

const cachedTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> =>
    prisma.testimonial.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }),
  ["testimonials"],
  { tags: ["testimonials"], revalidate: 60 }
);

export const getTestimonials = () =>
  withFallback("testimonials", cachedTestimonials, [] as Testimonial[]);

const cachedTeamMembers = unstable_cache(
  async (): Promise<TeamMember[]> =>
    prisma.teamMember.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    }),
  ["team-members"],
  { tags: ["team"], revalidate: 60 }
);

export const getTeamMembers = () =>
  withFallback("team", cachedTeamMembers, [] as TeamMember[]);
