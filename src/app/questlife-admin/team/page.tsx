"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { adminFetch } from "@/lib/admin-fetch";

const INPUT = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  photo?: string | null;
  email?: string | null;
  phone?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  order: number;
  active: boolean;
}

const empty = {
  name: "", role: "", bio: "", photo: "",
  email: "", phone: "",
  facebook: "", twitter: "", linkedin: "",
  order: "0", active: true,
};

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/team");
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
      ? await adminFetch(`/api/team/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await adminFetch("/api/team",                { method: "POST",  headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { setShowForm(false); setEditingId(null); setForm(empty); load(); }
    setSaving(false);
  };

  const startEdit = (t: TeamMember) => {
    setForm({
      name: t.name, role: t.role, bio: t.bio || "", photo: t.photo || "",
      email: t.email || "", phone: t.phone || "",
      facebook: t.facebook || "", twitter: t.twitter || "", linkedin: t.linkedin || "",
      order: String(t.order), active: t.active,
    });
    setEditingId(t.id); setShowForm(true);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await adminFetch(`/api/team/${id}`, { method: "DELETE" });
    setItems((p) => p.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Meet Our Team</h1>
          <p className="text-slate-500 text-sm">{items.length} team members</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm(empty); }}
          className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800">+ Add Member</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-5">{editingId ? "Edit Team Member" : "New Team Member"}</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input required type="text" value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role / Designation *</label>
                <input required type="text" value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                  placeholder="Chief Pathologist"
                  className={INPUT} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
              <textarea rows={3} value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                className={`${INPUT} resize-none`} />
            </div>

            <ImageUpload label="Photo" value={form.photo}
              onChange={(url) => setForm((p) => ({ ...p, photo: url }))} />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input type="text" value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className={INPUT} />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Facebook URL</label>
                <input type="url" value={form.facebook}
                  onChange={(e) => setForm((p) => ({ ...p, facebook: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Twitter / X URL</label>
                <input type="url" value={form.twitter}
                  onChange={(e) => setForm((p) => ({ ...p, twitter: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                <input type="url" value={form.linkedin}
                  onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))}
                  className={INPUT} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
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
                  <span className="text-sm font-medium text-slate-700">Active (show on About page)</span>
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
          <div className="py-16 text-center text-slate-400">No team members yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Photo</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Contact</th>
                <th className="px-5 py-3 text-left">Order</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    {t.photo ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                        <Image src={t.photo} alt={t.name} fill sizes="48px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        {t.name.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-900">{t.name}</td>
                  <td className="px-5 py-4 text-slate-600">{t.role}</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">
                    {t.email && <div>{t.email}</div>}
                    {t.phone && <div>{t.phone}</div>}
                  </td>
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
