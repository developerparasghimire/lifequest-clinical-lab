import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found", robots: { index: false, follow: false } };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || undefined;
  const ogImage = post.image || "/belova59-laboratory-3827742_1920.jpg";

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ["Life Quest Clinical Lab"],
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const posts = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    // Build-time fallback when DB is unreachable (e.g. CI without DATABASE_URL).
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://lifequestclinicallab.com.np";
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: [post.image || `${SITE_URL}/belova59-laboratory-3827742_1920.jpg`],
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Life Quest Clinical Lab", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Life Quest Clinical Lab",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.jpeg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {/* Hero Banner — matches site PageBanner style */}
      <section className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <div className="absolute inset-0">
          <Image
            src={post.image || "/belova59-laboratory-3827742_1920.jpg"}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(274deg, rgba(1,9,10,0.25) 30%, rgba(1,9,10,0.72) 65%, rgba(1,9,10,0.97))",
                "linear-gradient(1deg, rgba(1,9,10,0.15) 40%, rgba(1,9,10,0.5) 75%, rgba(1,9,10,0.88))",
              ].join(", "),
            }}
          />
          <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(19,76,247,0.28)", filter: "blur(80px)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="inline-flex items-center gap-2 mb-5 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#134CF7" }}>
            <span className="inline-block w-6 h-[2px] rounded" style={{ background: "#134CF7" }} />
            Health &amp; Diagnostics
          </div>
          <h1
            className="font-bold leading-[1.07] tracking-tight mb-5 h-display max-w-3xl"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#fff" }}
          >
            {post.title}
          </h1>
          <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }} className="line-clamp-1">{post.title}</span>
          </nav>
          <div className="flex items-center gap-4 mt-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16" style={{ background: "#F6F6F6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <article className="lg:col-span-2 bg-white overflow-hidden card-premium p-8 sm:p-10" style={{ borderRadius: "16px" }}>
              {post.excerpt && (
                <p className="text-lg mb-8 font-medium leading-relaxed" style={{ color: "#444", borderLeft: "4px solid #134CF7", paddingLeft: "1rem" }}>
                  {post.excerpt}
                </p>
              )}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="card-premium p-7 text-white" style={{ borderRadius: "16px", background: "linear-gradient(135deg,#040B2F,#0c1f6e)" }}>
                <h3 className="font-bold text-lg mb-3 h-display">Book a Test Today</h3>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Ready to take the next step? Book your diagnostic test online in minutes.
                </p>
                <Link
                  href="/appointments"
                  className="lab-btn btn-pop flex justify-center"
                  style={{ borderRadius: "10px" }}
                >
                  Book Appointment
                </Link>
              </div>

              <div className="bg-white card-premium p-7" style={{ borderRadius: "16px" }}>
                <h3 className="font-bold mb-4 h-display" style={{ color: "#040B2F" }}>Share This Article</h3>
                <div className="flex gap-3">
                  {["Facebook", "Twitter", "WhatsApp"].map((s) => (
                    <button
                      key={s}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold btn-pop transition-colors"
                      style={{ background: "#F6F6F6", color: "#444", border: "1px solid #DCDCDC", borderRadius: "8px" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white card-premium p-7" style={{ borderRadius: "16px" }}>
                <h3 className="font-bold mb-3 h-display" style={{ color: "#040B2F" }}>About Life Quest</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#444444" }}>
                  Life Quest Clinical Lab is a Nepal-based medical laboratory
                  offering 529 tests with same-day reporting and home sample
                  collection.
                </p>
                <Link
                  href="/about"
                  className="lab-btn btn-pop mt-5 inline-flex text-sm"
                  style={{ padding: "10px 22px", borderRadius: "10px" }}
                >
                  Learn More
                </Link>
              </div>

              <Link
                href="/blog"
                className="lab-btn-ghost btn-pop flex justify-center"
                style={{ borderRadius: "10px" }}
              >
                ← Back to Blog
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
