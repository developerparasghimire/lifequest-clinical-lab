"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  icon?: string | null;
  image?: string | null;
  featured: boolean;
  order: number;
}

// Parse structured description: "Method: CLIA | Sample: SERUM | Volume: 2ML | TAT: 3-5 DAYS"
function parseDescription(desc: string) {
  const result: Record<string, string> = {};
  for (const part of desc.split("|")) {
    const colon = part.indexOf(":");
    if (colon === -1) continue;
    const key = part.slice(0, colon).trim().toLowerCase();
    const val = part.slice(colon + 1).trim();
    if (key === "method") result.method = val;
    else if (key === "sample") result.sample = val;
    else if (key === "volume") result.volume = val;
    else if (key === "tat") result.tat = val;
  }
  return result;
}

const PREREQUISITES = [
  "Avoiding specific foods and drinks such as cooked meats, herbal tea, or alcohol",
  "Making sure not to overeat the day before a test",
  "Not smoking, avoiding medicines and/or supplements. Be sure to talk with your provider about what you are currently taking",
  "Avoiding specific behaviors such as strenuous exercise or other activity",
];

function TestTubeIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/>
      <path d="M8.5 2h7"/>
      <path d="M7 16h10"/>
    </svg>
  );
}

function SyringeIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 2 4 4"/>
      <path d="m17 7 3-3"/>
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/>
      <path d="m9 11 4 4"/>
      <path d="m5 19-3 3"/>
      <path d="m14 4 6 6"/>
    </svg>
  );
}

function BeakerIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 3h15"/>
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/>
      <path d="M6 14h12"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function FlowerDecoration() {
  return (
    <div className="absolute top-0 right-0 opacity-20 pointer-events-none" style={{ width: 150, height: 150 }}>
      <svg viewBox="0 0 150 150" fill="none">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="75"
            cy="40"
            rx="18"
            ry="35"
            fill="#00B67A"
            transform={`rotate(${deg} 75 75)`}
          />
        ))}
        <circle cx="75" cy="75" r="20" fill="#00B67A" />
      </svg>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-100 rounded w-2/3 mb-6" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 mb-5">
          <div className="w-8 h-8 bg-gray-100 rounded-full shrink-0" />
          <div className="h-5 bg-gray-100 rounded w-1/2" />
        </div>
      ))}
      <div className="h-10 bg-gray-100 rounded w-1/4 mt-8 mb-4" />
      <div className="h-12 bg-gray-100 rounded-full w-40" />
    </div>
  );
}

function RecommendedCard({ service, index }: { service: Service; index: number }) {
  const pattern = index % 3;
  return (
    <Link
      href={`/services/lab-tests/${service.id}`}
      className="rounded-[10px] relative p-[30px] h-[200px] bg-white overflow-hidden block hover:-translate-y-1 transition-transform duration-200"
      style={{ boxShadow: "0 2px 8px 0 #0000001A" }}
    >
      {pattern === 0 && (
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="70" cy="70" r="60" fill="#DCFCE7" />
            <circle cx="85" cy="85" r="30" fill="#D4E6FF" />
          </svg>
        </div>
      )}
      {pattern === 1 && (
        <div className="absolute top-0 right-0 z-0 pointer-events-none">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <rect x="20" y="-10" width="80" height="80" rx="40" fill="#DCFCE7" />
            <rect x="45" y="-25" width="60" height="60" rx="30" fill="#D4E6FF" />
          </svg>
        </div>
      )}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <p
          className="text-[16px] font-medium leading-snug"
          style={{ color: "#00B67A", borderBottom: "1px solid #A4ADB6", paddingBottom: 12 }}
          title={service.title}
        >
          {service.title.length > 40 ? service.title.slice(0, 40) + "…" : service.title}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="font-bold text-[18px]" style={{ color: "#00B67A" }}>
            Rs.&nbsp;{service.price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm font-semibold flex items-center gap-1" style={{ color: "#00B67A" }}>
            Book Now
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function TestDetail({ id }: { id: string }) {
  // Virtual DOM state — React diffs this tree on each setState call
  const [service, setService] = useState<Service | null>(null);
  const [recommended, setRecommended] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/services/${id}`).then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
    ]).then(([detail, all]) => {
      if (!detail.success) {
        setNotFound(true);
      } else {
        const current: Service = detail.data;
        setService(current);

        const others: Service[] = (all.data ?? []).filter((s: Service) => s.id !== id);

        // Score each service by how many keywords from the current title match
        const keywords = current.title
          .toLowerCase()
          .split(/[\s,/\-()+]+/)
          .filter((w) => w.length > 3);

        const scored = others
          .map((s) => {
            const t = s.title.toLowerCase();
            const score = keywords.filter((k) => t.includes(k)).length;
            return { s, score };
          })
          .sort((a, b) => b.score - a.score);

        // Take up to 4 keyword-matched, fall back to featured, then any
        const matched = scored.filter((x) => x.score > 0).slice(0, 4).map((x) => x.s);
        if (matched.length < 4) {
          const used = new Set(matched.map((s) => s.id));
          const fill = others
            .filter((s) => !used.has(s.id) && s.featured)
            .slice(0, 4 - matched.length);
          matched.push(...fill);
        }
        if (matched.length < 4) {
          const used = new Set(matched.map((s) => s.id));
          const fill = others.filter((s) => !used.has(s.id)).slice(0, 4 - matched.length);
          matched.push(...fill);
        }

        setRecommended(matched.slice(0, 4));
      }
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section style={{ background: "#fcfcfc", minHeight: "80vh" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (notFound || !service) {
    return (
      <section style={{ background: "#fcfcfc", minHeight: "60vh" }} className="flex items-center justify-center">
        <div className="text-center py-24">
          <p className="text-lg mb-4" style={{ color: "#626A82" }}>Test not found.</p>
          <Link href="/services/lab-tests" className="text-sm font-semibold" style={{ color: "#00B67A" }}>
            ← Back to All Tests
          </Link>
        </div>
      </section>
    );
  }

  const parsed = parseDescription(service.description);

  return (
    <>
      {/* ── Hero Section ──────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#fcfcfc" }}>
        {/* Decorative page header background */}
        <div
          className="absolute top-[-100px] left-0 pointer-events-none z-0"
          style={{ width: 500, height: 500, background: "radial-gradient(circle at 0% 0%, #DCFCE7 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-[60px] pt-[30px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: "#8AA0D6" }}>
            <Link href="/" className="hover:text-[#00B67A] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services/lab-tests" className="hover:text-[#00B67A] transition-colors">Lab Tests</Link>
            <span>/</span>
            <span style={{ color: "#040B2F" }} className="line-clamp-1">{service.title}</span>
          </nav>

          {/* Test name + flower decoration */}
          <div className="relative md:pt-[60px] pt-[20px]">
            <h1 className="md:text-[36px] text-[24px] font-semibold leading-tight pr-[120px] md:pr-[160px]" style={{ color: "#040B2F" }}>
              {service.title}
            </h1>
            <FlowerDecoration />
          </div>

          {/* Info rows + price + CTA */}
          <div className="my-[50px] max-w-2xl">
            {parsed.method && (
              <div className="flex items-start my-[20px] gap-4">
                <span className="shrink-0"><TestTubeIcon /></span>
                <div className="md:text-[20px] text-[18px] font-medium" style={{ color: "#3D4A5C" }}>
                  {parsed.method}
                </div>
              </div>
            )}
            {parsed.sample && (
              <div className="flex items-start my-[20px] gap-4">
                <span className="shrink-0"><SyringeIcon /></span>
                <div className="md:text-[20px] text-[18px]" style={{ color: "#3D4A5C" }}>
                  {parsed.sample}
                </div>
              </div>
            )}
            {parsed.volume && (
              <div className="flex items-start my-[20px] gap-4">
                <span className="shrink-0"><BeakerIcon /></span>
                <div className="md:text-[20px] text-[18px] font-medium" style={{ color: "#3D4A5C" }}>
                  {parsed.volume}
                </div>
              </div>
            )}
            {parsed.tat && (
              <div className="flex items-start my-[20px] gap-4">
                <span className="shrink-0"><ClockIcon /></span>
                <div className="md:text-[20px] text-[18px]" style={{ color: "#3D4A5C" }}>
                  {parsed.tat}
                </div>
              </div>
            )}

            {/* Price */}
            <h2 className="my-[20px] font-medium md:text-[32px] text-[24px]" style={{ color: "#00B67A" }}>
              Rs.&nbsp;{service.price.toLocaleString("en-IN")}
            </h2>

            {/* Book Now button */}
            <Link
              href={`/appointments?test=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center gap-3 text-white md:text-[20px] text-[16px] transition-opacity hover:opacity-80"
              style={{
                background: "#00B67A",
                borderRadius: 40,
                padding: "14px 32px",
              }}
            >
              Book Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Preparation Tips ──────────────────────────── */}
      <section style={{ background: "#F8FAFF", borderTop: "1px solid #EEF2FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-[60px] py-[60px]">
          <h2 className="md:text-[36px] text-[24px] font-normal h-display mb-[40px]" style={{ color: "#040B2F" }}>
            <span style={{ color: "#00B67A" }}>Preparation</span> Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {PREREQUISITES.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-[10px] p-5 bg-white"
                style={{ boxShadow: "0 2px 8px 0 #0000000D", border: "1px solid #EEF2FB" }}
              >
                <span
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
                  style={{ background: "#DCFCE7", color: "#00B67A" }}
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "#5A6372" }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Tests ─────────────────────────────── */}
      {recommended.length > 0 && (
        <section style={{ background: "#fcfcfc" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-[60px] md:my-[80px] my-[50px]">
            <h3 className="md:text-[36px] text-[24px] h-display mb-[32px]" style={{ color: "#040B2F", fontWeight: 400 }}>
              <span style={{ color: "#00B67A" }}>Related</span> Tests
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] md:gap-[28px]">
              {recommended.map((s, i) => (
                <RecommendedCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back link ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-[60px] py-10" style={{ background: "#fcfcfc" }}>
        <Link
          href="/services/lab-tests"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: "#00B67A" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to All Tests
        </Link>
      </div>
    </>
  );
}
