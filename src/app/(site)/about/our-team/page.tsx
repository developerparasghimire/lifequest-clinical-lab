import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTeamMembers } from "@/lib/cms";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership and scientific team behind Life Quest Clinical Lab — pathologists, biochemists, and laboratory specialists dedicated to precision diagnostics.",
  alternates: { canonical: "/about/our-team" },
  openGraph: {
    title: "Our Team · Life Quest Clinical Lab",
    description:
      "Meet the pathologists, biochemists, and leadership driving Nepal's most advanced clinical laboratory.",
    url: "/about/our-team",
    type: "website",
  },
};

export default async function OurTeamPage() {
  const team = await getTeamMembers();

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
            <span style={{ color: "#fff", fontWeight: 500 }}>Our Team</span>
          </nav>
          <h1 className="font-bold mb-3 h-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#fff" }}>
            Our Team
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Skilled professionals with deep expertise in clinical biochemistry, pathology, and laboratory quality management — the people behind every accurate report.
          </p>
        </div>
      </section>

      {/* ── MESSAGE FROM DIRECTOR ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.6fr]"
              style={{ border: "1px solid #E2E6F0" }}
            >
              {/* Left — avatar panel */}
              <div
                className="flex flex-col items-center justify-center p-12 text-center"
                style={{ background: "#F0FDF9" }}
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-5 shrink-0" style={{ border: "3px solid #00B67A" }}>
                  <Image
                    src="/team/rakesh-pokhrel.jpg"
                    alt="Rakesh Pokhrel — Managing Director & Founder"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold" style={{ color: "#040B2F" }}>
                  Rakesh Pokhrel
                </h3>
                <p className="text-sm font-semibold mt-1" style={{ color: "#00B67A" }}>
                  Managing Director &amp; Founder
                </p>
                <p className="text-xs mt-2" style={{ color: "#5D6478" }}>
                  MSc. Clinical Biochemistry, IOM
                </p>
                <p className="text-xs" style={{ color: "#5D6478" }}>
                  MSc. Total Quality Management
                </p>
              </div>

              {/* Right — message */}
              <div className="p-10 lg:p-14 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#00B67A" }}>Message from the Director</p>
                <svg width="36" height="26" viewBox="0 0 36 26" fill="none" className="mb-5">
                  <path d="M0 26V15.8C0 11.1 0.833 7.4 2.5 4.7 4.167 2 6.733 0.4 10.2 0L11.6 2.6C9.4 3.3 7.667 4.6 6.4 6.4 5.133 8.2 4.5 10.2 4.5 12.4H10.5V26H0ZM21 26V15.8C21 11.1 21.833 7.4 23.5 4.7 25.167 2 27.733 0.4 31.2 0L32.6 2.6C30.4 3.3 28.667 4.6 27.4 6.4 26.133 8.2 25.5 10.2 25.5 12.4H31.5V26H21Z" fill="#00B67A" opacity="0.2"/>
                </svg>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: "#5D6478" }}>
                  <p>
                    At Life Quest, our mission is to empower better healthcare through precision, reliability,
                    and affordability. Accurate diagnostics play a vital role in every medical decision.
                  </p>
                  <p style={{ color: "#040B2F", fontWeight: 500 }}>
                    Quality is not a goal; it&apos;s our promise. We invest in cutting-edge equipment, rigorous
                    training, and robust quality controls to stay at the forefront of diagnostic medicine.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FULL TEAM GROUP PHOTO ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#F0FDF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Together We Excel</p>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              The Life Quest Family
            </h2>
            <p className="text-base mt-3 max-w-2xl" style={{ color: "#5D6478" }}>
              A dedicated team of laboratory professionals, united by one mission — delivering accurate diagnostics with care.
            </p>
          </Reveal>
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(280px, 45vw, 540px)" }}>
              <Image
                src="/our%20images/DSC00269.jpg"
                alt="The full Life Quest Clinical Lab team"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-top"
                priority
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(4,11,47,0.55) 0%, transparent 55%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white font-semibold text-base">Life Quest Clinical Lab — Our Team</p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Maharajgunj-03, Panipokhari, Kathmandu · Est. 2021
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DYNAMIC TEAM FROM CMS ── */}
      {team.length > 0 && (
        <section className="py-16 overflow-hidden" style={{ background: "#F0FDF9" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Our Staff</p>
              <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
                Meet the Full Team
              </h2>
              <p className="text-base mt-3 max-w-2xl" style={{ color: "#5D6478" }}>
                Skilled pathologists, technologists and support staff working together to deliver accurate diagnostics.
              </p>
            </Reveal>
            <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {team.map((m, index) => (
                <RevealItem key={m.id}>
                  <div
                    className="bg-white rounded-2xl text-center h-full flex flex-col overflow-hidden"
                    style={{ border: "1px solid #E2E6F0" }}
                  >
                    <div className="relative w-full bg-slate-100" style={{ aspectRatio: "1 / 1" }}>
                      {m.photo ? (
                        <Image
                          src={m.photo}
                          alt={m.name}
                          fill
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center text-5xl font-bold"
                          style={{ color: "#00B67A", background: "#DCFCE7" }}
                        >
                          {m.name
                            .split(/\s+/)
                            .slice(0, 2)
                            .map((s: string) => s[0]?.toUpperCase())
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold" style={{ color: "#040B2F" }}>
                        {m.name}
                      </h3>
                      <p className="text-sm font-semibold mb-3" style={{ color: "#00B67A" }}>
                        {m.role}
                      </p>
                      {m.bio && (
                        <p
                          className="text-sm leading-relaxed line-clamp-3 mb-4 flex-1"
                          style={{ color: "#5D6478" }}
                        >
                          {m.bio}
                        </p>
                      )}
                      {(m.facebook || m.twitter || m.linkedin || m.email) && (
                        <div
                          className="flex items-center justify-center gap-2 mt-auto pt-4 border-t"
                          style={{ borderColor: "#F0F0F0" }}
                        >
                          {m.facebook && (
                            <a href={m.facebook} target="_blank" rel="noreferrer" aria-label={`${m.name} on Facebook`}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#00B67A] hover:text-white"
                              style={{ background: "#F6F6F6", color: "#00B67A" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                          )}
                          {m.linkedin && (
                            <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#00B67A] hover:text-white"
                              style={{ background: "#F6F6F6", color: "#00B67A" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                          )}
                          {m.email && (
                            <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#00B67A] hover:text-white"
                              style={{ background: "#F6F6F6", color: "#00B67A" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ── VALUES STRIP ── */}
      <section className="py-16 overflow-hidden" style={{ background: "#F0FDF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal stagger staggerGap={0.08} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "4+", label: "Years of Experience" },
              { value: "3", label: "Lab Branches" },
              { value: "NPHL", label: "Category A Accredited" },
              { value: "IFCC", label: "PEP Host Lab" },
            ].map((s) => (
              <RevealItem key={s.label}>
                <div
                  className="rounded-2xl p-7 text-center bg-white"
                  style={{ border: "1px solid #E2E6F0" }}
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

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold h-display mb-4" style={{ color: "#040B2F" }}>
              Work With a Team You Can{" "}
              <span style={{ color: "#00B67A" }}>Trust</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#5D6478" }}>
              Book a test today or learn more about how we got here.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/appointments" className="lab-btn btn-pop">
                Book a Test
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
