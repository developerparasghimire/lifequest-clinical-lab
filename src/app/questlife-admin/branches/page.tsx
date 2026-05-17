"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { adminFetch } from "@/lib/admin-fetch";

const INPUT = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone?: string | null;
  email?: string | null;
  hours?: string | null;
  mapUrl?: string | null;
  mapEmbed?: string | null;
  image?: string | null;
  order: number;
  active: boolean;
}

const empty = { name: "", address: "", phone: "", email: "", hours: "", mapUrl: "", mapEmbed: "", image: "", order: "0", active: true };

export default function AdminBranchesPage() {
  const [items, setItems] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/branches");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, order: Number(form.order) };
    const res = editingId
      ? await adminFetch(`/api/branches/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await adminFetch("/api/branches",               { method: "POST",  headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { setShowForm(false); setEditingId(null); setForm(empty); load(); }
    setSaving(false);
  };

  const startEdit = (b: Branch) => {
    setForm({
      name: b.name, address: b.address, phone: b.phone || "",
      email: b.email || "", hours: b.hours || "", mapUrl: b.mapUrl || "",
      mapEmbed: b.mapEmbed || "", image: b.image || "", order: String(b.order), active: b.active,
    });
    setEditingId(b.id); setShowForm(true);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this branch?")) return;
    await adminFetch(`/api/branches/${id}`, { method: "DELETE" });
    setItems((p) => p.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Branches</h1>
          <p className="text-slate-500 text-sm">{items.length} locations</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(empty); }}
          className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
        >
          + Add Branch
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-5">{editingId ? "Edit Branch" : "New Branch"}</h2>
          <form onSubmit={submit} className="space-y-4">

            {/* Row 1 – Name & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Branch Name *</label>
                <input required type="text" value={form.name} placeholder="e.g. Kathmandu – Maharajgunj"
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input type="tel" value={form.phone} placeholder="+977 01-4002747"
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className={INPUT} />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
              <textarea required rows={2} value={form.address} placeholder="Maharajgunj-03, Kathmandu, Nepal"
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                className={`${INPUT} resize-none`} />
            </div>

            {/* Row 2 – Email & Hours */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={form.email} placeholder="branch@lifequestlab.com"
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Working Hours</label>
                <input type="text" value={form.hours} placeholder="Sun–Fri 7:00–19:00, Sat 8:00–16:00"
                  onChange={(e) => setForm((p) => ({ ...p, hours: e.target.value }))}
                  className={INPUT} />
              </div>
            </div>

            {/* Google Maps URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Google Maps Share URL</label>
              <input type="url" value={form.mapUrl} placeholder="https://maps.google.com/?q=..."
                onChange={(e) => setForm((p) => ({ ...p, mapUrl: e.target.value }))}
                className={INPUT} />
              <p className="text-xs text-slate-400 mt-1">Paste the &quot;Share&quot; link from Google Maps (used for the &quot;View on Maps&quot; button).</p>
            </div>

            {/* Google Maps Embed */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Google Maps Embed URL</label>
              <textarea rows={2} value={form.mapEmbed}
                placeholder="https://www.google.com/maps/embed?pb=..."
                onChange={(e) => setForm((p) => ({ ...p, mapEmbed: e.target.value }))}
                className={`${INPUT} resize-none font-mono text-xs`} />
              <p className="text-xs text-slate-400 mt-1">
                In Google Maps → Share → <strong>Embed a map</strong> → copy only the <code>src=&quot;...&quot;</code> URL.
              </p>
              {/* Live preview */}
              {form.mapEmbed && (
                <div className="mt-2 rounded-xl overflow-hidden border border-slate-200" style={{ height: 180 }}>
                  <iframe
                    title="Map preview"
                    src={form.mapEmbed}
                    width="100%" height="180"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>

            {/* Branch Photo */}
            <ImageUpload
              label="Branch Photo (optional)"
              value={form.image}
              onChange={(url) => setForm((p) => ({ ...p, image: url }))}
              hint="Recommended: 800×500 JPG/WebP, under 3 MB."
            />

            {/* Row 3 – Order & Active */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                <input type="number" min="0" value={form.order}
                  onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))}
                  className={INPUT} />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={form.active}
                    onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Active (visible on site)</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving}
                className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60 transition-colors">
                {saving ? "Saving..." : editingId ? "Update Branch" : "Create Branch"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <p className="text-4xl mb-3">📍</p>
            <p>No branches yet. Add your first location!</p>
          </div>
        ) : (
          items.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Map embed preview or photo */}
              {b.mapEmbed ? (
                <div className="relative" style={{ height: 160 }}>
                  <iframe
                    title={b.name}
                    src={b.mapEmbed}
                    width="100%" height="160"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase z-10 ${b.active ? "bg-green-500 text-white" : "bg-slate-600 text-white"}`}>
                    {b.active ? "Active" : "Hidden"}
                  </span>
                </div>
              ) : b.image ? (
                <div className="relative h-40 bg-slate-100">
                  <Image src={b.image} alt={b.name} fill sizes="400px" className="object-cover" />
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${b.active ? "bg-green-500 text-white" : "bg-slate-600 text-white"}`}>
                    {b.active ? "Active" : "Hidden"}
                  </span>
                </div>
              ) : (
                <div className="h-20 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <span className="text-3xl">📍</span>
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-slate-900">{b.name}</h3>
                  {!b.image && !b.mapEmbed && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-none ${b.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {b.active ? "Active" : "Hidden"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-2">{b.address}</p>
                <div className="space-y-0.5">
                  {b.phone && <p className="text-xs text-slate-500">📞 {b.phone}</p>}
                  {b.email && <p className="text-xs text-slate-500">✉️ {b.email}</p>}
                  {b.hours && <p className="text-xs text-slate-500">🕒 {b.hours}</p>}
                  {b.mapUrl && (
                    <a href={b.mapUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-700">
                      🗺 View on Maps
                    </a>
                  )}
                </div>
                <div className="flex gap-3 mt-4 pt-3 border-t border-slate-100">
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

