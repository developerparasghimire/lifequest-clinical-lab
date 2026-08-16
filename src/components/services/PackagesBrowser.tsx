"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  icon?: string | null;
  image?: string | null;
  tests: string;
  featured: boolean;
  active: boolean;
  order: number;
}

function SearchHeader({
  total,
  query,
  setQuery,
}: {
  total: number;
  query: string;
  setQuery: (v: string) => void;
}) {
  return (
    <div className="mb-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl shrink-0"
            style={{ background: "#DCFCE7" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold h-display" style={{ color: "#040B2F" }}>
            Life Quest Health Checkup Packages
          </h1>
        </div>

        <div className="w-full max-w-xl">
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ border: "1px solid #E2E6F0", background: "#fff" }}
          >
            <Search size={18} style={{ color: "#8AA0D6" }} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={"Search across " + total + " packages\u2026"}
              className="w-full bg-transparent text-sm outline-none sm:text-base"
              style={{ color: "#040B2F" }}
            />
          </div>
        </div>
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

function PackageCard({ pkg }: { pkg: Package }) {
  const testCount = pkg.tests
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean).length;

  return (
    <div
      className="group rounded-2xl flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 bg-white"
      style={{
        border: pkg.featured ? "2px solid #00B67A" : "1px solid #E2E6F0",
      }}
    >
      <div
        className="relative px-5 pt-5 pb-4"
        style={{ background: "#F0FDF9", borderBottom: "1px solid #E2E6F0" }}
      >
        {pkg.featured && (
          <span
            className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
            style={{ background: "#00B67A", color: "#fff" }}
          >
            Featured
          </span>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
          {testCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#5D6478" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/>
                <path d="M8.5 2h7"/><path d="M7 16h10"/>
              </svg>
              {testCount} tests available
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#5D6478" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            3 locations
          </div>
        </div>

        <h3
          className="font-bold leading-snug text-sm uppercase tracking-wide"
          style={{ color: "#040B2F" }}
        >
          {pkg.title}
        </h3>
      </div>

      <div className="px-5 py-4 flex items-center justify-between gap-3 mt-auto">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black" style={{ color: "#040B2F" }}>
            Rs.&nbsp;{pkg.price.toLocaleString("en-IN")}
          </span>
          {pkg.oldPrice ? (
            <span className="text-xs text-slate-400 line-through">
              Rs.&nbsp;{pkg.oldPrice.toLocaleString("en-IN")}
            </span>
          ) : null}
        </div>
        <Link
          href={"/appointments?test=" + encodeURIComponent(pkg.title)}
          className="lab-btn shrink-0"
          style={{ fontSize: "13px", padding: "9px 18px" }}
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold h-display mb-6" style={{ color: "#040B2F" }}>
      {children}
    </h2>
  );
}

const PAGE_SIZE = 24;

export default function PackagesBrowser() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => {
        if (data.success)
          setPackages(data.data.filter((p: Package) => p.active));
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return packages;
    return packages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tests.toLowerCase().includes(q),
    );
  }, [packages, query]);

  const recommended = filtered.filter((p) => p.featured).slice(0, 8);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visiblePackages = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-[#00B67A] border-t-transparent rounded-full animate-spin mb-4" />
        <p style={{ color: "#626A82" }}>Loading packages...</p>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <>
        <SearchHeader total={0} query={query} setQuery={setQuery} />
        <EmptyState label="packages" />
      </>
    );
  }

  return (
    <div>
      <SearchHeader total={packages.length} query={query} setQuery={setQuery} />

      {recommended.length > 0 && (
        <section className="mb-14">
          <SectionTitle>Recommended</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {recommended.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle>Packages</SectionTitle>
        {visiblePackages.length === 0 ? (
          <EmptyState label="packages" />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {visiblePackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((c) => Math.max(1, c - 1))}
                  disabled={safePage === 1}
                  className="rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-40"
                  style={{ border: "1px solid #DCDCDC", color: "#040B2F", background: "#fff" }}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className="h-10 w-10 rounded-xl text-sm font-semibold"
                    style={
                      n === safePage
                        ? { background: "#00B67A", color: "#fff" }
                        : { background: "#fff", color: "#040B2F", border: "1px solid #DCDCDC" }
                    }
                  >
                    {n}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setPage((c) => Math.min(totalPages, c + 1))}
                  disabled={safePage === totalPages}
                  className="rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-40"
                  style={{ border: "1px solid #DCDCDC", color: "#040B2F", background: "#fff" }}
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
