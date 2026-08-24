import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TOTAL_TESTS } from "@/data/services";
import { getSettings } from "@/lib/cms";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Journey",
  description:
    "From a single laboratory in 2021 to Nepal's most advanced clinical facility — discover the milestones and growth story of Life Quest Clinical Lab.",
  alternates: { canonical: "/about/our-journey" },
  openGraph: {
    title: "Our Journey · Life Quest Clinical Lab",
    description:
      "Growth, innovation and international recognition — the story of Life Quest Clinical Lab.",
    url: "/about/our-journey",
    type: "website",
  },
};

/** Defaults used when a journey.statN.* setting is blank in the admin panel. */
const STAT_DEFAULTS = [
  { value: `${TOTAL_TESTS}+`, label: "Diagnostic Tests" },
  { value: "3", label: "Branches in Nepal" },
  { value: "4+", label: "Years of Service" },
  { value: "NPHL", label: "Accredited Lab" },
];

const journey = [
  {
    year: "2021",
    title: "Established",
    desc: "Life Quest Clinical Lab established in Maharajgunj-03, Panipokhari, Kathmandu with NPHL Category B accreditation — privately owned and dedicated to quality diagnostics.",
  },
  {
    year: "2022",
    title: "Molecular Diagnostics",
    desc: "Commenced Molecular Diagnostics services, positioning Life Quest as one of the first labs in Nepal to offer this advanced specialization.",
  },
  {
    year: "2023",
    title: "Expansion & Infrastructure",
    desc: "Birtamod branch established with NPHL Category B accreditation. Corporate infrastructure significantly expanded in Kathmandu.",
  },
  {
    year: "2024",
    title: "Specialized Testing",
    desc: "Launched specialized hormonal analysis and prenatal screening — Dual Marker, Triple Marker, and Quadruple Marker tests.",
  },
  {
    year: "2025",
    title: "Global Reach",
    desc: `Opened Udayapur (Gaighat) branch. Received IFCC PEP hosting recognition and launched first international online diagnostics. Now offering ${TOTAL_TESTS}+ tests with rapid, accurate reporting.`,
  },
];

export default async function OurJourneyPage() {
  const settings = await getSettings();

  // Editable from the admin panel under Settings → "About / Journey Statistics".
  // A blank field falls back to the default so the strip is never half-empty.
  const stats = STAT_DEFAULTS.map((d, i) => ({
    value: settings[`journey.stat${i + 1}.value`]?.trim() || d.value,
    label: settings[`journey.stat${i + 1}.label`]?.trim() || d.label,
  }));

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
            <span style={{ color: "#fff", fontWeight: 500 }}>Our Journey</span>
          </nav>
          <h1 className="font-bold mb-3 h-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#fff" }}>
            Our Journey
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            From a single laboratory in Kathmandu to Nepal&apos;s most advanced diagnostic facility — a story of dedication, innovation, and growth since 2021.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal stagger staggerGap={0.08} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <RevealItem key={s.label}>
                <div
                  className="rounded-2xl p-7 text-center"
                  style={{ background: "#F0FDF9", border: "1px solid #E2E6F0" }}
                >
                  <p className="text-4xl font-black mb-1" style={{ color: "#00B67A" }}>
                    {s.value}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#5D6478" }}>
                    {s.label}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#F0FDF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Milestones</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              Our Growth Story
            </h2>
            <p className="text-base mt-3 max-w-2xl" style={{ color: "#5D6478" }}>
              Every milestone reflects our commitment to quality and advancing laboratory medicine in Nepal.
            </p>
          </Reveal>

          <div className="relative">
            {/* Central line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden lg:block"
              style={{ background: "#E2E6F0" }}
            />

            <div className="space-y-8">
              {journey.map((j, i) => (
                <Reveal key={j.year} direction={i % 2 === 0 ? "right" : "left"} delay={i * 0.05}>
                  <div className={`flex items-center gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Card */}
                    <div className="flex-1">
                      <div
                        className="rounded-2xl p-6 bg-white"
                        style={{ border: "1px solid #E2E6F0", boxShadow: "0 2px 16px rgba(0,182,122,0.06)" }}
                      >
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                          style={{ background: "#DCFCE7", color: "#00B67A" }}
                        >
                          {j.year}
                        </div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: "#040B2F" }}>
                          {j.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "#5D6478" }}>
                          {j.desc}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex w-12 shrink-0 items-center justify-center">
                      <div
                        className="w-4 h-4 rounded-full border-4 border-white shadow-md z-10"
                        style={{ background: "#00B67A" }}
                      />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block flex-1" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Life at Life Quest</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              Inside Our Lab
            </h2>
            <p className="text-base mt-3 max-w-2xl" style={{ color: "#5D6478" }}>
              From modern equipment to a caring team — a glimpse of the environment behind every accurate result.
            </p>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* tall left image */}
              <div className="row-span-2 relative rounded-2xl overflow-hidden" style={{ minHeight: "340px" }}>
                <Image src="/our%20images/DSC00078.jpg" alt="Life Quest scientist at work" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: "160px" }}>
                <Image src="/our%20images/DSC00057.jpg" alt="Life Quest reception and waiting area" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: "160px" }}>
                <Image src="/our%20images/DSC00149.jpg" alt="Beckman Coulter Access 2 analyzer" fill sizes="25vw" className="object-cover object-center" />
              </div>
              {/* tall right image */}
              <div className="row-span-2 relative rounded-2xl overflow-hidden" style={{ minHeight: "340px" }}>
                <Image src="/our%20images/DSC00269.jpg" alt="Full Life Quest team" fill sizes="25vw" className="object-cover object-top" />
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: "160px" }}>
                <Image src="/our%20images/DSC00065.jpg" alt="Lab floor with staff working through glass" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: "160px" }}>
                <Image src="/our%20images/DSC00045.jpg" alt="Blood collection at Life Quest" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── IFCC PEP HIGHLIGHT ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#040B2F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#60AEFF" }}>2023 Milestone</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display text-white mb-4">
              IFCC Professional Exchange Program
            </h2>
            <p className="text-base max-w-3xl" style={{ color: "rgba(255,255,255,0.65)" }}>
              Life Quest is the{" "}
              <strong className="text-white">first and only clinical laboratory in Nepal</strong> to host
              the IFCC Professional Exchange Program.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Both photos are portrait 1200x1600 — aspect-[3/4] matches the
                source exactly, so nothing is cropped away. */}
            <Reveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    src: "/IFCC/IMG-20250401-WA0011.jpg",
                    alt: "Ms. Laura Gomez Martinez welcomed by the Life Quest team",
                  },
                  {
                    src: "/IFCC/IMG-20250410-WA0007.jpg",
                    alt: "Ms. Laura Gomez Martinez working in the Life Quest lab",
                  },
                ].map((img) => (
                  <div
                    key={img.src}
                    className="relative rounded-2xl overflow-hidden aspect-[3/4]"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                Ms. Laura Gomez Martinez · Hospital Clínico San Carlos, Madrid, Spain
              </p>
            </Reveal>

            {/* Quote */}
            <div className="flex flex-col gap-6">
              <Reveal direction="left" delay={0.15}>
                <div className="rounded-2xl p-7" style={{ background: "rgba(0,182,122,0.12)", border: "1px solid rgba(0,182,122,0.25)" }}>
                  <svg width="28" height="20" viewBox="0 0 32 22" fill="none" className="mb-4">
                    <path d="M0 22V13.4C0 9.4 0.733 6.267 2.2 4 3.667 1.733 5.933 0.333 9 0L10.2 2.2C8.2 2.867 6.667 3.933 5.6 5.4 4.533 6.867 4 8.533 4 10.4H9V22H0ZM18.4 22V13.4C18.4 9.4 19.133 6.267 20.6 4 22.067 1.733 24.333 0.333 27.4 0L28.6 2.2C26.6 2.867 25.067 3.933 24 5.4 22.933 6.867 22.4 8.533 22.4 10.4H27.4V22H18.4Z" fill="#60AEFF" opacity="0.4" />
                  </svg>
                  <p className="text-sm leading-relaxed italic mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>
                    &ldquo;Life Quest welcomed me warmly and gave me valuable exposure to laboratory operations and
                    quality practices in a very different healthcare setting. I am grateful for the experience
                    and will carry it throughout my career.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "#00B67A", color: "white" }}>LG</div>
                    <div>
                      <p className="font-bold text-white text-sm">Ms. Laura Gomez Martinez</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Biochemistry Resident · Hospital Clínico San Carlos, Madrid</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal direction="left" delay={0.2}>
                <Link href="/about/ifcc-pep" className="lab-btn-ghost inline-flex items-center gap-2 text-sm">
                  Read the full IFCC story
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold h-display mb-4" style={{ color: "#040B2F" }}>
              Be Part of Our{" "}
              <span style={{ color: "#00B67A" }}>Continuing Story</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#5D6478" }}>
              Experience the quality that has defined Life Quest Clinical Lab since 2021.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/appointments" className="lab-btn btn-pop">
                Book a Test
              </Link>
              <Link href="/about/who-we-are" className="lab-btn-outline">
                Who We Are
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
