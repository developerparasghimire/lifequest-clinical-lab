"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "@/data/services";
import Reveal from "@/components/ui/Reveal";

function AppointmentsInner() {
  const params = useSearchParams();
  const prefilledTest = params.get("test") ?? "";

  const testNames = useMemo(() => SERVICES.map((s) => s.name), []);

  const [form, setForm] = useState({
    name: "", phone: "", email: "", testType: prefilledTest, date: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (prefilledTest && !form.testType) setForm((p) => ({ ...p, testType: prefilledTest }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledTest]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Your appointment has been booked! A confirmation email is on its way.");
        setForm({ name: "", phone: "", email: "", testType: "", date: "", notes: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        <div className="absolute inset-0">
          <Image
            src="/cdc-XLhDvfz0sUM-unsplash.jpg"
            alt="Book appointment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(274deg, rgba(1,9,10,0.25) 30%, rgba(1,9,10,0.72) 65%, rgba(1,9,10,0.97))",
                "linear-gradient(1deg, rgba(1,9,10,0.15) 40%, rgba(1,9,10,0.5) 75%, rgba(1,9,10,0.88))",
              ].join(", "),
            }}
          />
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none animate-blob-1" style={{ background: "rgba(19,76,247,0.28)", filter: "blur(80px)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <Reveal>
          <div className="inline-flex items-center gap-2 mb-5 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#134CF7" }}>
            <span className="inline-block w-6 h-[2px] rounded" style={{ background: "#134CF7" }} />
            Life Quest Clinical Lab
          </div>
          <h1 className="font-bold leading-[1.07] tracking-tight mb-5 h-display" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff" }}>
            Book Your Test or Package in Under 2 Minutes
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            Pick any of our {SERVICES.length}+ individual tests or choose a curated health package, select a date, and our team will
            confirm your slot within working hours.
          </p>
          <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "#fff" }}>Appointments</span>
          </nav>
          </Reveal>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Form */}
            <Reveal direction="right" className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-premium p-5 sm:p-8">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Appointment Details</h2>
                <p className="text-slate-500 mb-7">Fill in your details and we will confirm your booking promptly.</p>

                {status === "success" && (
                  <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-medium">
                    ✅ {message}
                  </div>
                )}
                {status === "error" && (
                  <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-rose-800 text-sm font-medium">
                    ❌ {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                    <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                  </div>
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="testType">
                        Test / Service
                      </label>
                      <input
                        id="testType" name="testType" list="test-list"
                        value={form.testType} onChange={handleChange} required
                        placeholder="Start typing a test name…"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                      />
                      <datalist id="test-list">
                        {testNames.map((t) => <option key={t} value={t} />)}
                      </datalist>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="date">
                        Preferred Date
                      </label>
                      <input
                        id="date" name="date" type="date" required
                        min={minDate} value={form.date} onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="notes">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      id="notes" name="notes" rows={4} value={form.notes} onChange={handleChange}
                      placeholder="Fasting status, mobility needs, previous reports, etc."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit" disabled={status === "loading"}
                    className="lab-btn btn-pop w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ borderRadius: "10px", padding: "16px 32px" }}
                  >
                    {status === "loading" ? "Booking…" : "Confirm Appointment →"}
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Sidebar */}
            <Reveal direction="left" delay={0.1} as="aside" className="space-y-6">
              {[
                {
                  icon: "📞", gradient: "from-blue-500 to-cyan-400",
                  title: "Need Help?",
                  body: "Our team is available Sun–Fri 7:00–19:00 and Sat 8:00–16:00.",
                  cta: { label: "Call +977-1-4002747", href: "tel:+97714002747" },
                },
                {
                  icon: "📋", gradient: "from-violet-500 to-purple-400",
                  title: "Before Your Test",
                  items: [
                    "Fast 8–12 hours for fasting tests",
                    "Bring a valid photo ID",
                    "Arrive 10 minutes early",
                    "Bring previous reports if available",
                  ],
                },
                {
                  icon: "🕐", gradient: "from-emerald-500 to-teal-400",
                  title: "Lab Hours",
                  hours: [
                    { day: "Sunday – Friday", time: "7:00 – 19:00" },
                    { day: "Saturday",        time: "8:00 – 16:00" },
                  ],
                },
              ].map((card) => (
                <div key={card.title} className="bg-white rounded-3xl border border-slate-100 shadow-premium p-7 card-premium">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-xl mb-4 shadow-md`}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{card.title}</h3>
                  {card.body && <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>}
                  {card.cta && (
                    <a
                      href={card.cta.href}
                      className="lab-btn btn-pop mt-4 inline-flex items-center gap-2"
                      style={{ fontSize: "13px", padding: "10px 18px", borderRadius: "8px" }}
                    >
                      {card.cta.label}
                    </a>
                  )}
                  {card.items && (
                    <ul className="space-y-2">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-emerald-500 mt-0.5">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {card.hours && (
                    <ul className="space-y-2">
                      {card.hours.map((h) => (
                        <li key={h.day} className="flex justify-between text-sm">
                          <span className="text-slate-500">{h.day}</span>
                          <span className="font-bold text-slate-900">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={null}>
      <AppointmentsInner />
    </Suspense>
  );
}

function Field({ label, name, type = "text", value, onChange, required }: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor={name}>{label}</label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange} required={required}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
      />
    </div>
  );
}
