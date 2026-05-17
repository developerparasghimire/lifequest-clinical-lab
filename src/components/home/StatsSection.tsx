"use client";
import Counter from "@/components/ui/Counter";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

const stats: { value: number; suffix: string; compact?: boolean; label: string }[] = [
  { value: 529,   suffix: "+", label: "Lab Tests Available" },
  { value: 50000, suffix: "+", compact: true, label: "Patients Served" },
  { value: 3,     suffix: "",  label: "Branches in Nepal" },
  { value: 10,    suffix: "+", label: "Years Experience" },
];

const whyUs = [
  {
    title: "Accurate & Reliable",
    desc: "Our accredited laboratory ensures precise test results you can count on.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    title: "Advanced Technology",
    desc: "State-of-the-art automated analysers with real-time quality control protocols.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: "Certified Experts",
    desc: "Expert pathologists and scientists with decades of combined clinical experience.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M16 16H8a4 4 0 0 0-4 4"/><path d="M17 3l1.5 1.5L21 2"/>
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#020517" }}>
      {/* Decorative bg text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-black uppercase leading-none select-none pointer-events-none opacity-[0.04] text-white whitespace-nowrap">
        LAB
      </div>
      {/* Soft glows */}
      <div className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full pointer-events-none animate-blob-1" style={{ background: "rgba(19,76,247,0.30)", filter: "blur(80px)" }} />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none animate-blob-2" style={{ background: "rgba(0,198,255,0.18)", filter: "blur(70px)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading + features */}
          <Reveal direction="up">
            <div className="lab-subtitle mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
              Why Choose Us
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight h-display">
              Precision Testing{" "}
              <span style={{ color: "#134CF7" }}>You Can Trust</span>
            </h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              We deliver accurate and reliable laboratory testing using advanced techniques —
              empowering scientific discovery and better healthcare for every patient who walks through our doors.
            </p>

            <div className="space-y-7">
              {whyUs.map((w) => (
                <div key={w.title} className="flex gap-5 group cursor-default">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow"
                    style={{ background: "rgba(19,76,247,0.18)", border: "1px solid rgba(19,76,247,0.35)" }}
                  >
                    {w.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">{w.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: stat counters */}
          <Reveal stagger staggerGap={0.1} className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <RevealItem key={s.label}>
                <div
                  className="p-8 rounded-2xl border cursor-default group transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(19,76,247,0.5)";
                    el.style.boxShadow = "0 18px 50px -12px rgba(19,76,247,0.40)";
                    el.style.background = "rgba(19,76,247,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.boxShadow = "";
                    el.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <p className="text-5xl font-black text-white mb-2 transition-colors duration-300 group-hover:text-[#93c5fd]">
                    <Counter value={s.value} suffix={s.suffix} compact={!!s.compact} />
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</p>
                  <div className="mt-4 h-0.5 w-10 rounded transition-all duration-300 group-hover:w-20" style={{ background: "linear-gradient(90deg,#134CF7,#00c6ff)" }} />
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
