"use client";

import Image from "next/image";
import { useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

/**
 * Reusable image upload widget for admin panels. POSTs to /api/upload
 * (auth-protected) and calls `onChange` with the resulting public URL.
 */
export default function ImageUpload({ value, onChange, label = "Image", hint }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await adminFetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex-none">
            <Image src={value} alt="" fill sizes="112px" className="object-cover" />
          </div>
        ) : (
          <div className="w-28 h-20 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-300 text-2xl flex-none">
            🖼️
          </div>
        )}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
          {uploading && <p className="mt-1 text-xs text-blue-600">Uploading…</p>}
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
