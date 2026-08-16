import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PageBanner from "@/components/layout/PageBanner";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import BlogCard from "@/components/ui/BlogCard";

export const metadata: Metadata = {
  title: "Health Blog",
  description:
    "Read expert health articles from Life Quest Clinical Lab on diagnostics, preventive care, and understanding your test results.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Health Blog · Life Quest Clinical Lab",
    description:
      "Expert articles on understanding your tests, maintaining health, and the latest in diagnostic medicine.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      image: true,
      createdAt: true,
    },
  });

  return (
    <>
      <PageBanner
        page="blog"
        fallbackTitle="Health & Wellness Blog"
        fallbackSubtitle="Expert articles on understanding your tests, maintaining health, and the latest in diagnostic medicine."
      />

      <section className="py-20 section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-5" style={{ background: "#DCFCE7" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
              </div>
              <p className="text-lg font-medium" style={{ color: "#444444" }}>No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <Reveal stagger staggerGap={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post, i) => (
                <RevealItem key={post.id}>
                  <BlogCard post={post} index={i} />
                </RevealItem>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
