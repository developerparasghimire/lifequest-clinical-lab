"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Check } from "lucide-react";

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

export default function PackagesBrowser() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setPackages(data.data.filter((p: Package) => p.active));
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
        p.tests.toLowerCase().includes(q)
    );
  }, [packages, query]);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading packages…</p>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="py-24 text-center rounded-2xl border border-dashed" style={{ borderColor: "#DCDCDC", background: "#F6F6F6" }}>
        <p className="text-xl font-semibold mb-2" style={{ color: "#040B2F" }}>No packages available yet.</p>
        <p className="text-slate-500">Check back soon — we&apos;re curating our health packages.</p>
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search across ${packages.length} packages… (e.g. "full body", "diabetes")`}
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
          Showing <span className="font-bold text-slate-800">{filtered.length}</span> of{" "}
          <span className="font-bold text-slate-800">{packages.length}</span> packages
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
          <p className="font-semibold mb-5" style={{ color: "#040B2F" }}>No packages matched your search.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="lab-btn btn-pop"
            style={{ borderRadius: "10px" }}
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => {
            const tests = p.tests.split("\n").map((t) => t.trim()).filter(Boolean);
            const discount =
              p.oldPrice && p.oldPrice > p.price
                ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                : null;
            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border flex flex-col overflow-hidden card-lift transition-all duration-300"
                style={{ borderColor: p.featured ? "#134CF7" : "#DCDCDC", borderWidth: p.featured ? 2 : 1 }}
              >
                {/* Image / icon header */}
                {p.image ? (
                  <div className="relative h-48 bg-slate-100 flex-none">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {p.featured && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">Featured</span>
                      )}
                      {discount && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">Save {discount}%</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-24 flex items-center justify-center flex-none relative" style={{ background: "rgba(19,76,247,0.05)" }}>
                    <span className="text-5xl">{p.icon || "📦"}</span>
                    <div className="absolute top-3 left-3 flex gap-2">
                      {p.featured && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">Featured</span>
                      )}
                      {discount && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">Save {discount}%</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
                  <h3 className="font-bold leading-snug mb-2" style={{ fontSize: "18px", color: "#040B2F" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{p.description}</p>

                  {tests.length > 0 && (
                    <div className="mb-5">
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#aaa" }}>
                        Includes {tests.length} test{tests.length === 1 ? "" : "s"}
                      </p>
                      <ul className="space-y-1.5">
                        {tests.slice(0, 6).map((t, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <Check size={14} className="mt-0.5 flex-none text-blue-600" />
                            <span>{t}</span>
                          </li>
                        ))}
                        {tests.length > 6 && (
                          <li className="text-xs text-blue-600 font-semibold pl-6">
                            + {tests.length - 6} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t" style={{ borderColor: "#F0F0F0" }}>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#aaa" }}>Price</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black" style={{ color: "#134CF7" }}>
                          Rs.&nbsp;{p.price.toLocaleString("en-IN")}
                        </span>
                        {p.oldPrice ? (
                          <span className="text-xs text-slate-400 line-through">
                            Rs.&nbsp;{p.oldPrice.toLocaleString("en-IN")}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <Link
                      href={`/appointments?test=${encodeURIComponent(p.title)}`}
                      className="lab-btn btn-pop shrink-0"
                      style={{ fontSize: "13px", padding: "10px 18px", borderRadius: "8px" }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
