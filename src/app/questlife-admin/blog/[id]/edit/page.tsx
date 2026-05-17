"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { adminFetch } from "@/lib/admin-fetch";

interface BlogForm {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
}

const empty: BlogForm = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  metaTitle: "",
  metaDescription: "",
  published: false,
};

export default function EditBlogPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<BlogForm>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await adminFetch(`/api/blog/${id}`);
      const data = await res.json();
      if (data.success) {
        const p = data.data;
        setForm({
          title: p.title,
          excerpt: p.excerpt || "",
          content: p.content,
          image: p.image || "",
          metaTitle: p.metaTitle || "",
          metaDescription: p.metaDescription || "",
          published: p.published,
        });
      } else {
        setError("Post not found.");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await adminFetch(`/api/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: form.image || null }),
    });
    const data = await res.json();

    setSaving(false);
    if (res.ok) {
      router.push("/questlife-admin/blog");
    } else {
      setError(data.error || "Failed to update post.");
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400">
        <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p>Loading post…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/questlife-admin/blog")}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Edit Blog Post</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Content block */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-800">Content</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Your article title..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt (short summary)</label>
            <textarea
              name="excerpt"
              rows={2}
              value={form.excerpt}
              onChange={handleChange}
              placeholder="Brief description shown in blog listing..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content *</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm((p) => ({ ...p, content: html }))}
              placeholder="Write your article content here. Use the toolbar to format text and insert images."
              minHeight={400}
            />
          </div>

          <ImageUpload
            label="Featured Image"
            value={form.image}
            onChange={(url) => setForm((p) => ({ ...p, image: url }))}
            hint="Recommended: 1200×630 JPG/WebP, under 3 MB."
          />
        </div>

        {/* SEO block */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">SEO Settings</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
              placeholder="SEO title (defaults to article title)"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900"
            />
            <p className="text-xs text-slate-400 mt-1">{form.metaTitle.length}/60 chars recommended</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
            <textarea
              name="metaDescription"
              rows={2}
              value={form.metaDescription}
              onChange={handleChange}
              placeholder="Description for search engines..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">{form.metaDescription.length}/160 chars recommended</p>
          </div>
        </div>

        {/* Publish / Actions */}
        <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-600"
            />
            <div>
              <p className="font-medium text-slate-900">Published</p>
              <p className="text-xs text-slate-400">Uncheck to revert to draft</p>
            </div>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/questlife-admin/blog")}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60"
            >
              {saving ? "Saving…" : "Update Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
