"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { adminFetch } from "@/lib/admin-fetch";

const PAGE_SIZE = 25;

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

const emptyForm = {
  title: "",
  description: "",
  price: "",
  oldPrice: "",
  icon: "",
  image: "",
  tests: "",
  featured: false,
  active: true,
  order: "0",
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/packages");
    const data = await res.json();
    if (data.success) setPackages(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return packages;
    return packages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tests.toLowerCase().includes(q)
    );
  }, [packages, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: parseFloat(form.price),
      oldPrice: form.oldPrice === "" ? null : parseFloat(form.oldPrice),
      order: parseInt(form.order || "0"),
    };

    const res = editingId
      ? await adminFetch(`/api/packages/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await adminFetch("/api/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (res.ok) {
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchPackages();
    }
    setSaving(false);
  };

  const startEdit = (p: Package) => {
    setForm({
      title: p.title,
      description: p.description,
      price: String(p.price),
      oldPrice: p.oldPrice == null ? "" : String(p.oldPrice),
      icon: p.icon || "",
      image: p.image || "",
      tests: p.tests || "",
      featured: p.featured,
      active: p.active,
      order: String(p.order),
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const deletePackage = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    await adminFetch(`/api/packages/${id}`, { method: "DELETE" });
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Packages</h1>
          <p className="text-slate-500 text-sm">
            {filtered.length} of {packages.length} packages
            {search && <> matching &ldquo;{search}&rdquo;</>}
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setForm(emptyForm); setEditingId(null); }}
          className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors shrink-0"
        >
          + Add Package
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by title, description or test name…"
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-5">
            {editingId ? "Edit Package" : "Add New Package"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900"
                  placeholder="e.g. Full Body Checkup"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Old price (optional)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.oldPrice}
                    onChange={(e) => setForm((p) => ({ ...p, oldPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tests included (one per line)</label>
              <textarea
                rows={6}
                value={form.tests}
                onChange={(e) => setForm((p) => ({ ...p, tests: e.target.value }))}
                placeholder={`CBC\nLiver Function Test\nKidney Function Test\nLipid Profile`}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 resize-y font-mono text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Add each test on a new line — these will be listed on the package card.</p>
            </div>
            <ImageUpload
              label="Package Image (optional)"
              value={form.image}
              onChange={(url) => setForm((p) => ({ ...p, image: url }))}
              hint="Recommended: 800×600 JPG/WebP."
            />
            <div className="grid sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Icon (emoji)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                  placeholder="📦"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Featured</span>
                </label>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            {search ? `No packages matching "${search}".` : "No packages yet. Click + Add Package to create one."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Package</th>
                <th className="px-5 py-3 text-left">Tests</th>
                <th className="px-5 py-3 text-left">Price</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.map((p) => {
                const testCount = p.tests.split("\n").map((t) => t.trim()).filter(Boolean).length;
                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-none bg-slate-100">
                            <Image src={p.image} alt={p.title} fill sizes="48px" className="object-cover" />
                          </div>
                        ) : (
                          <span className="text-2xl flex-none w-12 h-12 flex items-center justify-center bg-slate-50 rounded-lg">{p.icon || "📦"}</span>
                        )}
                        <div>
                          <p className="font-medium text-slate-900">{p.title}</p>
                          <p className="text-slate-400 text-xs line-clamp-1">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{testCount} test{testCount === 1 ? "" : "s"}</td>
                    <td className="px-5 py-4 font-medium text-blue-700">
                      Rs. {p.price.toLocaleString("en-IN")}
                      {p.oldPrice ? (
                        <span className="ml-1 text-xs text-slate-400 line-through">Rs. {p.oldPrice.toLocaleString("en-IN")}</span>
                      ) : null}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${p.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                          {p.active ? "Active" : "Inactive"}
                        </span>
                        {p.featured && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium w-fit bg-amber-100 text-amber-700">Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => startEdit(p)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                        <button onClick={() => deletePackage(p.id)} className="text-red-400 hover:text-red-600 text-xs font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-5 py-3">
          <p className="text-sm text-slate-500">
            Page <span className="font-semibold text-slate-800">{safePage}</span> of{" "}
            <span className="font-semibold text-slate-800">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
