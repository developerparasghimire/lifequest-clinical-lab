import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import type { Banner, Branch, Testimonial, TeamMember } from "@prisma/client";

export type SettingsMap = Record<string, string>;

/**
 * Server-side helper to fetch all SiteSettings as a key→value map.
 * Cached briefly to avoid hammering DB on every page render.
 * Tagged so admin mutations can revalidateTag("settings").
 */
export const getSettings = unstable_cache(
  async (): Promise<SettingsMap> => {
    const rows = await prisma.siteSetting.findMany();
    const map: SettingsMap = {};
    for (const r of rows) map[r.key] = r.value;
    return map;
  },
  ["site-settings"],
  { tags: ["settings"], revalidate: 60 }
);

export const getBanner = unstable_cache(
  async (page: string): Promise<Banner | null> =>
    prisma.banner.findUnique({ where: { page } }),
  ["banner"],
  { tags: ["banners"], revalidate: 60 }
);

export const getBranches = unstable_cache(
  async (): Promise<Branch[]> =>
    prisma.branch.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    }),
  ["branches"],
  { tags: ["branches"], revalidate: 60 }
);

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> =>
    prisma.testimonial.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }),
  ["testimonials"],
  { tags: ["testimonials"], revalidate: 60 }
);

export const getTeamMembers = unstable_cache(
  async (): Promise<TeamMember[]> =>
    prisma.teamMember.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    }),
  ["team-members"],
  { tags: ["team"], revalidate: 60 }
);
