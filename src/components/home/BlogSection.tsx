import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/ui/Reveal";
import BlogSlider from "@/components/home/BlogSlider";

const SELECT = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  createdAt: true,
  image: true,
} as const;

export default async function BlogSection() {
  // Posts the admin ticked "Show on Home" for, newest first.
  const featured = await prisma.blog.findMany({
    where: { published: true, latest: true },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: SELECT,
  });

  // Back-fill with the newest published posts so the row always shows
  // three, even when fewer than three are ticked in the admin panel.
  const posts =
    featured.length >= 3
      ? featured
      : [
          ...featured,
          ...(await prisma.blog.findMany({
            where: {
              published: true,
              id: { notIn: featured.map((p) => p.id) },
            },
            orderBy: { createdAt: "desc" },
            take: 3 - featured.length,
            select: SELECT,
          })),
        ];

  if (posts.length === 0) return null;

  return (
    <section className="py-20" style={{ background: "#F0FDF9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Blog</p>
            <h2
              className="text-3xl sm:text-4xl font-bold h-display"
              style={{ color: "#040B2F" }}
            >
              Latest in{" "}
              <span style={{ color: "#00B67A" }}>News and Events</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#00B67A]"
            style={{ color: "#00B67A" }}
          >
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>

        <BlogSlider posts={posts} />
      </div>
    </section>
  );
}
