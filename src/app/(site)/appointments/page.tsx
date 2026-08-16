"use client";
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
      {/* Hero Banner — NPL gradient style */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "380px",
          background: "linear-gradient(135deg, #040B2F 0%, #071a3e 55%, #0a2060 100%)",
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow blob */}
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "rgba(0,182,122,0.25)", filter: "blur(80px)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <Reveal>
            <h1 className="font-bold leading-[1.07] tracking-tight mb-5 h-display" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff" }}>
              Book Your Test or Package in Under 2 Minutes
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.80)" }}>
              Pick any of our {SERVICES.length}+ individual tests or choose a curated health package, select a date, and our team will
              confirm your slot within working hours.
            </p>
            <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
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
              <div className="npl-card bg-white p-5 sm:p-8">
                <h2 className="text-2xl font-bold mb-2" style={{ color: "#040B2F" }}>Appointment Details</h2>
                <p className="mb-7" style={{ color: "#40474F" }}>Fill in your details and we will confirm your booking promptly.</p>

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
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#40474F" }} htmlFor="testType">
                        Test / Service
                      </label>
                      <input
                        id="testType" name="testType" list="test-list"
                        value={form.testType} onChange={handleChange} required
                        placeholder="Start typing a test name…"
                        className="w-full rounded-2xl border px-4 py-3 transition-all focus:outline-none focus:ring-4"
                        style={{
                          borderColor: "#E2E6F0", background: "#F0FDF9", color: "#040B2F",
                        }}
                      />
                      <datalist id="test-list">
                        {testNames.map((t) => <option key={t} value={t} />)}
                      </datalist>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#40474F" }} htmlFor="date">
                        Preferred Date
                      </label>
                      <input
                        id="date" name="date" type="date" required
                        min={minDate} value={form.date} onChange={handleChange}
                        className="w-full rounded-2xl border px-4 py-3 transition-all focus:outline-none focus:ring-4"
                        style={{ borderColor: "#E2E6F0", background: "#F0FDF9", color: "#040B2F" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#40474F" }} htmlFor="notes">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      id="notes" name="notes" rows={4} value={form.notes} onChange={handleChange}
                      placeholder="Fasting status, mobility needs, previous reports, etc."
                      className="w-full rounded-2xl border px-4 py-3 transition-all focus:outline-none focus:ring-4"
                      style={{ borderColor: "#E2E6F0", background: "#F0FDF9", color: "#040B2F" }}
                    />
                  </div>

                  <button
                    type="submit" disabled={status === "loading"}
                    className="lab-btn btn-pop w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ padding: "16px 32px" }}
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
                  icon: "📞",
                  title: "Need Help?",
                  body: "Our team is available Sun–Fri 7:00–19:00 and Sat 8:00–16:00.",
                  cta: { label: "Call +977-1-4002747", href: "tel:+97714002747" },
                },
                {
                  icon: "📋",
                  title: "Before Your Test",
                  items: [
                    "Fast 8–12 hours for fasting tests",
                    "Bring a valid photo ID",
                    "Arrive 10 minutes early",
                    "Bring previous reports if available",
                  ],
                },
                {
                  icon: "🕐",
                  title: "Lab Hours",
                  hours: [
                    { day: "Sunday – Friday", time: "7:00 – 19:00" },
                    { day: "Saturday",        time: "8:00 – 16:00" },
                  ],
                },
              ].map((card) => (
                <div key={card.title} className="npl-card bg-white p-7">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: "#ECFDF5" }}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: "#040B2F" }}>{card.title}</h3>
                  {card.body && <p className="text-sm leading-relaxed" style={{ color: "#40474F" }}>{card.body}</p>}
                  {card.cta && (
                    <a
                      href={card.cta.href}
                      className="lab-btn btn-pop mt-4 inline-flex items-center gap-2"
                      style={{ fontSize: "13px", padding: "10px 18px" }}
                    >
                      {card.cta.label}
                    </a>
                  )}
                  {card.items && (
                    <ul className="space-y-2">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#40474F" }}>
                          <span className="mt-0.5" style={{ color: "#00B67A" }}>✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {card.hours && (
                    <ul className="space-y-2">
                      {card.hours.map((h) => (
                        <li key={h.day} className="flex justify-between text-sm">
                          <span style={{ color: "#40474F" }}>{h.day}</span>
                          <span className="font-bold" style={{ color: "#040B2F" }}>{h.time}</span>
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
      <label className="block text-sm font-semibold mb-2" style={{ color: "#40474F" }} htmlFor={name}>{label}</label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange} required={required}
        className="w-full rounded-2xl border px-4 py-3 transition-all focus:outline-none focus:ring-4"
        style={{ borderColor: "#E2E6F0", background: "#F0FDF9", color: "#040B2F" }}
      />
    </div>
  );
}
