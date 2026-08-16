"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

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

const PAGE_SIZE = 24;

function CardBg({ index }: { index: number }) {
  const pattern = index % 3;
  if (pattern === 0) {
    return (
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none overflow-hidden rounded-br-[10px]">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <circle cx="100" cy="100" r="80" fill="#DCFCE7" />
          <circle cx="120" cy="120" r="40" fill="#D4E6FF" />
        </svg>
      </div>
    );
  }
  if (pattern === 1) {
    return (
      <div className="absolute top-0 right-0 z-0 pointer-events-none overflow-hidden rounded-tr-[10px]">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="30" y="-10" width="100" height="100" rx="50" fill="#DCFCE7" />
          <rect x="60" y="-30" width="80" height="80" rx="40" fill="#D4E6FF" />
        </svg>
      </div>
    );
  }
  return null;
}

function SearchHeader({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-start md:mt-[60px] mt-8 gap-4">
        <h1
          className="md:text-[54px] text-[34px] font-normal h-display leading-tight"
          style={{ color: "#121417" }}
        >
          Life Quest Lab Inhouse Tests
        </h1>
        <svg
          className="md:w-[60px] w-[30px] md:h-[80px] h-[40px] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00B67A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2" />
          <path d="M8.5 2h7" />
          <path d="M7 16h10" />
        </svg>
      </div>
      <div className="relative mt-[40px] mb-[20px]">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 md:w-[24px] md:h-[24px] w-[20px] h-[20px]"
          style={{ color: "#8AA0D6" }}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a test"
          className="pl-12 block w-full text-sm min-h-[40px] outline-none shadow-sm focus:ring-1 focus:ring-[#00B67A]"
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "60px",
            color: "#040B2F",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div
      className="rounded-2xl px-5 py-10 text-center"
      style={{ background: "#F8FAFF", border: "1px solid #EEF2FB" }}
    >
      <p className="text-sm sm:text-base" style={{ color: "#626A82" }}>
        No {label} found.
      </p>
    </div>
  );
}

function parseDescription(description: string) {
  const parts = description.split("|").map((p) => p.trim());
  const result: { method?: string; sample?: string; tat?: string } = {};
  for (const part of parts) {
    const lower = part.toLowerCase();
    if (lower.startsWith("method:")) result.method = part.replace(/^method:\s*/i, "");
    else if (lower.startsWith("sample:")) result.sample = part.replace(/^sample:\s*/i, "");
    else if (lower.startsWith("tat:")) result.tat = part.replace(/^tat:\s*/i, "");
  }
  return result;
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start my-[18px]">
      <span className="shrink-0 mt-0.5" style={{ color: "#A4ADB6" }}>
        {icon}
      </span>
      <p className="ml-4 text-sm" style={{ color: "#5A6372" }}>
        <span className="font-medium" style={{ color: "#3D4A5C" }}>{label}:</span>{" "}
        {value}
      </p>
    </div>
  );
}

function TestCard({ service, index }: { service: Service; index: number }) {
  const truncatedTitle =
    service.title.length > 35
      ? service.title.substring(0, 35) + "…"
      : service.title;

  const { method, sample, tat } = parseDescription(service.description);

  return (
    <Link
      href={`/services/lab-tests/${service.id}`}
      className="rounded-[10px] relative p-[30px] h-[400px] bg-white overflow-hidden block hover:-translate-y-1 transition-transform duration-200"
      style={{ boxShadow: "0 2px 8px 0 #0000001A" }}
    >
      <CardBg index={index} />

      {/* Title */}
      <div className="relative z-10">
        <div
          className="text-[18px] h-[70px] py-[20px] font-medium leading-snug"
          style={{ color: "#00B67A", borderBottom: "1px solid #A4ADB6" }}
          title={service.title}
        >
          {truncatedTitle}
        </div>
      </div>

      {/* Info rows */}
      <div className="relative z-10">
        <InfoRow
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/>
              <path d="M8.5 2h7"/><path d="M7 16h10"/>
            </svg>
          }
          label="Method"
          value={method}
        />
        <InfoRow
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <line x1="10" y1="9" x2="8" y2="9"/>
            </svg>
          }
          label="Sample"
          value={sample}
        />
        <InfoRow
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          }
          label="TAT"
          value={tat}
        />
      </div>

      {/* Price + Book */}
      <div className="absolute bottom-4 z-10" style={{ width: "calc(100% - 60px)" }}>
        <div className="flex justify-between items-end">
          <span
            className="font-bold text-[20px]"
            style={{ color: "#00B67A" }}
          >
            Rs.&nbsp;{service.price.toLocaleString("en-IN")}
          </span>
          <span
            className="flex items-center gap-1 text-sm font-semibold"
            style={{ color: "#00B67A" }}
          >
            Book Now
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl sm:text-3xl font-bold h-display mb-6"
      style={{ color: "#040B2F" }}
    >
      {children}
    </h2>
  );
}

export default function ServicesBrowser() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/services")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setServices(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return services;
    return services.filter(
      (service) =>
        service.title.toLowerCase().includes(normalizedQuery) ||
        service.description.toLowerCase().includes(normalizedQuery),
    );
  }, [services, query]);

  const recommended = filtered.filter((service) => service.featured).slice(0, 8);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visibleTests = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-[#00B67A] border-t-transparent rounded-full animate-spin mb-4" />
        <p style={{ color: "#626A82" }}>Loading tests...</p>
      </div>
    );
  }

  return (
    <div>
      <SearchHeader query={query} setQuery={setQuery} />

      {recommended.length > 0 && (
        <section className="mb-14">
          <SectionTitle>Recommended</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:gap-[40px] gap-[20px]">
            {recommended.map((service, i) => (
              <TestCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle>All Tests</SectionTitle>
        {visibleTests.length === 0 ? (
          <EmptyState label="tests" />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:gap-[40px] gap-[20px] pt-3">
              {visibleTests.map((service, i) => (
                <TestCard key={service.id} service={service} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={safePage === 1}
                  className="rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-40"
                  style={{
                    border: "1px solid #DCDCDC",
                    color: "#040B2F",
                    background: "#fff",
                  }}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className="h-10 w-10 rounded-xl text-sm font-semibold"
                      style={
                        pageNumber === safePage
                          ? { background: "#00B67A", color: "#fff" }
                          : {
                              background: "#fff",
                              color: "#040B2F",
                              border: "1px solid #DCDCDC",
                            }
                      }
                    >
                      {pageNumber}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  disabled={safePage === totalPages}
                  className="rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-40"
                  style={{
                    border: "1px solid #DCDCDC",
                    color: "#040B2F",
                    background: "#fff",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
