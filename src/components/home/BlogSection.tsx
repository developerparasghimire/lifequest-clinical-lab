import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/ui/Reveal";
import BlogSlider from "@/components/home/BlogSlider";


export default async function BlogSection() {
  const posts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, title: true, slug: true, excerpt: true, createdAt: true, image: true },
  });

  if (posts.length === 0) return null;

  return (
    <section className="py-24 mesh-light" style={{ background: "#F6F6F6" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="lab-subtitle mb-4">Latest Articles</div>
            <h2 className="text-4xl sm:text-5xl font-bold h-display" style={{ color: "#040B2F" }}>
              News &amp; Health <span style={{ color: "#134CF7" }}>Blog</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="lab-btn btn-pop inline-flex items-center gap-2 text-sm"
            style={{ padding: "12px 24px", borderRadius: "10px" }}
          >
            <svg width="14" height="14" viewBox="0 0 19 19" fill="none">
              <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            View All
          </Link>
        </Reveal>

        <BlogSlider posts={posts} />
      </div>
    </section>
  );
}
