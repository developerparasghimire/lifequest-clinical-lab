"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

const FALLBACKS = [
  "/julia-koblitz-RlOAwXt2fEA-unsplash.jpg",
  "/hans-reniers-lQGJCMY5qcM-unsplash.jpg",
  "/cdc-XLhDvfz0sUM-unsplash.jpg",
];

interface Service {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
}

function DefaultIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H3m6 0h12m0 0V5M6 14v6m3-3H3" />
    </svg>
  );
}

function ServiceCard({ svc, idx }: { svc: Service; idx: number }) {
  const image = svc.image || FALLBACKS[idx % FALLBACKS.length];

  return (
    <div
      className="group bg-white flex flex-col h-full overflow-hidden"
      style={{
        borderRadius: "20px",
        border: "1px solid #E2E6F0",
        boxShadow: "0 4px 24px rgba(0,182,122,0.06)",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-8px)";
        el.style.boxShadow = "0 24px 60px rgba(0,182,122,0.18)";
        el.style.borderColor = "#00B67A";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 24px rgba(0,182,122,0.06)";
        el.style.borderColor = "#E2E6F0";
      }}
    >
      {/* Image with gradient overlay */}
      <div className="relative overflow-hidden shrink-0" style={{ height: "200px" }}>
        <Image
          src={image}
          alt={svc.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,182,122,0.15) 0%, rgba(4,11,47,0.60) 100%)" }}
        />
        {/* Floating icon circle — overlaps image bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center border-4 border-white z-10 transition-transform duration-300 group-hover:scale-110"
          style={{ background: "linear-gradient(135deg, #00B67A 0%, #263B96 100%)" }}
        >
          <DefaultIcon />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-7 pt-11 flex flex-col flex-1 text-center">
        <h4
          className="font-bold mb-3 leading-snug"
          style={{ fontSize: "17px", color: "#040B2F" }}
        >
          {svc.title}
        </h4>
        <p
          className="text-sm leading-relaxed mb-7 flex-1 line-clamp-4"
          style={{ color: "#40474F" }}
        >
          {svc.description}
        </p>
        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-2.5 self-center"
          style={{
            borderRadius: "999px",
            color: "#00B67A",
            border: "1.5px solid #00B67A",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#00B67A";
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = "#00B67A";
          }}
        >
          Learn More
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ServicesSlider({ services }: { services: Service[] }) {
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const total = services.length;

  function prev() { setIdx((i) => (i - 1 + total) % total); }
  function next() { setIdx((i) => (i + 1) % total); }

  function onTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX;
    setDragging(true);
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!dragging) return;
    setDragX(e.touches[0].clientX - startXRef.current);
  }
  function onTouchEnd() {
    if (Math.abs(dragX) > 50) { if (dragX < 0) next(); else prev(); }
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
          <ServiceCard svc={services[idx]} idx={idx} />
        </div>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "#00B67A", color: "#00B67A" }}
            aria-label="Previous service"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === idx ? "24px" : "8px",
                background: i === idx ? "#00B67A" : "rgba(0,182,122,0.2)",
              }}
              aria-label={`Go to service ${i + 1}`}
            />
          ))}
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "#00B67A", color: "#00B67A" }}
            aria-label="Next service"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Desktop: 3-column grid ── */}
      <div className="hidden md:grid md:grid-cols-3 gap-7">
        {services.map((svc, i) => (
          <ServiceCard key={svc.id} svc={svc} idx={i} />
        ))}
      </div>
    </>
  );
}
