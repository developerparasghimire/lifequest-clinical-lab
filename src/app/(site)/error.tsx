"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Shown when a page cannot render at all — in practice almost always the
 * database being briefly unreachable (e.g. Neon waking from suspend). Shared
 * chrome and optional sections already fall back on their own; this covers
 * pages whose main content *is* database data, such as a blog post.
 */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site error]", error);
  }, [error]);

  return (
    <section className="py-24 sm:py-32" style={{ background: "#F0FDF9" }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "#DCFCE7" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <polyline points="21 3 21 9 15 9" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold h-display mb-4" style={{ color: "#040B2F" }}>
          We&apos;ll be right back
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: "#5D6478" }}>
          This page couldn&apos;t load just now. It&apos;s usually a momentary hiccup — please try again.
          If you need us urgently, call{" "}
          <a href="tel:+97714002747" className="font-semibold" style={{ color: "#00B67A" }}>01-4002747</a>.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button type="button" onClick={() => reset()} className="lab-btn btn-pop">
            Try again
          </button>
          <Link href="/" className="lab-btn-outline">
            Go to home page
          </Link>
        </div>
      </div>
    </section>
  );
}
