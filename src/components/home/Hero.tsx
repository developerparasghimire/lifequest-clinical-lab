"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  "/our%20images/DSC00057.jpg",
  "/our%20images/DSC00065.jpg",
  "/our%20images/DSC00149.jpg",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "100svh" }}>

      {/* ── Background slideshow ── */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <Image src={src} alt="" fill className="object-cover" priority={i === 0} sizes="100vw" />
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(4,11,47,0.80) 0%, rgba(4,11,47,0.55) 60%, rgba(4,11,47,0.20) 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[100svh] py-24">
        <div className="max-w-2xl">
          <h1
            className="font-black leading-tight text-white mb-4"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)", letterSpacing: "-0.02em" }}
          >
            Quality<br />Comes First
          </h1>

          <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: "rgba(255,255,255,0.70)" }}>
            Precision diagnostics, fast accurate results, and home sample collection
            by expert pathologists — serving Nepal since 2021.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/services/packages" className="lab-btn" style={{ padding: "15px 36px", fontSize: "15px" }}>
              Book a Health Package
            </Link>
            <a
              href="tel:+97714002747"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "rgba(255,255,255,0.85)", alignSelf: "center" }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              or call &nbsp;+977 1 400 2747
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === idx ? "#00B67A" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}
