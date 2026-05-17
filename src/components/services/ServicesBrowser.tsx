"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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

const PAGE_SIZE = 50;

export default function ServicesBrowser() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setServices(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [services, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const go = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading services…</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="py-24 text-center rounded-2xl border border-dashed" style={{ borderColor: "#DCDCDC", background: "#F6F6F6" }}>
        <p className="text-xl font-semibold mb-2" style={{ color: "#040B2F" }}>No services available yet.</p>
        <p className="text-slate-500">Check back soon — we&apos;re updating our service list.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-5 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder={`Search across ${services.length} services… (e.g. "blood test", "thyroid")`}
            className="w-full py-4 pl-14 pr-5 text-base transition-all focus:outline-none"
            style={{
              borderRadius: "14px",
              border: "1.5px solid #DCDCDC",
              background: "#fff",
              color: "#040B2F",
            }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-slate-500">
          Showing{" "}
          <span className="font-bold text-slate-800">
            {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-800">{filtered.length}</span> services
          {query && (
            <>
              {" "}for <span className="text-blue-600 font-semibold">&ldquo;{query}&rdquo;</span>
            </>
          )}
        </p>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-20 text-center" style={{ borderColor: "#DCDCDC", background: "#F6F6F6" }}>
          <Search size={40} className="mx-auto mb-4 text-slate-300" />
          <p className="font-semibold mb-5" style={{ color: "#040B2F" }}>No services matched your search.</p>
          <button
            type="button"
            onClick={() => { setQuery(""); setPage(1); }}
            className="lab-btn btn-pop"
            style={{ borderRadius: "10px" }}
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((s) => (
            <div
              key={s.id}
              className="group bg-white rounded-2xl border flex flex-col overflow-hidden card-lift transition-all duration-300"
              style={{ borderColor: "#DCDCDC" }}
            >
              {/* Image or icon header */}
              {s.image ? (
                <div className="relative h-44 bg-slate-100 flex-none">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {s.featured && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              ) : (
                <div className="h-20 flex items-center justify-center flex-none relative" style={{ background: "rgba(19,76,247,0.05)" }}>
                  <span className="text-4xl">{s.icon || "🔬"}</span>
                  {s.featured && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
                <h3 className="font-bold leading-snug mb-2 line-clamp-2" style={{ fontSize: "15px", color: "#040B2F" }}>
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3 flex-1 mb-4">
                  {s.description}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t" style={{ borderColor: "#F0F0F0" }}>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#aaa" }}>Price</p>
                    <span className="text-lg font-black" style={{ color: "#134CF7" }}>
                      Rs.&nbsp;{s.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Link
                    href={`/appointments?test=${encodeURIComponent(s.title)}`}
                    className="lab-btn btn-pop shrink-0"
                    style={{ fontSize: "12px", padding: "9px 16px", borderRadius: "8px" }}
                  >
                    Book Test
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => go(safePage - 1)} disabled={safePage === 1}
            className="lab-btn-outline btn-pop disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderRadius: "8px", padding: "9px 18px", fontSize: "14px" }}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isActive = p === safePage;
            const isNear = Math.abs(p - safePage) <= 2 || p === 1 || p === totalPages;
            if (!isNear) {
              if (p === safePage - 3 || p === safePage + 3)
                return <span key={p} className="px-1 text-slate-400 text-sm">…</span>;
              return null;
            }
            return (
              <button
                key={p}
                onClick={() => go(p)}
                className="w-10 h-10 rounded-xl text-sm font-semibold transition-all btn-pop"
                style={isActive
                  ? { background: "#134CF7", color: "#fff", boxShadow: "0 2px 8px rgba(19,76,247,0.3)" }
                  : { background: "#fff", color: "#444", border: "1.5px solid #DCDCDC" }}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => go(safePage + 1)} disabled={safePage === totalPages}
            className="lab-btn-outline btn-pop disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderRadius: "8px", padding: "9px 18px", fontSize: "14px" }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
