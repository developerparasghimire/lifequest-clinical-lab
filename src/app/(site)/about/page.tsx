import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TOTAL_TESTS } from "@/data/services";
import { getBranches } from "@/lib/cms";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Life Quest Clinical Lab — a Nepal-based NPHL accredited Category A medical laboratory committed to accurate, accessible diagnostics. Learn about our mission, team and three branches in Kathmandu, Birtamod and Gaighat.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Life Quest Clinical Lab",
    description:
      "Nepal's NPHL accredited Category A medical laboratory committed to accurate, accessible diagnostics across three branches.",
    url: "/about",
    type: "website",
  },
};

const stats = [
  { value: `${TOTAL_TESTS}+`, label: "Diagnostic Tests" },
  { value: "3", label: "Branches in Nepal" },
  { value: "4+", label: "Years of Service" },
  { value: "NPHL", label: "Accredited Lab" },
];

export default async function AboutPage() {
  const branches = await getBranches();

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #040B2F 0%, #071a3e 55%, #0a2060 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(0,182,122,0.18)", filter: "blur(80px)" }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(10,53,200,0.15)", filter: "blur(80px)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#00B67A" }}>About Us</p>
            <h1
              className="font-bold leading-tight mb-6 h-display"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff" }}
            >
              Committed to Quality Diagnostics Since 2021
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.78)" }}>
              Life Quest is a NPHL accredited, Category&nbsp;&apos;A&apos; clinical laboratory in Nepal. We are the{" "}
              <strong style={{ color: "#fff" }}>first lab in Nepal</strong> to provide Molecular Pathology
              Services under one roof — and the only lab to host the IFCC Professional Exchange Program.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/appointments" className="lab-btn btn-pop">
                Book a Test
              </Link>
              <Link href="/contact" className="lab-btn-ghost">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ── */}
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

      {/* ── 3. OVERVIEW + SUB-PAGE NAV ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14 items-start">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>About Life Quest</p>
              <h2 className="text-3xl sm:text-4xl font-bold h-display mb-6" style={{ color: "#040B2F" }}>
                Nepal&apos;s Pioneer in Clinical Excellence
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#5D6478" }}>
                Established in 2021, Life Quest Clinical Lab was founded with a commitment to providing accurate, reliable, accessible, and quality-focused diagnostic services to patients and healthcare professionals. We have continuously expanded our diagnostic capabilities, technology, expertise, and reach — with a vision of contributing to better healthcare through dependable laboratory medicine.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#5D6478" }}>
                We believe that every laboratory result carries a responsibility. That is why we place strong emphasis on quality, accuracy, timely reporting, patient confidentiality, and continuous improvement at every stage — from sample collection and processing to analysis and reporting.
              </p>
              <Link
                href="/about/who-we-are"
                className="lab-btn-outline inline-flex items-center gap-2"
              >
                Our Full Story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="space-y-4 lg:pt-2">
                {[
                  {
                    href: "/about/who-we-are",
                    label: "Who We Are",
                    desc: "Our identity, quality standards, mission & vision",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                      </svg>
                    ),
                  },
                  {
                    href: "/about/our-team",
                    label: "Our Team",
                    desc: "Meet the professionals behind every report",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                  },
                  {
                    href: "/about/our-journey",
                    label: "Our Journey",
                    desc: "Milestones from our founding to today",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    ),
                  },
                  {
                    href: "/about/ifcc-pep",
                    label: "IFCC",
                    desc: "Nepal's only IFCC Professional Exchange Program host",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ),
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-4 rounded-2xl p-5 group transition-colors"
                    style={{ background: "#F0FDF9", border: "1px solid #E2E6F0" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "#DCFCE7" }}
                    >
                      {link.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold mb-0.5 group-hover:text-[#00B67A] transition-colors" style={{ color: "#040B2F" }}>
                        {link.label}
                      </p>
                      <p className="text-xs leading-snug" style={{ color: "#5D6478" }}>{link.desc}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. KEY MILESTONES STRIP ── */}
      <section className="py-14 overflow-hidden" style={{ background: "#F0FDF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Since 2021</p>
              <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
                Our Growth Milestones
              </h2>
            </div>
            <Link href="/about/our-journey" className="lab-btn-outline inline-flex items-center gap-2 shrink-0 text-sm">
              Full Story
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
          <Reveal stagger staggerGap={0.08} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { year: "2021", label: "Established in Kathmandu" },
              { year: "2022", label: "Molecular Diagnostics Launched" },
              { year: "2023", label: "Birtamod Branch Opened" },
              { year: "2025", label: "IFCC Recognition & Global Reach" },
            ].map((m) => (
              <RevealItem key={m.year}>
                <div className="rounded-2xl p-6 bg-white h-full" style={{ border: "1px solid #E2E6F0" }}>
                  <p className="text-2xl font-black mb-2" style={{ color: "#00B67A" }}>{m.year}</p>
                  <p className="text-sm leading-snug font-medium" style={{ color: "#040B2F" }}>{m.label}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 5b. PHOTO STRIP ── */}
      <section className="pb-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="relative rounded-2xl overflow-hidden col-span-2" style={{ height: "260px" }}>
                <Image src="/our%20images/DSC00065.jpg" alt="Life Quest lab floor in action" fill sizes="50vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,11,47,0.5) 0%, transparent 60%)" }} />
                <span className="absolute bottom-4 left-4 text-white text-sm font-semibold">Our Laboratory</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: "260px" }}>
                <Image src="/our%20images/DSC00057.jpg" alt="Life Quest reception area" fill sizes="25vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,11,47,0.5) 0%, transparent 60%)" }} />
                <span className="absolute bottom-4 left-4 text-white text-sm font-semibold">Our Lobby</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: "260px" }}>
                <Image src="/our%20images/DSC00045.jpg" alt="Home sample collection" fill sizes="25vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,11,47,0.5) 0%, transparent 60%)" }} />
                <span className="absolute bottom-4 left-4 text-white text-sm font-semibold">Patient Care</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. BRANCHES ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#F0FDF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Our Locations</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              Three Branches Across Nepal
            </h2>
          </Reveal>
          <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-7">
            {branches.map((b) => (
              <RevealItem key={b.id}>
                <div
                  className="rounded-2xl p-8 text-center h-full bg-white"
                  style={{ border: "1px solid #E2E6F0" }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl mb-5 mx-auto"
                    style={{ background: "#00B67A" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#040B2F" }}>
                    {b.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "#5D6478" }}>
                    {b.address}
                  </p>
                  {b.phone && (
                    <a
                      href={`tel:${b.phone.split(/[\/·]/)[0].trim()}`}
                      className="inline-flex items-center gap-2 font-semibold text-sm transition-opacity hover:opacity-70"
                      style={{ color: "#00B67A" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                      </svg>
                      {b.phone}
                    </a>
                  )}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold h-display mb-4" style={{ color: "#040B2F" }}>
              Ready to Experience{" "}
              <span style={{ color: "#00B67A" }}>Quality Diagnostics?</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#5D6478" }}>
              Book a test today or call us — our team is ready to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/appointments" className="lab-btn btn-pop">
                Book a Test
              </Link>
              <Link href="/services/lab-tests" className="lab-btn-outline">
                Browse All Tests
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
