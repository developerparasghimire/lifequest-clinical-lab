"use client";

import { useEffect, useRef, useState } from "react";
import ImageUpload from "./ImageUpload";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

type ToolbarCmd =
  | { cmd: string; value?: string; label: string; title: string }
  | { type: "sep" };

const TOOLBAR: ToolbarCmd[] = [
  { cmd: "bold",         label: "B",    title: "Bold (Ctrl+B)" },
  { cmd: "italic",       label: "I",    title: "Italic (Ctrl+I)" },
  { cmd: "underline",    label: "U",    title: "Underline (Ctrl+U)" },
  { type: "sep" },
  { cmd: "formatBlock",  value: "H2",   label: "H2",   title: "Heading 2" },
  { cmd: "formatBlock",  value: "H3",   label: "H3",   title: "Heading 3" },
  { cmd: "formatBlock",  value: "P",    label: "¶",    title: "Paragraph" },
  { type: "sep" },
  { cmd: "insertUnorderedList",  label: "• List",  title: "Bullet list" },
  { cmd: "insertOrderedList",    label: "1. List", title: "Numbered list" },
  { type: "sep" },
  { cmd: "createLink",   label: "🔗",   title: "Insert link" },
  { cmd: "removeFormat", label: "✕ Fmt", title: "Remove formatting" },
];

export default function RichTextEditor({ value, onChange, placeholder = "Write your content here…", minHeight = 320 }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const savedRangeRef = useRef<Range | null>(null);

  // Set initial HTML once
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function exec(cmd: string, val?: string) {
    if (cmd === "createLink") {
      const url = window.prompt("Enter URL:", "https://");
      if (!url) return;
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand(cmd, false, val);
    }
    editorRef.current?.focus();
    syncValue();
  }

  function syncValue() {
    onChange(editorRef.current?.innerHTML ?? "");
  }

  // Save selection before opening image modal
  function openImageModal() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
    setImageUrl("");
    setImageAlt("");
    setShowImageModal(true);
  }

  function insertImage() {
    if (!imageUrl) return;
    // Restore selection
    const sel = window.getSelection();
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
    const img = `<img src="${imageUrl}" alt="${imageAlt || "image"}" style="max-width:100%;border-radius:8px;margin:12px 0;" />`;
    document.execCommand("insertHTML", false, img);
    syncValue();
    setShowImageModal(false);
  }

  const isEmpty = !value || value === "<br>" || value === "<p><br></p>";

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-slate-50 border-b border-slate-200">
        {TOOLBAR.map((item, i) => {
          if ("type" in item && item.type === "sep") {
            return <span key={i} className="w-px h-5 bg-slate-200 mx-1" />;
          }
          const btn = item as { cmd: string; value?: string; label: string; title: string };
          const isFormatting = ["bold", "italic", "underline"].includes(btn.cmd);
          return (
            <button
              key={i}
              type="button"
              title={btn.title}
              onMouseDown={(e) => {
                e.preventDefault(); // don't blur editor
                exec(btn.cmd, btn.value);
              }}
              className={`px-2.5 py-1 rounded text-sm font-medium transition-colors hover:bg-slate-200 hover:text-slate-900 text-slate-600 ${
                isFormatting && btn.cmd === "bold" ? "font-bold" : ""
              } ${
                isFormatting && btn.cmd === "italic" ? "italic" : ""
              } ${
                isFormatting && btn.cmd === "underline" ? "underline" : ""
              }`}
            >
              {btn.label}
            </button>
          );
        })}

        {/* Image insert button */}
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <button
          type="button"
          title="Insert image"
          onMouseDown={(e) => { e.preventDefault(); openImageModal(); }}
          className="px-2.5 py-1 rounded text-sm font-medium transition-colors hover:bg-slate-200 text-slate-600 flex items-center gap-1"
        >
          🖼 Image
        </button>
      </div>

      {/* Editable area */}
      <div className="relative">
        {isEmpty && (
          <p className="absolute top-4 left-4 right-4 text-slate-400 pointer-events-none select-none text-sm">
            {placeholder}
          </p>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={syncValue}
          onBlur={syncValue}
          style={{ minHeight, outline: "none" }}
          className="px-4 py-4 text-slate-900 text-sm leading-relaxed focus:outline-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_li]:mb-1 [&_a]:text-blue-600 [&_a]:underline [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-3 [&_strong]:font-bold [&_em]:italic"
        />
      </div>

      {/* Image insertion modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Insert Image</h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <ImageUpload
              label="Upload or use URL"
              value={imageUrl}
              onChange={setImageUrl}
              hint="Upload an image or paste a URL below."
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Or paste image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Alt text (description)</label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="e.g. Blood test result"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={insertImage}
                disabled={!imageUrl}
                className="flex-1 bg-blue-700 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-50 transition-colors"
              >
                Insert Image
              </button>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
