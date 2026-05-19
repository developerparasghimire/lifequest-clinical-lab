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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H3m6 0h12m0 0V5M6 14v6m3-3H3" />
    </svg>
  );
}

function ServiceCard({ svc, idx }: { svc: Service; idx: number }) {
  const image = svc.image || FALLBACKS[idx % FALLBACKS.length];
  return (
    <div
      className="group relative bg-white overflow-hidden card-premium h-full flex flex-col"
      style={{ borderRadius: "16px" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden shrink-0" style={{ height: "220px" }}>
        <Image
          src={image}
          alt={svc.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Icon overlay */}
        <div
          className="absolute top-5 left-5 p-3 rounded text-white z-10 transition-transform duration-300 group-hover:scale-110"
          style={{ background: "#134CF7" }}
        >
          <DefaultIcon />
        </div>
      </div>

      {/* Content */}
      <div className="p-7 relative flex flex-col flex-1">
        <h4 className="text-xl font-semibold mb-3 leading-tight" style={{ color: "#040B2F" }}>
          {svc.title}
        </h4>
        <p className="text-sm leading-relaxed mb-10 line-clamp-4 flex-1" style={{ color: "#444444" }}>
          {svc.description}
        </p>

        {/* Arrow button */}
        <Link
          href="/services"
          className="absolute bottom-6 right-6 arrow-btn z-10"
          style={{ color: "#040B2F" }}
          aria-label={`Learn more about ${svc.title}`}
        >
          <svg width="14" height="14" viewBox="0 0 19 19" fill="none">
            <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.8" />
            <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.8" />
            <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.8" />
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
          <ServiceCard svc={services[idx]} idx={idx} />
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "#134CF7", color: "#134CF7" }}
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
                background: i === idx ? "#134CF7" : "rgba(19,76,247,0.25)",
              }}
              aria-label={`Go to service ${i + 1}`}
            />
          ))}

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "#134CF7", color: "#134CF7" }}
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
