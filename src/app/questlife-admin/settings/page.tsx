"use client";

import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";

type Settings = Record<string, string>;

const FIELD_GROUPS: { title: string; fields: { key: string; label: string; type?: string; placeholder?: string; textarea?: boolean }[] }[] = [
  {
    title: "Contact Information",
    fields: [
      { key: "contact.phone",    label: "Primary Phone",   placeholder: "01-4002747" },
      { key: "contact.mobile",   label: "Mobile",          placeholder: "+977 9802302472" },
      { key: "contact.email",    label: "Email",           type: "email", placeholder: "lifequestclinicallab@gmail.com" },
      { key: "contact.address",  label: "Address",         placeholder: "Maharajgunj-03, Kathmandu" },
      { key: "contact.hours",    label: "Working Hours",   placeholder: "Sun–Fri 7:00–19:00, Sat 8:00–16:00" },
      { key: "contact.whatsapp", label: "WhatsApp Number", placeholder: "9779802302472 (without +)" },
      { key: "contact.mapEmbed", label: "Google Maps Embed URL", placeholder: "https://www.google.com/maps?q=...&output=embed", textarea: true },
      { key: "contact.mapLink",  label: "Open in Google Maps Link", type: "url", placeholder: "https://www.google.com/maps/place/..." },
    ],
  },
  {
    title: "About Page",
    fields: [
      { key: "about.mission", label: "Our Mission", textarea: true, placeholder: "Our laboratory's mission is to provide high quality laboratory services…" },
      { key: "about.vision",  label: "Our Vision",  textarea: true, placeholder: "To ensure that the entire laboratory examination procedures…" },
      { key: "about.story",   label: "Our Story (optional)", textarea: true, placeholder: "Founded in… we have grown to serve…" },
    ],
  },
  {
    title: "Footer & Brand",
    fields: [
      { key: "site.name",        label: "Site Name",       placeholder: "Life Quest Clinical Lab" },
      { key: "footer.tagline",   label: "Footer Tagline" },
      { key: "footer.copyright", label: "Footer Copyright" },
    ],
  },
  {
    title: "Social Links",
    fields: [
      { key: "social.facebook",  label: "Facebook URL",  type: "url", placeholder: "https://www.facebook.com/lifequestclinicallab" },
      { key: "social.instagram", label: "Instagram URL", type: "url", placeholder: "https://www.instagram.com/lifequestclinicallab" },
      { key: "social.twitter",   label: "Twitter / X URL", type: "url" },
    ],
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/settings");
    const data = await res.json();
    if (data.success) setSettings(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const res = await adminFetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (loading) return <div className="py-16 text-center text-slate-400">Loading settings…</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-slate-500 text-sm">Edit contact info, footer, and socials. Changes apply within ~1 minute.</p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {FIELD_GROUPS.map((group) => (
          <div key={group.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 text-lg mb-5">{group.title}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {group.fields.map((f) => {
                const fullWidth =
                  f.textarea ||
                  f.key === "footer.tagline" ||
                  f.key === "contact.address" ||
                  f.key === "contact.mapEmbed";
                return (
                  <div key={f.key} className={fullWidth ? "sm:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
                    {f.textarea ? (
                      <textarea
                        rows={f.key === "about.story" ? 5 : 3}
                        value={settings[f.key] || ""}
                        onChange={(e) => setSettings((p) => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 resize-y"
                      />
                    ) : (
                      <input
                        type={f.type || "text"}
                        value={settings[f.key] || ""}
                        onChange={(e) => setSettings((p) => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60">
            {saving ? "Saving..." : "Save All Settings"}
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">✓ Settings saved</span>}
        </div>
      </form>
    </div>
  );
}
