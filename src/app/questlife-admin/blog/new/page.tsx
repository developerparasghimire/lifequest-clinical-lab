"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { adminFetch } from "@/lib/admin-fetch";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    const res = await adminFetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageUrl || undefined }),
    });
    const data = await res.json();

    if (res.ok) {
      router.push("/questlife-admin/blog");
    } else {
      setError(data.error || "Failed to create post.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">New Blog Post</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-800">Content</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title *
            </label>
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
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Excerpt (short summary)
            </label>
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
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Content *
            </label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm((p) => ({ ...p, content: html }))}
              placeholder="Write your article content here. Use the toolbar to format text and insert images."
              minHeight={400}
            />
          </div>

          <ImageUpload
            label="Featured Image"
            value={imageUrl}
            onChange={setImageUrl}
            hint="Recommended: 1200×630 JPG/WebP, under 3 MB."
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">SEO Settings</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Meta Title
            </label>
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
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Meta Description
            </label>
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
              <p className="font-medium text-slate-900">Publish immediately</p>
              <p className="text-xs text-slate-400">Uncheck to save as draft</p>
            </div>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : form.published ? "Publish Post" : "Save Draft"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
