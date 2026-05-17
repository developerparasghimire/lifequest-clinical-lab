import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const benefits = [
  "State-of-the-art automated analysers with daily QC checks",
  "Expert pathologists review every critical result before release",
  "Same-day routine reports, urgent panels within 4 hours",
  "Home sample collection at your preferred time",
  "Confidential digital reports delivered securely",
  "Transparent pricing — no hidden charges",
];

export default function WhyUs() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Images + Opening Hours */}
          <Reveal direction="right" className="relative">
            {/* Big number bg text */}
            <div
              className="absolute -top-8 -left-4 text-[120px] font-black leading-none select-none pointer-events-none"
              style={{ color: "#DCDCDC", zIndex: 0 }}
            >
              12+
            </div>

            {/* Image collage */}
            <div className="relative z-10 flex gap-4">
              {/* Tall left image */}
              <div className="w-1/2 relative rounded-lg overflow-hidden" style={{ height: "420px" }}>
                <Image
                  src="/testalize-me-9xHsWmh3m_4-unsplash.jpg"
                  alt="Lab scientist"
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>

              {/* Right: two stacked images */}
              <div className="w-1/2 flex flex-col gap-4">
                <div className="relative rounded-lg overflow-hidden" style={{ height: "200px" }}>
                  <Image
                    src="/vienhuyethoc-blood-test-5906819_1920.jpg"
                    alt="Blood analysis"
                    fill
                    sizes="250px"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden flex-1" style={{ minHeight: "200px" }}>
                  <Image
                    src="/cdc-XLhDvfz0sUM-unsplash.jpg"
                    alt="Medical professional"
                    fill
                    sizes="250px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Opening Hours panel */}
            <div
              className="hours-panel relative z-10 mt-6 p-6 rounded-lg"
              style={{ background: "#134CF7", color: "#fff" }}
            >
              <h5 className="text-base font-semibold mb-4 uppercase tracking-wide">Opening Hours</h5>
              <div className="space-y-2">
                {[
                  { day: "Sun – Fri", time: "7:00 AM – 7:00 PM" },
                  { day: "Saturday", time: "8:00 AM – 4:00 PM" },
                  { day: "Emergency", time: "24 / 7" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between text-sm border-b border-white/20 pb-2">
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>{h.day}</span>
                    <span className="font-semibold">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Text content */}
          <Reveal direction="left" delay={0.1}>
            <div className="lab-subtitle mb-4">About Our Laboratory</div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: "#040B2F" }}>
              Advancing Science Through{" "}
              <span style={{ color: "#134CF7" }}>Research</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#444444" }}>
              Our commitment to excellence is unwavering. We are dedicated to providing
              the highest standards of accuracy, reliability, and precision in every
              diagnostic service we offer — across our three branches in Nepal with
              same-day reports and home sample collection.
            </p>

            {/* Benefit list */}
            <ul className="space-y-3 mb-10">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="benefit-item flex items-start gap-3 text-sm rounded-lg px-3 py-2 -mx-3 cursor-default group"
                  style={{ color: "#444444" }}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold transition-transform duration-200 group-hover:scale-110"
                    style={{ background: "#134CF7" }}
                  >
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <Link href="/about" className="lab-btn btn-pop inline-flex items-center gap-2" style={{ borderRadius: "10px" }}>
              <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
                <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Discover More
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
