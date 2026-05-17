"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { adminFetch } from "@/lib/admin-fetch";

const PAGE_SIZE = 50;

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  icon?: string;
  image?: string;
  featured: boolean;
  order: number;
}

const emptyForm = {
  title: "",
  description: "",
  price: "",
  icon: "",
  image: "",
  featured: false,
  order: "0",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/services");
    const data = await res.json();
    if (data.success) setServices(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [services, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: parseFloat(form.price),
      order: parseInt(form.order),
    };

    const res = editingId
      ? await adminFetch(`/api/services/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await adminFetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (res.ok) {
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchServices();
    }
    setSaving(false);
  };

  const startEdit = (s: Service) => {
    setForm({
      title: s.title,
      description: s.description,
      price: String(s.price),
      icon: s.icon || "",
      image: s.image || "",
      featured: s.featured,
      order: String(s.order),
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await adminFetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm">
            {filtered.length} of {services.length} services
            {search && <> matching &ldquo;{search}&rdquo;</>}
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setForm(emptyForm); setEditingId(null); }}
          className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors shrink-0"
        >
          + Add Service
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by title or description…"
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-5">
            {editingId ? "Edit Service" : "Add New Service"}
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price ($) *</label>
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
            <ImageUpload
              label="Service Image (optional)"
              value={form.image}
              onChange={(url) => setForm((p) => ({ ...p, image: url }))}
              hint="Recommended: 800×600 JPG/WebP."
            />
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Icon (emoji)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                  placeholder="🔬"
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

      {/* Services table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            {search ? `No services matching "${search}".` : "No services yet."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Service</th>
                <th className="px-5 py-3 text-left">Price</th>
                <th className="px-5 py-3 text-left">Order</th>
                <th className="px-5 py-3 text-left">Featured</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {s.image ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-none bg-slate-100">
                          <Image src={s.image} alt={s.title} fill sizes="40px" className="object-cover" />
                        </div>
                      ) : (
                        <span className="text-2xl flex-none">{s.icon || "🔬"}</span>
                      )}
                      <div>
                        <p className="font-medium text-slate-900">{s.title}</p>
                        <p className="text-slate-400 text-xs line-clamp-1">{s.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-blue-700">Rs. {s.price.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-4 text-slate-600">{s.order}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.featured ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {s.featured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => startEdit(s)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                      <button onClick={() => deleteService(s.id)} className="text-red-400 hover:text-red-600 text-xs font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
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
            {" "}— showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
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
