"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { adminFetch } from "@/lib/admin-fetch";

const INPUT = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

interface Banner {
  id: string;
  page: string;
  title: string;
  subtitle?: string | null;
  image: string;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  active: boolean;
}

const PAGE_OPTIONS = ["home", "about", "services", "blog", "contact", "appointments"];

const empty = {
  page: "home",
  title: "",
  subtitle: "",
  image: "",
  ctaLabel: "",
  ctaHref: "",
  active: true,
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/banners");
    const data = await res.json();
    if (data.success) setBanners(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = editingId
      ? await adminFetch(`/api/banners/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      : await adminFetch("/api/banners",                 { method: "POST",  headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      setShowForm(false); setEditingId(null); setForm(empty); fetchAll();
    }
    setSaving(false);
  };

  const startEdit = (b: Banner) => {
    setForm({
      page: b.page, title: b.title, subtitle: b.subtitle || "",
      image: b.image, ctaLabel: b.ctaLabel || "", ctaHref: b.ctaHref || "",
      active: b.active,
    });
    setEditingId(b.id); setShowForm(true);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    await adminFetch(`/api/banners/${id}`, { method: "DELETE" });
    setBanners((p) => p.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Page Banners</h1>
          <p className="text-slate-500 text-sm">{banners.length} banners — one per page</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(empty); }}
          className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800"
        >+ Add / Replace Banner</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-5">{editingId ? "Edit Banner" : "New / Replace Banner"}</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Page *</label>
                <select
                  required disabled={!!editingId}
                  value={form.page}
                  onChange={(e) => setForm((p) => ({ ...p, page: e.target.value }))}
                  className={`${INPUT} bg-white disabled:bg-slate-50 disabled:text-slate-500`}
                >
                  {PAGE_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {!editingId && <p className="text-xs text-slate-400 mt-1">Will replace existing banner for this page.</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input required type="text" value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
              <textarea rows={2} value={form.subtitle}
                onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                className={`${INPUT} resize-none`} />
            </div>
            <ImageUpload
              label="Banner Image *"
              value={form.image}
              onChange={(url) => setForm((p) => ({ ...p, image: url }))}
              hint="Recommended: 1920×600 JPG/WebP, under 5 MB."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CTA Button Label</label>
                <input type="text" value={form.ctaLabel}
                  onChange={(e) => setForm((p) => ({ ...p, ctaLabel: e.target.value }))}
                  placeholder="Book a Test"
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CTA Link</label>
                <input type="text" value={form.ctaHref}
                  onChange={(e) => setForm((p) => ({ ...p, ctaHref: e.target.value }))}
                  placeholder="/appointments"
                  className={INPUT} />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.active}
                onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm font-medium text-slate-700">Active (visible on site)</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving || !form.image}
                className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60">
                {saving ? "Saving..." : editingId ? "Update" : "Save"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-200">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400">Loading...</div>
        ) : banners.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400">No banners yet.</div>
        ) : (
          banners.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="relative h-36 bg-slate-100">
                {b.image && <Image src={b.image} alt={b.title} fill className="object-cover" sizes="400px" />}
                <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold uppercase ${b.active ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>
                  {b.page}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 line-clamp-1">{b.title}</h3>
                {b.subtitle && <p className="text-xs text-slate-500 line-clamp-2 mt-1">{b.subtitle}</p>}
                <div className="flex gap-3 mt-3">
                  <button onClick={() => startEdit(b)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold">Edit</button>
                  <button onClick={() => remove(b.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
