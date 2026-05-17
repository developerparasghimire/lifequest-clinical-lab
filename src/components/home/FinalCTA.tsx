"use client";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="py-28 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #020517 0%, #0c1f6e 55%, #134CF7 100%)" }}>
      {/* Decorative glow orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(19,76,247,0.25)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" style={{ background: "rgba(96,165,250,0.15)", filter: "blur(60px)" }} />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
        <div className="lab-subtitle justify-center mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
          <span style={{ background: "rgba(255,255,255,0.4)" }} />
          Get Started Today
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight h-display">
          Ready to Take Control of Your{" "}
          <span className="text-gradient">Health?</span>
        </h2>
        <p className="text-base mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
          Book your appointment online in minutes. Results delivered securely
          to your email — usually the same day.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link href="/appointments" className="lab-btn btn-shine btn-pop" style={{ fontSize: "15px", padding: "14px 36px", borderRadius: "10px" }}>
            <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
              <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Book Appointment Now
          </Link>
          <a href="tel:+97714002747" className="lab-btn-ghost btn-pop" style={{ fontSize: "15px", padding: "14px 32px", borderRadius: "10px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
            </svg>
            01-4002747
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6">
          {["No Hidden Fees", "Same-Day Results", "Home Collection", "ISO Certified"].map((b) => (
            <span key={b} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              <span className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.2)" }}>✓</span>
              {b}
            </span>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
