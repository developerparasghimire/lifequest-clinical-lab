"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * Newsletter section with light/dark variants.
 * Front-end only — wires to /api/contact for storage if backend supports it.
 */
export default function Newsletter({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setMsg("You're subscribed — watch your inbox for our next health digest.");
      setEmail("");
    } catch {
      setStatus("err");
      setMsg("Something went wrong. Please try again.");
    }
  }

  const dark = variant === "dark";

  return (
    <section
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background: dark
          ? "linear-gradient(120deg, #020517 0%, #081a55 60%, #134CF7 110%)"
          : "linear-gradient(135deg, #F4F7FF 0%, #ffffff 100%)",
      }}
    >
      {/* Decorative orbs */}
      <div
        className={`absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none ${dark ? "" : "opacity-50"} animate-blob-1`}
        style={{ background: dark ? "rgba(0,198,255,0.20)" : "rgba(19,76,247,0.10)", filter: "blur(70px)" }}
      />
      <div
        className={`absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none animate-blob-2`}
        style={{ background: dark ? "rgba(19,76,247,0.30)" : "rgba(0,198,255,0.10)", filter: "blur(70px)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
          <div className={`grid gap-10 lg:grid-cols-2 lg:items-center rounded-2xl p-8 sm:p-12 ${dark ? "glass-dark" : "glass-light shadow-premium"}`}>
            <div>
              <div className={`lab-subtitle mb-4 ${dark ? "text-white/60" : ""}`} style={dark ? { color: "rgba(255,255,255,0.6)" } : undefined}>
                Stay informed
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight h-display"
                style={{ color: dark ? "#fff" : "#040B2F" }}
              >
                Health insights delivered to your{" "}
                <span style={{ color: dark ? "#93c5fd" : "#134CF7" }}>inbox monthly</span>.
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.7)" : "#444" }}>
                Practical tips, new test launches, and expert-curated articles —
                no spam, ever. Unsubscribe with one click.
              </p>
            </div>

            <form onSubmit={onSubmit} className="w-full">
              <div className={`flex flex-col sm:flex-row gap-3 ${dark ? "" : ""}`}>
                <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={dark
                    ? "flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-white/40 focus:ring-4 focus:ring-white/10 focus:outline-none transition-all"
                    : "input-pretty flex-1"
                  }
                  style={{ borderRadius: "12px" }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="lab-btn btn-shine btn-pop disabled:opacity-60 disabled:cursor-not-allowed justify-center"
                  style={{ borderRadius: "12px" }}
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </div>
              <p
                className={`text-xs mt-3 transition-colors ${status === "ok" ? "text-emerald-500" : status === "err" ? "text-rose-400" : ""}`}
                style={status === "idle" ? { color: dark ? "rgba(255,255,255,0.5)" : "#94A3B8" } : undefined}
              >
                {status === "idle"
                  ? "We respect your privacy. No spam, ever."
                  : msg}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
