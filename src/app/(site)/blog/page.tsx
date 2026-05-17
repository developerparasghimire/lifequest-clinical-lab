import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import PageBanner from "@/components/layout/PageBanner";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

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
      metaDescription: true,
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

      <section className="py-20" style={{ background: "#F6F6F6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-5" style={{ background: "#EEF3FF" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#134CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
              </div>
              <p className="text-lg font-medium" style={{ color: "#444444" }}>No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <Reveal stagger staggerGap={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post) => (
                <RevealItem key={post.id}>
                <article
                  className="group bg-white overflow-hidden card-premium h-full flex flex-col"
                  style={{ borderRadius: "16px", border: "1px solid #DCDCDC" }}
                >
                  <div className="relative overflow-hidden" style={{ height: "220px" }}>
                    <Image
                      src={post.image || "/hans-reniers-lQGJCMY5qcM-unsplash.jpg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: "rgba(2,5,23,0.35)" }} />
                    <div
                      className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                      style={{ background: "#134CF7", color: "#fff", borderRadius: "2px" }}
                    >
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h2
                      className="font-bold text-lg mb-3 leading-tight line-clamp-2 group-hover:text-[#134CF7] transition-colors"
                      style={{ color: "#040B2F" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed line-clamp-3 mb-6" style={{ color: "#444444" }}>
                      {post.excerpt || post.metaDescription || ""}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="lab-btn btn-pop inline-flex items-center gap-2"
                        style={{ fontSize: "14px", padding: "10px 22px", borderRadius: "10px" }}
                      >
                        Read Article
                        <svg width="13" height="13" viewBox="0 0 19 19" fill="none">
                          <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
                          <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                          <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
                </RevealItem>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
