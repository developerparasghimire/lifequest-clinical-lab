"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

const fallbackImages = [
  "/publicdomainpictures-lab-217043_1920.jpg",
  "/hans-reniers-lQGJCMY5qcM-unsplash.jpg",
  "/julia-koblitz-RlOAwXt2fEA-unsplash.jpg",
];

const tags = ["Health Tips", "Lab Science", "Wellness"];

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: Date;
  image: string | null;
}

function BlogCard({ post, i }: { post: Post; i: number }) {
  return (
    <article
      className="group bg-white overflow-hidden card-premium h-full flex flex-col"
      style={{ borderRadius: "16px" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        <Image
          src={post.image || fallbackImages[i % fallbackImages.length]}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute top-5 left-5 text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 text-white"
          style={{ background: "#134CF7", borderRadius: "2px" }}
        >
          {tags[i % tags.length]}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <p className="text-xs mb-3" style={{ color: "#aaa" }}>
          {formatDate(post.createdAt)}
        </p>
        <h3
          className="font-semibold text-lg mb-4 leading-snug line-clamp-2 group-hover:text-[#134CF7] transition-colors"
          style={{ color: "#040B2F" }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm leading-relaxed line-clamp-3 mb-6" style={{ color: "#444444" }}>
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold mt-auto"
          style={{ color: "#134CF7" }}
        >
          Read More
          <svg width="12" height="12" viewBox="0 0 19 19" fill="none">
            <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="2" />
            <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="2" />
            <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function BlogSlider({ posts }: { posts: Post[] }) {
  const [idx, setIdx] = useState(0);
  const total = posts.length;

  function prev() {
    setIdx((i) => (i - 1 + total) % total);
  }
  function next() {
    setIdx((i) => (i + 1) % total);
  }

  return (
    <>
      {/* ── Mobile: 1-card slider ── */}
      <div className="md:hidden">
        <div className="h-full">
          <BlogCard post={posts[idx]} i={idx} />
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "#134CF7", color: "#134CF7" }}
            aria-label="Previous article"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === idx ? "24px" : "8px",
                background: i === idx ? "#134CF7" : "rgba(19,76,247,0.25)",
              }}
              aria-label={`Go to article ${i + 1}`}
            />
          ))}

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "#134CF7", color: "#134CF7" }}
            aria-label="Next article"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Desktop: 3-column grid ── */}
      <div className="hidden md:grid md:grid-cols-3 gap-7">
        {posts.map((post, i) => (
          <BlogCard key={post.id} post={post} i={i} />
        ))}
      </div>
    </>
  );
}
