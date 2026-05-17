"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const perks = ["No Hidden Fees", "Online Reports", "Home Collection", "ISO Certified"];

export default function BookingCTA() {
  const reduce = useReducedMotion();
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{
        backgroundImage: "url('/kropekk_pl-lab-313864_1920.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Layered overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(2,5,23,0.95) 35%, rgba(2,5,23,0.65) 100%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none animate-blob-1" style={{ background: "rgba(19,76,247,0.30)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <Reveal>
          <div className="lab-subtitle mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>Schedule Today</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight h-display">
            Ready for Your <span className="text-gradient">Appointment?</span>
          </h2>
          <p className="text-base mb-10 leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Book online in minutes. Get accurate results delivered securely to your email
            — usually the same day. Home sample collection available across the Kathmandu Valley.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/appointments" className="lab-btn btn-shine btn-pop inline-flex items-center gap-2" style={{ fontSize: "15px", padding: "14px 32px", borderRadius: "10px" }}>
              <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
                <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Book Appointment
            </Link>
            <a href="tel:+97714002747" className="lab-btn-ghost btn-pop" style={{ fontSize: "15px", borderRadius: "10px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
              </svg>
              01-4002747
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            {perks.map((b) => (
              <span
                key={b}
                className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full cursor-default transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full text-white text-[10px] font-bold" style={{ background: "#134CF7" }}>✓</span>
                {b}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Right — animated booking preview card */}
        <Reveal direction="left" delay={0.15}>
          <motion.div
            initial={false}
            animate={reduce ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Glow */}
            <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-60" style={{ background: "linear-gradient(135deg,#134CF7,#00c6ff)" }} />

            <div className="relative rounded-2xl glass-dark p-6 sm:p-7 shadow-premium">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg,#134CF7,#0a35c8)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">Appointment</p>
                    <p className="text-sm font-semibold text-white">Quick booking</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold uppercase tracking-wider">
                  Available
                </span>
              </div>

              <ul className="space-y-3">
                {[
                  { k: "Test", v: "Complete Blood Count" },
                  { k: "Date", v: "Tomorrow, 8:30 AM" },
                  { k: "Branch", v: "Tinkune (Kathmandu)" },
                  { k: "Fee", v: "Rs. 450" },
                ].map((row, i) => (
                  <motion.li
                    key={row.k}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0"
                  >
                    <span className="text-white/55">{row.k}</span>
                    <span className="font-semibold text-white">{row.v}</span>
                  </motion.li>
                ))}
              </ul>

              <Link
                href="/appointments"
                className="mt-6 inline-flex w-full justify-center items-center gap-2 rounded-xl py-3 text-sm font-semibold text-white btn-pop"
                style={{ background: "linear-gradient(135deg,#134CF7,#0a35c8)" }}
              >
                Confirm in 2 minutes
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>

              <p className="mt-3 text-center text-[11px] text-white/45">
                We confirm bookings within working hours.
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
