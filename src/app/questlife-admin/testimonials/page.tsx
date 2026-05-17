"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import { adminFetch } from "@/lib/admin-fetch";

const INPUT = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

interface Testimonial {
  id: string;
  name: string;
  role?: string | null;
  content: string;
  rating: number;
  avatar?: string | null;
  order: number;
  active: boolean;
}

const empty = { name: "", role: "", content: "", rating: "5", avatar: "", order: "0", active: true };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/testimonials");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, rating: Number(form.rating), order: Number(form.order) };
    const res = editingId
      ? await adminFetch(`/api/testimonials/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await adminFetch("/api/testimonials",                { method: "POST",  headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { setShowForm(false); setEditingId(null); setForm(empty); load(); }
    setSaving(false);
  };

  const startEdit = (t: Testimonial) => {
    setForm({
      name: t.name, role: t.role || "", content: t.content,
      rating: String(t.rating), avatar: t.avatar || "",
      order: String(t.order), active: t.active,
    });
    setEditingId(t.id); setShowForm(true);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await adminFetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setItems((p) => p.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-500 text-sm">{items.length} testimonials</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm(empty); }}
          className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800">+ Add Testimonial</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-5">{editingId ? "Edit Testimonial" : "New Testimonial"}</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                <input required type="text" value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role / Location</label>
                <input type="text" value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                  placeholder="Patient, Kathmandu"
                  className={INPUT} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Content *</label>
              <textarea required rows={3} value={form.content}
                onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                className={`${INPUT} resize-none`} />
            </div>
            <ImageUpload label="Avatar (optional)" value={form.avatar}
              onChange={(url) => setForm((p) => ({ ...p, avatar: url }))} />
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5)</label>
                <input type="number" min="1" max="5" value={form.rating}
                  onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                <input type="number" value={form.order}
                  onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))}
                  className={INPUT} />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.active}
                    onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60">
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-200">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-slate-400">No testimonials yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Content</th>
                <th className="px-5 py-3 text-left">Rating</th>
                <th className="px-5 py-3 text-left">Order</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">{t.name}</p>
                    {t.role && <p className="text-xs text-slate-400">{t.role}</p>}
                  </td>
                  <td className="px-5 py-4 text-slate-600 max-w-md"><p className="line-clamp-2">{t.content}</p></td>
                  <td className="px-5 py-4 text-amber-500">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</td>
                  <td className="px-5 py-4 text-slate-600">{t.order}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {t.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => startEdit(t)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold">Edit</button>
                      <button onClick={() => remove(t.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
