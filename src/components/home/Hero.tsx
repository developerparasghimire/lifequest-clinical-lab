"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TOTAL_TESTS } from "@/data/services";

const slides = [
  {
    src: "/belova59-laboratory-3827742_1920.jpg",
    alt: "Modern clinical laboratory interior",
  },
  {
    src: "/testalize-me-SVmaaACzcJ8-unsplash.jpg",
    alt: "Lab scientist analysing a sample",
  },
  {
    src: "/trnava-university-_9xRHrMOjeg-unsplash.jpg",
    alt: "Modern laboratory testing equipment",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Slide images — Ken Burns + crossfade */}
      <AnimatePresence>
        {slides.map((slide, i) => (
          i === current && (
            <motion.div
              key={slide.src + i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: reduce ? 1.06 : 1.0 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.1 }, scale: { duration: 6.5, ease: "linear" } }}
              aria-hidden={false}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                loading="eager"
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Layered overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: [
            "linear-gradient(274deg, #01090a00 38%, #01090a8a 70%, #01090a)",
            "linear-gradient(1deg, #01090a00 55%, #01090a33 83%, #01090ab5)",
            "linear-gradient(#01090a00 47%, #01090a33)",
          ].join(", "),
        }}
      />
      {/* Subtle blue glow accent */}
      <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none z-10 animate-blob-1" style={{ background: "rgba(19,76,247,0.32)", filter: "blur(80px)" }} />
      <div className="absolute -top-40 -right-32 w-[460px] h-[460px] rounded-full pointer-events-none z-10 animate-blob-2" style={{ background: "rgba(0,198,255,0.18)", filter: "blur(70px)" }} />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 mb-7 px-5 py-2 border text-sm font-semibold uppercase tracking-widest backdrop-blur"
            style={{
              borderColor: "rgba(19,76,247,0.6)",
              color: "#fff",
              background: "rgba(19,76,247,0.12)",
              borderRadius: "999px",
              letterSpacing: "0.12em",
            }}
          >
            <span className="relative flex h-2 w-2">
            </span>
            Life Quest — Trusted Clinical Lab
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mb-6 font-bold leading-[1.04] tracking-tight h-display"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)", color: "#fff" }}
          >
            Advanced Diagnostics.{" "}
            <span className="text-gradient" style={{ display: "inline-block" }}>Reliable Results.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-10 leading-relaxed max-w-2xl"
            style={{ fontSize: "1.075rem", color: "rgba(255,255,255,0.82)" }}
          >
            Life Quest leads in disease diagnosis, preventive medicine, personalized
            treatment, and public health. We offer {TOTAL_TESTS}+ accredited tests —
            with same-day reporting and home sample collection across the Kathmandu Valley.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/appointments"
              className="lab-btn btn-shine btn-pop"
              style={{ fontSize: "15px", padding: "14px 32px", borderRadius: "10px" }}
            >
              <svg width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Book a Test
            </Link>
            <Link
              href="/services"
              className="lab-btn-ghost btn-pop"
              style={{ fontSize: "15px", padding: "14px 32px", borderRadius: "10px" }}
            >
              Browse {TOTAL_TESTS} Tests
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {[
              { value: `${TOTAL_TESTS}+`, label: "Lab Tests" },
              { value: "3", label: "Branches" },
              { value: "Same Day", label: "Reports" },
              { value: "24/7", label: "Support" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-4 border border-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#134CF7]/80 hover:bg-[#134CF7]/15 cursor-default"
                style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", borderRadius: "12px" }}
              >
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "#134CF7" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
    

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none z-10" />
      <span id="after-hero" className="absolute bottom-0" />
    </section>
  );
}
