import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSettings, getTeamMembers } from "@/lib/cms";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Life Quest Clinical Lab — Nepal's NPHL accredited Category A clinical laboratory. Learn about our capabilities, PDCA quality management, IFCC PEP recognition, mission and vision.",
  alternates: { canonical: "/about/who-we-are" },
  openGraph: {
    title: "Who We Are · Life Quest Clinical Lab",
    description:
      "Nepal's first lab to offer complete Molecular Pathology Services and host the IFCC Professional Exchange Program.",
    url: "/about/who-we-are",
    type: "website",
  },
};

const capabilities = [
  "Biochemistry & Immunology",
  "Hematology",
  "Microbiology",
  "Histopathology",
  "Cytopathology",
  "Molecular Diagnostics",
  "Immunofluorescence",
  "Next Generation Sequencing",
];

const pdcaPhases = [
  {
    phase: "Plan",
    color: "#00B67A",
    bg: "#DCFCE7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    points: [
      "Strategy Development",
      "Quality Indicators establishment",
      "Establishment of performance benchmark",
      "Align objectives with regulatory and accreditation benchmarks",
    ],
  },
  {
    phase: "Do",
    color: "#22C55E",
    bg: "#EDFBF3",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    points: [
      "Staff training and competency assessment",
      "Execution of internal quality control",
      "Execution of external quality assurance",
      "Implementation of pre-analytical, analytical and post-analytical quality checks",
    ],
  },
  {
    phase: "Check",
    color: "#F59E0B",
    bg: "#FFFBEB",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    points: [
      "Review of proficiency testing scores and quality control data",
      "Performance evaluation of quality indicators",
      "Benchmarking against global standards",
      "Data-driven decision making",
    ],
  },
  {
    phase: "Act",
    color: "#EF4444",
    bg: "#FEF2F2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    points: [
      "Implementation of Corrective & Preventive Actions",
      "Standardization of Successful Improvements",
      "Establishment of preventive measures",
    ],
  },
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
  const [settings, team] = await Promise.all([getSettings(), getTeamMembers()]);
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
                Established in 2021, Life Quest Clinical Lab is an NPHL accredited independent laboratory at Maharajgunj-03, Panipokhari, Kathmandu. We offer complete Molecular Pathology Services — including NGS, FISH, and immunohistochemistry — under one roof.
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
              Our PDCA Quality Policy
            </h2>
            <p className="text-base mt-3 max-w-2xl" style={{ color: "#5D6478" }}>
              We adhere to the Plan-Do-Check-Act (PDCA) cycle in our quality management processes to ensure reliable results. This iterative method allows us to plan and implement changes, monitor outcomes, and make necessary adjustments for continuous improvement.
            </p>
          </Reveal>

          <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pdcaPhases.map((p) => (
              <RevealItem key={p.phase}>
                <div
                  className="rounded-2xl p-8 h-full bg-white"
                  style={{ border: "1px solid #E2E6F0" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: p.color }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: p.color }}>
                        PDCA
                      </p>
                      <h3 className="text-xl font-black" style={{ color: "#040B2F" }}>
                        {p.phase}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {p.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: p.bg }}
                        >
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-sm leading-relaxed" style={{ color: "#5D6478" }}>
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── LEADERSHIP — managed from the admin panel (Team) ── */}
      {team.length > 0 && (
      <section className="py-16 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Our Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              The Team Behind Life Quest
            </h2>
          </Reveal>
          <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {team.map((l) => (
              <RevealItem key={l.id}>
                <div className="rounded-2xl overflow-hidden h-full bg-white" style={{ border: "1px solid #E2E6F0" }}>
                  <div className="relative w-full bg-slate-100" style={{ height: "220px" }}>
                    {l.photo ? (
                      <Image
                        src={l.photo}
                        alt={l.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-4xl font-black"
                        style={{ color: "#00B67A", background: "#DCFCE7" }}
                      >
                        {l.name
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((s) => s[0]?.toUpperCase())
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <h3 className="text-lg font-bold mb-1" style={{ color: "#040B2F" }}>{l.name}</h3>
                    <p className="text-sm font-semibold mb-3" style={{ color: "#00B67A" }}>{l.role}</p>
                    {l.bio && (
                      <p className="text-sm leading-relaxed italic" style={{ color: "#5D6478" }}>
                        &ldquo;{l.bio}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
      )}

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
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              Message from the Director
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
            <Reveal direction="right">
              <div className="rounded-3xl overflow-hidden bg-white text-center" style={{ border: "1px solid #E2E6F0" }}>
                <div className="relative w-full" style={{ height: "280px" }}>
                  <Image
                    src="/team/rakesh-pokhrel.jpg"
                    alt="Rakesh Pokhrel, Managing Director"
                    fill
                    sizes="280px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#040B2F" }}>Rakesh Pokhrel</h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: "#00B67A" }}>Managing Director / Founder</p>
                  <div className="space-y-1 text-xs" style={{ color: "#5D6478" }}>
                    <p>MSc. Clinical Biochemistry, IOM</p>
                    <p>MSc. Total Quality Management</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-3xl p-10 h-full" style={{ background: "white", border: "1px solid #E2E6F0" }}>
                <svg width="40" height="28" viewBox="0 0 32 22" fill="none" className="mb-6">
                  <path d="M0 22V13.4C0 9.4 0.733 6.267 2.2 4 3.667 1.733 5.933 0.333 9 0L10.2 2.2C8.2 2.867 6.667 3.933 5.6 5.4 4.533 6.867 4 8.533 4 10.4H9V22H0ZM18.4 22V13.4C18.4 9.4 19.133 6.267 20.6 4 22.067 1.733 24.333 0.333 27.4 0L28.6 2.2C26.6 2.867 25.067 3.933 24 5.4 22.933 6.867 22.4 8.533 22.4 10.4H27.4V22H18.4Z" fill="#00B67A" opacity="0.25" />
                </svg>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: "#5D6478" }}>
                  <p>At Life Quest Clinical Lab, our mission is to empower better healthcare through precision, reliability, and affordability. We understand the vital role that accurate diagnostic results play in shaping medical decisions and improving patient outcomes.</p>
                  <p>Our commitment to excellence is unwavering. We are dedicated to providing the highest standards of accuracy, reliability, and precision in every diagnostic service we offer. From advanced technology to a team of highly skilled professionals, we leave no stone unturned in ensuring that every result meets the strictest quality benchmarks.</p>
                  <p>Quality is not just a goal; it&apos;s our promise. We continuously invest in cutting-edge equipment, rigorous training, and robust quality control processes to ensure that our services are at the forefront of diagnostic innovation. Our mission is to empower healthcare providers and patients with the confidence they need to make informed decisions.</p>
                  <p>Our commitment to continuous improvement, ethical practices, and exceptional customer service sets us apart in delivering the highest quality of care.</p>
                  <p className="font-semibold" style={{ color: "#040B2F" }}>Thank you for placing your trust in us. Together, we strive for a dependable diagnosis.</p>
                </div>
              </div>
            </Reveal>
          </div>
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
              Book a test today or explore our team behind every accurate report.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/appointments" className="lab-btn btn-pop">
                Book a Test
              </Link>
              <Link href="/about/ifcc-pep" className="lab-btn-outline">
                IFCC
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
