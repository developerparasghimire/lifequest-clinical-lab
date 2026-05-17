"use client";

import { useState, useEffect, useCallback } from "react";
import { formatDateTime } from "@/lib/utils";
import { adminFetch } from "@/lib/admin-fetch";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/contact");
    const data = await res.json();
    if (data.success) setMessages(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markRead = async (id: string) => {
    await adminFetch(`/api/contact/${id}`, { method: "PATCH" });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await adminFetch(`/api/contact/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) markRead(msg.id);
  };

  const filtered = filter === "unread" ? messages.filter((m) => !m.read) : messages;
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Messages
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-normal">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-slate-500 text-sm">{messages.length} total</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${filter === "all" ? "bg-blue-700 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${filter === "unread" ? "bg-blue-700 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
          >
            Unread
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Message list */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-slate-400">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <p className="text-4xl mb-3">✉️</p>
              <p>No messages found.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={`w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors ${
                    selected?.id === msg.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!msg.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                        )}
                        <p className={`font-medium truncate ${msg.read ? "text-slate-700" : "text-slate-900"}`}>
                          {msg.name}
                        </p>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{msg.email}</p>
                      <p className="text-sm text-slate-500 truncate mt-1">{msg.message}</p>
                    </div>
                    <p className="text-xs text-slate-400 flex-shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message detail */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">{selected.name}</h2>
                  <p className="text-slate-500 text-sm">{selected.email}</p>
                  {selected.phone && (
                    <p className="text-slate-500 text-sm">{selected.phone}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">{formatDateTime(selected.createdAt)}</p>
                </div>
                <button
                  onClick={() => deleteMessage(selected.id)}
                  className="text-red-400 hover:text-red-600 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
              <div className="mt-4">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your message to Life Quest Clinical Lab`}
                  className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition-colors text-sm"
                >
                  ✉️ Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10">
              <p className="text-5xl mb-3">👆</p>
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
