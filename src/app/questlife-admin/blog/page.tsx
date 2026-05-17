"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { adminFetch } from "@/lib/admin-fetch";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/blog");
    const data = await res.json();
    if (data.success) setPosts(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const togglePublish = async (id: string, published: boolean) => {
    const res = await adminFetch(`/api/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: !published } : p))
      );
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await adminFetch(`/api/blog/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-500 text-sm">{posts.length} posts</p>
        </div>
        <Link
          href="/questlife-admin/blog/new"
          className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <p className="text-4xl mb-3">📝</p>
            <p>No posts yet. Write your first article!</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Slug</th>
                <th className="px-5 py-3 text-left">Created</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900 line-clamp-1">{post.title}</p>
                    {post.excerpt && (
                      <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">{post.excerpt}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-500 font-mono text-xs">{post.slug}</td>
                  <td className="px-5 py-4 text-slate-500">{formatDate(post.createdAt)}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/questlife-admin/blog/${post.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => togglePublish(post.id, post.published)}
                        className="text-slate-500 hover:text-slate-700 text-xs font-medium"
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </button>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-slate-600 text-xs font-medium"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-400 hover:text-red-600 text-xs font-medium"
                      >
                        Delete
                      </button>
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
