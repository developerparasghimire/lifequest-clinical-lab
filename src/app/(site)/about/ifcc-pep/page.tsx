import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "IFCC",
  description:
    "Life Quest Clinical Lab is the first and only clinical laboratory in Nepal to host the IFCC Professional Exchange Program — fostering international scientific collaboration and advancing laboratory medicine.",
  alternates: { canonical: "/about/ifcc-pep" },
  openGraph: {
    title: "IFCC · Life Quest Clinical Lab",
    description:
      "Nepal's first and only IFCC Professional Exchange Program host lab — building global ties in laboratory medicine.",
    url: "/about/ifcc-pep",
    type: "website",
  },
};

const commitments = [
  "International scientific collaboration",
  "Continuous professional development",
  "Quality improvement in laboratory services",
  "Knowledge sharing across borders",
  "Advancement of laboratory medicine in Nepal",
];

export default function IfccPepPage() {
  return (
    <>
      {/* ── PAGE HEADER ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #040B2F 0%, #071a3e 55%, #0a2060 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "rgba(0,182,122,0.18)", filter: "blur(80px)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>/</span>
            <span style={{ color: "#fff", fontWeight: 500 }}>IFCC</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#60AEFF" }}>
                International Excellence
              </p>
              <h1
                className="font-bold mb-4 h-display"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#fff" }}
              >
                IFCC Professional Exchange Program
              </h1>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                Life Quest Clinical Lab is the{" "}
                <strong className="text-white">first and only clinical laboratory in Nepal</strong> to host
                participants under the IFCC Professional Exchange Program — a landmark achievement connecting
                Nepal to the global laboratory medicine community.
              </p>
            </div>
            {/* IFCC Logo */}
            <div
              className="hidden lg:flex items-center justify-center rounded-2xl p-6 shrink-0"
              style={{ background: "rgba(255,255,255,0.95)", width: "220px", height: "160px" }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/IFCC/ifcc-logo-png.png"
                  alt="IFCC — International Federation of Clinical Chemistry and Laboratory Medicine"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERNATIONAL KNOWLEDGE EXCHANGE ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal direction="right">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>
                About the Program
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold h-display mb-6" style={{ color: "#040B2F" }}>
                International Knowledge Exchange at Life Quest Clinical Lab
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#5D6478" }}>
                Life Quest Clinical Lab takes pride in being a pioneer in international professional exchange
                within Nepal&apos;s laboratory medicine sector. We are honored to be the{" "}
                <strong style={{ color: "#040B2F" }}>first and only clinical laboratory in Nepal</strong> to
                host participants under the International Federation of Clinical Chemistry and Laboratory
                Medicine (IFCC) Professional Exchange Program (PEP).
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#5D6478" }}>
                As part of this prestigious global initiative, Life Quest Clinical Lab has already hosted{" "}
                <strong style={{ color: "#040B2F" }}>Ms. Laura Gomez Martinez</strong>, Biochemistry Resident
                from Hospital Clínico San Carlos, Madrid, Spain, for an intensive professional exchange and
                observational training program.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#5D6478" }}>
                Following the success of this program, Life Quest Clinical Lab has continued its commitment
                to international collaboration and has been welcoming healthcare and laboratory professionals
                through exchange opportunities on a regular basis, further strengthening global professional
                ties and promoting excellence in laboratory medicine.
              </p>
            </Reveal>

            {/* Welcome / group photo */}
            <Reveal direction="left" delay={0.1}>
              {/* Source is portrait 1200x1600 — aspect-[3/4] keeps the whole
                  frame visible instead of cropping heads and feet away. */}
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-[420px] mx-auto lg:mx-0">
                <Image
                  src="/IFCC/IMG-20250401-WA0011.jpg"
                  alt="Ms. Laura Gomez Martinez welcomed by the Life Quest Clinical Lab team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: "linear-gradient(to top, rgba(4,11,47,0.85) 0%, transparent 100%)" }}
                >
                  <p className="text-white text-sm font-semibold">
                    Ms. Laura Gomez Martinez welcomed by the Life Quest team
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                    Hospital Clínico San Carlos, Madrid, Spain
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── LAB WORK PHOTO + COMMITMENT ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#F0FDF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Lab photo */}
            <Reveal direction="right">
              {/* Source is portrait 1200x1600 — aspect-[3/4] keeps the whole
                  frame visible instead of cropping heads and feet away. */}
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-[420px] mx-auto lg:mx-0">
                <Image
                  src="/IFCC/IMG-20250410-WA0007.jpg"
                  alt="Ms. Laura working in the Life Quest Clinical Lab laboratory"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: "linear-gradient(to top, rgba(4,11,47,0.85) 0%, transparent 100%)" }}
                >
                  <p className="text-white text-sm font-semibold">
                    Hands-on observational training at Life Quest
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                    Laboratory operations and diagnostic services
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>
                Our Dedication
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold h-display mb-6" style={{ color: "#040B2F" }}>
                Our Participation Reflects Our Commitment to:
              </h2>
              <div className="space-y-5">
                {commitments.map((c, i) => (
                  <div key={c} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{ background: "#00B67A", color: "white" }}
                    >
                      {i + 1}
                    </div>
                    <div className="pt-1.5">
                      <p className="text-base font-semibold" style={{ color: "#040B2F" }}>{c}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MESSAGE FROM PARTICIPANT ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#040B2F" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#60AEFF" }}>
              First-Hand Experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display text-white">
              Message from the Participant
            </h2>
          </Reveal>

          <Reveal>
            <div
              className="rounded-3xl p-10 sm:p-14 relative"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {/* IFCC logo in testimonial card */}
              <div
                className="absolute top-8 right-8 rounded-xl overflow-hidden hidden sm:block"
                style={{ width: "90px", height: "65px", background: "rgba(255,255,255,0.9)" }}
              >
                <div className="relative w-full h-full p-2">
                  <Image
                    src="/IFCC/ifcc-logo-png.png"
                    alt="IFCC"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>

              <svg width="40" height="28" viewBox="0 0 32 22" fill="none" className="mb-8">
                <path d="M0 22V13.4C0 9.4 0.733 6.267 2.2 4 3.667 1.733 5.933 0.333 9 0L10.2 2.2C8.2 2.867 6.667 3.933 5.6 5.4 4.533 6.867 4 8.533 4 10.4H9V22H0ZM18.4 22V13.4C18.4 9.4 19.133 6.267 20.6 4 22.067 1.733 24.333 0.333 27.4 0L28.6 2.2C26.6 2.867 25.067 3.933 24 5.4 22.933 6.867 22.4 8.533 22.4 10.4H27.4V22H18.4Z" fill="#60AEFF" opacity="0.5" />
              </svg>

              <p className="text-lg sm:text-xl leading-relaxed italic mb-10" style={{ color: "rgba(255,255,255,0.9)" }}>
                &ldquo;My experience at Life Quest Clinical Lab was highly enriching both professionally and personally.
                The team welcomed me warmly and provided valuable exposure to laboratory operations, quality practices,
                and diagnostic services in a healthcare setting different from my own. The exchange allowed me to better
                understand the challenges and strengths of laboratory medicine in this part of the world. I am grateful
                for the opportunity to learn from such a dedicated and passionate team and will carry these experiences
                with me throughout my professional career.&rdquo;
              </p>

              <div
                className="flex items-center gap-5 pt-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold shrink-0"
                  style={{ background: "#00B67A", color: "white" }}
                >
                  LG
                </div>
                <div>
                  <p className="font-bold text-white text-base">Ms. Laura Gomez Martinez</p>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                    Biochemistry Resident
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                    Hospital Clínico San Carlos, Madrid, Spain
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold h-display mb-4" style={{ color: "#040B2F" }}>
              Partnering in{" "}
              <span style={{ color: "#00B67A" }}>Global Laboratory Excellence</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#5D6478" }}>
              Learn more about our team or explore how we&apos;ve grown to become Nepal&apos;s most advanced clinical laboratory.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/about/our-team" className="lab-btn btn-pop">
                Meet Our Team
              </Link>
              <Link href="/about/our-journey" className="lab-btn-outline">
                Our Journey
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
