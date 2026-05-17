"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    if (!waNumber) {
      setStatus("error");
      setMsg("WhatsApp number not configured.");
      return;
    }
    const text = [
      `📋 New Contact Form Submission`,
      ``,
      `👤 Name: ${form.name}`,
      `📧 Email: ${form.email}`,
      form.phone ? `📞 Phone: ${form.phone}` : null,
      ``,
      `💬 Message:`,
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
    setStatus("success");
    setMsg("Opening WhatsApp… please press Send to complete your message.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-8 space-y-5">
      {status === "success" && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-medium">{msg}</div>
      )}
      {status === "error" && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-rose-800 text-sm font-medium">{msg}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Full Name" name="name"  value={form.name}  onChange={onChange} required />
        <Input label="Phone"     name="phone" type="tel" value={form.phone} onChange={onChange} required />
      </div>
      <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} value={form.message} onChange={onChange} required
          placeholder="How can we help you?"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all" />
      </div>
      <button type="submit"
        className="btn-shine w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
        Send on WhatsApp →
      </button>
    </form>
  );
}

function Input({ label, name, type = "text", value, onChange, required }: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} required={required}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all" />
    </div>
  );
}
