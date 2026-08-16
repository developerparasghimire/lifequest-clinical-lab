import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Services — Lab Tests & Packages",
  description: "Explore Life Quest Clinical Lab services — browse individual lab tests or pick from curated health checkup packages.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services · Life Quest Clinical Lab",
    description: "Browse individual lab tests or curated health checkup packages.",
    url: "/services",
    type: "website",
  },
};

const DEPT_CHIPS = [
  { name: "Biochemistry & Immunology", color: "#60A5FA" },
  { name: "Hematology",                color: "#F87171" },
  { name: "Microbiology",              color: "#C084FC" },
  { name: "Histopathology",            color: "#FBBF24" },
  { name: "Cytopathology",             color: "#F472B6" },
  { name: "Molecular Diagnostics",     color: "#22D3EE" },
  { name: "Immunofluorescence",        color: "#34D399" },
  { name: "Next Gen Sequencing",       color: "#818CF8" },
];

const PROCESS_STEPS = [
  {
    n: "01", title: "Book Online",
    desc: "Pick a test or package and fill in your details — takes under 2 minutes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
  },
  {
    n: "02", title: "Sample Collection",
    desc: "Visit any of our three branches or opt for home collection by a trained phlebotomist.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/>
        <path d="M8.5 2h7"/><path d="M7 16h10"/>
      </svg>
    ),
  },
  {
    n: "03", title: "Lab Processing",
    desc: "Your sample is analysed by our qualified scientists on calibrated, quality-controlled instruments.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    n: "04", title: "Get Your Results",
    desc: "A pathologist-signed report is delivered to your inbox — often the same day.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.79 19.79 0 0 1 .01 1.18 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
];

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Check = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6 5 9 10 3"/>
  </svg>
);

export default async function ServicesHubPage() {
  const featuredPackages = await prisma.package.findMany({
    where: { active: true, featured: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  return (
    <>
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(140deg, #040B2F 0%, #071838 55%, #040B2F 100%)",
          minHeight: "88vh",
        }}
      >
        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* glows */}
        <div className="absolute pointer-events-none rounded-full"
          style={{ top: "-10%", right: "-5%", width: "520px", height: "520px",
            background: "radial-gradient(circle, rgba(0,182,122,0.16) 0%, transparent 70%)" }}
        />
        <div className="absolute pointer-events-none rounded-full"
          style={{ bottom: "-20%", left: "5%", width: "380px", height: "380px",
            background: "radial-gradient(circle, rgba(0,198,255,0.09) 0%, transparent 70%)" }}
        />

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
          style={{ minHeight: "88vh", paddingTop: "5rem", paddingBottom: "5rem" }}
        >
          <div className="grid lg:grid-cols-[1fr_380px] gap-14 xl:gap-20 items-center w-full">

            {/* ── Left: Copy ── */}
            <div>
              <div className="flex items-center gap-3 mb-7">
                <span className="w-8 h-px shrink-0" style={{ background: "#00B67A" }} />
                <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#00B67A" }}>
                  Diagnostic Services
                </span>
              </div>

              <h1
                className="h-display text-white mb-6"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: "1.06" }}
              >
                Advanced Diagnostics<br />
                <em className="not-italic text-gradient">Built Around You.</em>
              </h1>

              <p className="mb-10 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.58)", fontSize: "17px", maxWidth: "460px" }}>
                Eight specialized departments, 529+ tests, and rapid accurate results — delivered by NPHL-accredited pathologists across three branches in Nepal.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/services/lab-tests" className="lab-btn btn-shine btn-pop"
                  style={{ padding: "15px 34px", fontSize: "15px" }}>
                  Browse Lab Tests <ArrowRight />
                </Link>
                <Link href="/services/packages" className="lab-btn-ghost btn-pop"
                  style={{ padding: "15px 34px", fontSize: "15px" }}>
                  View Packages
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 mt-12 pt-10"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {[
                  { v: "529+", l: "Diagnostic Tests" },
                  { v: "3",    l: "Branches in Nepal" },
                  { v: "NPHL", l: "Accredited" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-[22px] font-black" style={{ color: "#00B67A" }}>{s.v}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Department chips ── */}
            <div className="hidden lg:flex flex-col gap-2">
              {DEPT_CHIPS.map((d, i) => (
                <div key={d.name}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                  style={{
                    marginLeft: i % 3 === 1 ? "24px" : i % 3 === 2 ? "12px" : "0",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>{d.name}</span>
                </div>
              ))}
              <div className="mt-2 px-5 py-3 rounded-2xl text-center"
                style={{
                  background: "rgba(0,182,122,0.10)",
                  border: "1px solid rgba(0,182,122,0.22)",
                }}>
                <span className="text-sm font-semibold" style={{ color: "#00B67A" }}>529+ tests across all departments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.30)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.60)" }}>Services</span>
          </nav>
        </div>
      </section>

      {/* ─────────────────── HUB CARDS ─────────────────── */}
      <section className="py-24" style={{ background: "#F7F9FC" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="lab-subtitle mb-4">Explore</p>
            <h2 className="h-display text-3xl sm:text-4xl" style={{ color: "#040B2F" }}>
              Choose How You&apos;d Like to Start
            </h2>
          </Reveal>

          <Reveal stagger staggerGap={0.12} className="grid md:grid-cols-2 gap-6">
            {/* Lab Tests */}
            <RevealItem>
              <Link href="/services/lab-tests"
                className="group block rounded-3xl overflow-hidden relative"
                style={{ background: "#040B2F", minHeight: "380px", display: "flex", flexDirection: "column" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="absolute top-0 right-0 pointer-events-none rounded-full"
                  style={{
                    width: "260px", height: "260px",
                    background: "radial-gradient(circle, rgba(0,182,122,0.14), transparent 70%)",
                    transform: "translate(35%, -35%)",
                  }}
                />
                <div className="relative z-10 p-8 sm:p-10 flex flex-col flex-1">
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: "rgba(0,182,122,0.12)", border: "1px solid rgba(0,182,122,0.25)" }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/>
                        <path d="M8.5 2h7"/><path d="M7 16h10"/>
                      </svg>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#00B67A" }}>Individual Tests</div>
                    <h3 className="text-white h-display text-2xl sm:text-3xl mb-3">Lab Tests</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                      Search 529+ diagnostic tests by name, method or sample type. View price, turnaround, and book in seconds.
                    </p>
                  </div>
                  <ul className="mt-7 space-y-2.5 flex-1">
                    {["Rapid result delivery", "Home sample collection", "Method & sample type listed"].map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.62)" }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(0,182,122,0.18)", color: "#00B67A" }}>
                          <Check />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-8 pt-6"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-sm font-semibold" style={{ color: "#00B67A" }}>Browse all 529+ tests</span>
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#00B67A] group-hover:border-[#00B67A]"
                      style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)" }}>
                      <ArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>

            {/* Health Packages */}
            <RevealItem>
              <Link href="/services/packages"
                className="group block rounded-3xl overflow-hidden relative"
                style={{
                  background: "linear-gradient(145deg, #009E68 0%, #00B67A 45%, #00C98A 100%)",
                  minHeight: "380px", display: "flex", flexDirection: "column",
                }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="absolute top-0 right-0 pointer-events-none rounded-full"
                  style={{
                    width: "280px", height: "280px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.14), transparent 70%)",
                    transform: "translate(35%, -35%)",
                  }}
                />
                <div className="relative z-10 p-8 sm:p-10 flex flex-col flex-1">
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: "rgba(255,255,255,0.18)" }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                        <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
                      </svg>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.70)" }}>Bundled Savings</div>
                    <h3 className="text-white h-display text-2xl sm:text-3xl mb-3">Health Packages</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                      Curated bundles of essential tests at discounted prices — designed for preventive screening and peace of mind.
                    </p>
                  </div>
                  <ul className="mt-7 space-y-2.5 flex-1">
                    {["Full body checkup bundle", "Diabetes care package", "Women's health panel", "Cardiac risk profile"].map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white" style={{ background: "rgba(255,255,255,0.22)" }}>
                          <Check />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-8 pt-6"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.20)" }}>
                    <span className="text-sm font-semibold text-white">View all packages</span>
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white"
                      style={{ background: "rgba(255,255,255,0.20)", color: "#fff" }}>
                      <span className="group-hover:text-[#00B67A] transition-colors duration-300">
                        <ArrowRight />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────── FEATURED PACKAGES ─────────────────── */}
      {featuredPackages.length > 0 && (
        <section className="py-24" style={{ background: "#ffffff" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-14">
              <p className="lab-subtitle mb-4">Popular Packages</p>
              <h2 className="h-display text-3xl sm:text-4xl" style={{ color: "#040B2F" }}>
                Featured Health Packages
              </h2>
              <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: "#5D6478" }}>
                Curated test bundles at transparent prices — designed for your most common health screening needs.
              </p>
            </Reveal>

            <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPackages.map((pkg) => {
                const tests = pkg.tests.split("\n").filter(Boolean);
                return (
                  <RevealItem key={pkg.id}>
                    <div
                      className="bg-white rounded-2xl flex flex-col h-full"
                      style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                    >
                      <div className="p-6 flex flex-col flex-1">
                        {/* Badge row */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                            style={{ background: "#E6FAF4", color: "#00B67A" }}
                          >
                            <Check /> Featured
                          </span>
                          {tests.length > 0 && (
                            <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>
                              {tests.length} test{tests.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="h-display font-bold text-lg mb-2" style={{ color: "#040B2F" }}>
                          {pkg.title}
                        </h3>

                        {/* Description */}
                        {pkg.description && (
                          <p className="text-sm leading-relaxed mb-4" style={{ color: "#5D6478" }}>
                            {pkg.description.length > 110 ? pkg.description.slice(0, 110) + "…" : pkg.description}
                          </p>
                        )}

                        {/* Included tests */}
                        {tests.length > 0 && (
                          <ul className="space-y-2 mb-4 flex-1">
                            {tests.slice(0, 4).map((t) => (
                              <li key={t} className="flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
                                <span
                                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                  style={{ background: "#E6FAF4", color: "#00B67A" }}
                                >
                                  <Check />
                                </span>
                                {t}
                              </li>
                            ))}
                            {tests.length > 4 && (
                              <li className="text-xs pl-6" style={{ color: "#94A3B8" }}>
                                +{tests.length - 4} more included
                              </li>
                            )}
                          </ul>
                        )}

                        {/* Price */}
                        <div
                          className="flex items-end gap-2 mt-auto pt-4"
                          style={{ borderTop: "1px solid #F1F5F9" }}
                        >
                          <span className="text-2xl font-black" style={{ color: "#00B67A" }}>
                            NPR {pkg.price.toLocaleString()}
                          </span>
                          {pkg.oldPrice && (
                            <span className="text-sm mb-1 line-through" style={{ color: "#94A3B8" }}>
                              NPR {pkg.oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Book button */}
                      <div className="px-6 pb-6">
                        <Link
                          href={`/appointments?test=${encodeURIComponent(pkg.title)}`}
                          className="lab-btn inline-flex w-full justify-center text-sm"
                          style={{ borderRadius: "10px", padding: "12px" }}
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </Reveal>

            <div className="text-center mt-10">
              <Link href="/services/packages" className="lab-btn-ghost" style={{ padding: "12px 36px", fontSize: "14px" }}>
                View All Packages
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
      <section className="py-24" style={{ background: "#F7F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="lab-subtitle mb-4">Simple Process</p>
            <h2 className="h-display text-3xl sm:text-4xl" style={{ color: "#040B2F" }}>
              From Booking to <span className="text-gradient">Results</span>
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "#5D6478" }}>
              A four-step journey designed to be fast, stress-free, and transparent at every stage.
            </p>
          </Reveal>

          <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((s, i) => (
              <RevealItem key={s.n}>
                <div
                  className="bg-white rounded-3xl p-7 h-full relative overflow-hidden"
                  style={{ border: "1px solid #EEF1F6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                  {/* large background step number */}
                  <div
                    className="absolute top-3 right-4 font-black select-none pointer-events-none"
                    style={{ fontSize: "72px", lineHeight: 1, color: "rgba(0,182,122,0.06)" }}
                  >
                    {s.n}
                  </div>

                  {/* Icon */}
                  <div className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 relative z-10"
                    style={{
                      width: "52px", height: "52px",
                      background: i === 0 ? "#EFF6FF" : i === 1 ? "#F0FDF4" : i === 2 ? "#FDF4FF" : "#FFF7ED",
                      color: i === 0 ? "#3B82F6" : i === 1 ? "#00B67A" : i === 2 ? "#A855F7" : "#F59E0B",
                    }}>
                    {s.icon}
                  </div>

                  {/* Step label */}
                  <div className="text-xs font-bold uppercase tracking-widest mb-1.5 relative z-10" style={{ color: "#00B67A" }}>
                    Step {s.n}
                  </div>

                  <h3 className="font-bold text-lg mb-2 h-display relative z-10" style={{ color: "#040B2F" }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed relative z-10" style={{ color: "#5D6478" }}>
                    {s.desc}
                  </p>

                  {/* connector dot (hidden on last) */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-2.5 w-5 h-5 rounded-full z-20 border-4 border-[#F7F9FC]"
                      style={{ background: "#00B67A" }}
                    />
                  )}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
