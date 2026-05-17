"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getStatusColor, formatDateTime } from "@/lib/utils";
import { adminFetch } from "@/lib/admin-fetch";

interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  testType: string;
  date: string;
  status: string;
  notes?: string;
  createdAt: string;
}

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

const STATUS_COUNT_COLORS: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const emptyNew = { name: "", phone: "", email: "", testType: "", date: "", notes: "", status: "pending" };

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newForm, setNewForm] = useState(emptyNew);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  // Edit notes state
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/appointments");
      const data = await res.json();
      if (data.success) setAppointments(data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await adminFetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
      }
    } finally {
      setUpdating(null);
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment?")) return;
    await adminFetch(`/api/appointments/${id}`, { method: "DELETE" });
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const createAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
    const res = await adminFetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newForm),
    });
    const data = await res.json();
    setCreating(false);
    if (res.ok) {
      setShowCreate(false);
      setNewForm(emptyNew);
      fetchAppointments();
    } else {
      setCreateError(data.error || "Failed to create appointment.");
    }
  };

  const saveNotes = async (id: string) => {
    setSavingNotes(true);
    await adminFetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: notesValue }),
    });
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, notes: notesValue } : a))
    );
    setSavingNotes(false);
    setEditingNotes(null);
  };

  const filtered =
    filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  // Count per status for tab badges
  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = appointments.filter((a) => a.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm">{appointments.length} total</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchAppointments}
            className="text-sm text-slate-500 hover:text-slate-700 font-medium border border-slate-200 bg-white px-4 py-2 rounded-xl"
          >
            ↻ Refresh
          </button>
          <button
            onClick={() => { setShowCreate(true); setCreateError(""); }}
            className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors text-sm"
          >
            + Add Appointment
          </button>
        </div>
      </div>

      {/* Create Appointment Modal */}
      {showCreate && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-5">New Appointment</h2>
          {createError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm">{createError}</div>
          )}
          <form onSubmit={createAppointment} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name *</label>
                <input required type="text" value={newForm.name}
                  onChange={(e) => setNewForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                <input required type="text" value={newForm.phone}
                  onChange={(e) => setNewForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                <input required type="email" value={newForm.email}
                  onChange={(e) => setNewForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Appointment Date *</label>
                <input required type="date" value={newForm.date}
                  onChange={(e) => setNewForm((p) => ({ ...p, date: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Test / Service Requested *</label>
              <input required type="text" value={newForm.testType}
                onChange={(e) => setNewForm((p) => ({ ...p, testType: e.target.value }))}
                placeholder="e.g. Complete Blood Count (CBC)"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Initial Status</label>
                <select value={newForm.status}
                  onChange={(e) => setNewForm((p) => ({ ...p, status: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 bg-white focus:outline-none focus:border-blue-500">
                  {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                <input type="text" value={newForm.notes}
                  onChange={(e) => setNewForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Optional internal notes"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={creating}
                className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60">
                {creating ? "Creating..." : "Create Appointment"}
              </button>
              <button type="button" onClick={() => setShowCreate(false)}
                className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Status summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(filter === s ? "all" : s)}
            className={`rounded-2xl border p-4 text-left transition-all ${
              filter === s
                ? "border-blue-400 bg-blue-50 ring-2 ring-blue-200"
                : "bg-white border-slate-200 hover:border-blue-300"
            }`}
          >
            <p className={`inline-block text-xs font-bold uppercase px-2 py-0.5 rounded-full mb-2 ${STATUS_COUNT_COLORS[s]}`}>
              {s}
            </p>
            <p className="text-2xl font-bold text-slate-900">{counts[s] ?? 0}</p>
          </button>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium capitalize transition-colors ${
              filter === s
                ? "bg-blue-700 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
            }`}
          >
            {s === "all" ? `All (${appointments.length})` : `${s} (${counts[s] ?? 0})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <p className="text-4xl mb-3">📅</p>
            <p>No appointments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-5 py-3 text-left w-6"></th>
                  <th className="px-5 py-3 text-left">Patient</th>
                  <th className="px-5 py-3 text-left">Contact</th>
                  <th className="px-5 py-3 text-left">Test Requested</th>
                  <th className="px-5 py-3 text-left">Appt. Date</th>
                  <th className="px-5 py-3 text-left">Booked On</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((apt) => (
                  <React.Fragment key={apt.id}>
                    <tr
                      className="hover:bg-slate-50 cursor-pointer"
                      onClick={() => setExpanded(expanded === apt.id ? null : apt.id)}
                    >
                      <td className="px-5 py-4 text-slate-400 text-xs">
                        {expanded === apt.id ? "▲" : "▼"}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">{apt.name}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-slate-700">{apt.phone}</p>
                        <p className="text-slate-400 text-xs">{apt.email}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-700 max-w-[200px]">
                        <p className="line-clamp-2 leading-snug">{apt.testType}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-700 whitespace-nowrap">
                        {new Date(apt.date).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                        {formatDateTime(apt.createdAt)}
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={apt.status}
                          disabled={updating === apt.id}
                          onChange={(e) => updateStatus(apt.id, e.target.value)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200 ${getStatusColor(apt.status)}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-white text-slate-900 font-normal">
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => deleteAppointment(apt.id)}
                          className="text-red-400 hover:text-red-600 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {expanded === apt.id && (
                      <tr key={`${apt.id}-notes`} className="bg-blue-50">
                        <td colSpan={8} className="px-10 py-4">
                          <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Full Test / Notes</p>
                              <p className="text-slate-800">{apt.testType}</p>
                              {editingNotes === apt.id ? (
                                <div className="mt-2 flex gap-2 items-start">
                                  <textarea
                                    rows={2}
                                    value={notesValue}
                                    onChange={(e) => setNotesValue(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <button onClick={() => saveNotes(apt.id)} disabled={savingNotes}
                                      className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-medium disabled:opacity-60">
                                      {savingNotes ? "…" : "Save"}
                                    </button>
                                    <button onClick={() => setEditingNotes(null)}
                                      className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-2 flex items-start gap-2">
                                  <p className="text-slate-600 italic flex-1">{apt.notes || "No notes"}</p>
                                  <button
                                    onClick={() => { setEditingNotes(apt.id); setNotesValue(apt.notes || ""); }}
                                    className="text-blue-500 hover:text-blue-700 text-xs font-medium flex-none"
                                  >
                                    Edit notes
                                  </button>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Contact Details</p>
                              <p className="text-slate-800">{apt.name}</p>
                              <p className="text-slate-600">{apt.phone}</p>
                              <p className="text-slate-600">{apt.email}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
