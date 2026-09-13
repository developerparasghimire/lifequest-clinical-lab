import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/cms";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import PDCACycle from "@/components/about/PDCACycle";
import LeaderMessages from "@/components/about/LeaderMessages";
import DirectorMessage from "@/components/about/DirectorMessage";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Life Quest Clinical Lab — Nepal's NPHL accredited clinical laboratory. Learn about our capabilities, PDCA quality management, IFCC PEP recognition, mission and vision.",
  alternates: { canonical: "/about/who-we-are" },
  openGraph: {
    title: "Who We Are · Life Quest Clinical Lab",
    description:
      "Comprehensive laboratory diagnostic services under one roof, and the only lab in Nepal to host the IFCC Professional Exchange Program.",
    url: "/about/who-we-are",
    type: "website",
  },
};

const capabilities = [
  "Biochemistry",
  "Immunology",
  "Hematology",
  "Microbiology",
  "Histopathology",
  "Cytopathology",
  "Molecular Diagnostics",
  "Immunofluorescence",
];

const whyChooseUs = [
  {
    title: "Uncompromising Quality Standards",
    desc: "PDCA cycle-based quality management ensures every result meets the strictest benchmarks.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Expert Team of Professionals",
    desc: "Pathologists, biochemists, microbiologists and technologists with decades of combined experience.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Fast & Reliable Results",
    desc: "Fast, accurate results delivered promptly. STAT services for urgent cases at hospitals and clinics.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Patient-Centered Care",
    desc: "Compassionate service, transparent pricing, and home sample collection for your convenience.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Comprehensive Testing Services",
    desc: "526+ tests covering biochemistry, hematology, molecular, histopathology and more.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
  },
  {
    title: "Commitment to Innovation",
    desc: "Continuously investing in cutting-edge equipment and advanced diagnostic technology to stay at the forefront of laboratory medicine.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Trusted by Healthcare Providers",
    desc: "Preferred reference laboratory for hospitals, clinics and specialists across Nepal.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
        <path d="M12 6h.01" />
        <path d="M12 12h3" />
        <path d="M12 15h3" />
      </svg>
    ),
  },
];

export default async function WhoWeArePage() {
  const settings = await getSettings();
  const mission =
    settings["about.mission"] ||
    "Our laboratory's mission is to provide high quality laboratory services at reasonable prices in the shortest time possible, with the importance on quality and complete client contentment.";
  const vision =
    settings["about.vision"] ||
    "To ensure that the entire laboratory examination procedures conducted give accuracy, reliable and the highest quality results.";

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #040B2F 0%, #071a3e 55%, #0a2060 100%)" }}>
        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Glow blob */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(0,182,122,0.18)", filter: "blur(80px)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>/</span>
            <span style={{ color: "#fff", fontWeight: 500 }}>Who We Are</span>
          </nav>
          <h1 className="font-bold mb-3 h-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#fff" }}>
            Who We Are
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            A privately owned, NPHL accredited clinical laboratory committed to precision, quality,
            and advancing diagnostic medicine in Nepal since 2021.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE CONTENT ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal direction="right">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Our Identity</p>
              <h2 className="text-3xl sm:text-4xl font-bold h-display mb-6" style={{ color: "#040B2F" }}>
                Built on Science, Driven by Quality
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#5D6478" }}>
                Established in 2021, Life Quest Clinical Lab is an NPHL accredited independent laboratory at Maharajgunj-03, Panipokhari, Kathmandu. We offer comprehensive laboratory diagnostic services under one roof.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: "#5D6478" }}>
                Quality management follows the PDCA cycle, ensuring every result meets global benchmarks through
                continuous improvement and rigorous quality assurance.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
                    style={{ background: "#F0FDF9", border: "1px solid #E2E6F0", color: "#040B2F" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {c}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="relative">
                <div className="flex gap-4">
                  <div className="w-1/2 relative rounded-3xl overflow-hidden" style={{ height: "460px" }}>
                    <Image
                      src="/our%20images/DSC00078.jpg"
                      alt="Life Quest Lab scientist"
                      fill
                      sizes="250px"
                      className="object-cover"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-4">
                    <div className="relative rounded-3xl overflow-hidden" style={{ height: "218px" }}>
                      <Image
                        src="/our%20images/DSC00251.jpg"
                        alt="Lab equipment"
                        fill
                        sizes="250px"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative rounded-3xl overflow-hidden flex-1" style={{ minHeight: "218px" }}>
                      <Image
                        src="/our%20images/IMG-20250302-WA0006.jpg"
                        alt="Medical professional"
                        fill
                        sizes="250px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PDCA QUALITY MANAGEMENT ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#F0FDF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Quality Management</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              Our Quality Management Policy
            </h2>
            <p className="text-base mt-3 max-w-2xl" style={{ color: "#5D6478" }}>
              We adhere to the Plan-Do-Check-Act (PDCA) cycle in our quality management processes to ensure reliable results. This iterative method allows us to plan and implement changes, monitor outcomes, and make necessary adjustments for continuous improvement.
            </p>
          </Reveal>

          <Reveal>
            <PDCACycle />
          </Reveal>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-16 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Our Purpose</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              Driven by Mission & Vision
            </h2>
          </Reveal>
          <Reveal stagger staggerGap={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealItem>
              <div
                className="rounded-2xl p-10 h-full bg-white"
                style={{ border: "1px solid #E2E6F0" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "#00B67A" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#040B2F" }}>
                  Our Mission
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#5D6478" }}>
                  {mission}
                </p>
              </div>
            </RevealItem>
            <RevealItem>
              <div
                className="rounded-2xl p-10 h-full bg-white"
                style={{ border: "1px solid #E2E6F0" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "#00B67A" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#040B2F" }}>
                  Our Vision
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#5D6478" }}>
                  {vision}
                </p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ── WHY LIFE QUEST ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Why Life Quest</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              Why Choose Life Quest for Laboratory Testing
            </h2>
          </Reveal>
          <Reveal stagger staggerGap={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((w) => (
              <RevealItem key={w.title}>
                <div className="rounded-2xl p-7 h-full" style={{ background: "#F0FDF9", border: "1px solid #E2E6F0" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "#DCFCE7" }}>
                    {w.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#040B2F" }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5D6478" }}>{w.desc}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── MESSAGE FROM DIRECTOR ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#F0FDF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DirectorMessage />

          <LeaderMessages />
        </div>
      </section>

      {/* ── IFCC HIGHLIGHT ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#040B2F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Reveal direction="right">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#60AEFF" }}>Global Recognition</p>
              <h2 className="text-3xl sm:text-4xl font-bold h-display text-white mb-4">
                IFCC Professional Exchange Program
              </h2>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>
                Life Quest is the{" "}
                <strong className="text-white">first and only clinical laboratory in Nepal</strong>{" "}
                to host the IFCC Professional Exchange Program — welcoming international laboratory professionals and advancing global standards of diagnostic medicine.
              </p>
              <Link
                href="/about/ifcc-pep"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl transition-all"
                style={{ background: "#00B67A", color: "#fff" }}
              >
                Read the Full IFCC Story
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              {/* Source is portrait 1200x1600 — aspect-[3/4] shows the full frame. */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-[380px] mx-auto lg:ml-auto lg:mr-0">
                <Image
                  src="/IFCC/IMG-20250401-WA0011.jpg"
                  alt="Ms. Laura Gomez Martinez welcomed by the Life Quest team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,11,47,0.75) 0%, transparent 55%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold text-sm">Ms. Laura Gomez Martinez at Life Quest</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>Hospital Clínico San Carlos, Madrid, Spain</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold h-display mb-4" style={{ color: "#040B2F" }}>
              Ready to Experience{" "}
              <span style={{ color: "#00B67A" }}>Quality Diagnostics?</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#5D6478" }}>
              Book your test today and get accurate, reliable results from our accredited laboratory.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/appointments" className="lab-btn btn-pop">
                Book a Test
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
