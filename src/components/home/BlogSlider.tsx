"use client";
import { useState, useRef } from "react";
import BlogCard from "@/components/ui/BlogCard";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: Date;
  image: string | null;
}

export default function BlogSlider({ posts }: { posts: Post[] }) {
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const total = posts.length;

  function prev() {
    setIdx((i) => (i - 1 + total) % total);
  }
  function next() {
    setIdx((i) => (i + 1) % total);
  }

  function onTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX;
    setDragging(true);
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!dragging) return;
    setDragX(e.touches[0].clientX - startXRef.current);
  }
  function onTouchEnd() {
    if (Math.abs(dragX) > 50) {
      if (dragX < 0) next();
      else prev();
    }
    setDragX(0);
    setDragging(false);
  }

  return (
    <>
      {/* ── Mobile: 1-card slider ── */}
      <div className="md:hidden">
        <div
          className="h-full overflow-hidden touch-pan-y select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            transform: `translateX(${dragX}px)`,
            transition: dragging ? "none" : "transform 0.3s ease",
          }}
        >
          <BlogCard post={posts[idx]} index={idx} />
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "#00B67A", color: "#00B67A" }}
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
                background: i === idx ? "#00B67A" : "rgba(0,182,122,0.25)",
              }}
              aria-label={`Go to article ${i + 1}`}
            />
          ))}

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "#00B67A", color: "#00B67A" }}
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
          <BlogCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </>
  );
}
