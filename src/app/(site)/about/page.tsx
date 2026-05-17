import type { Metadata } from "next";
import Image from "next/image";
import { TOTAL_TESTS } from "@/data/services";
import PageBanner from "@/components/layout/PageBanner";
import { getBranches, getSettings, getTeamMembers } from "@/lib/cms";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Life Quest Clinical Lab — a Nepal-based medical laboratory committed to accurate, accessible diagnostics. Learn about our mission, team and three branches in Kathmandu, Birtamod and Gaighat.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Life Quest Clinical Lab",
    description:
      "Nepal-based medical laboratory committed to accurate, accessible diagnostics across three branches.",
    url: "/about",
    type: "website",
  },
};

const facts = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/>
        <path d="M8.5 2h7"/><path d="M7 16h10"/>
      </svg>
    ),
    value: `${TOTAL_TESTS}`,
    label: "Lab Tests",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    value: "3",
    label: "Branches in Nepal",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    value: "Same Day",
    label: "Standard Reports",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    value: "10+",
    label: "Years of Service",
  },
];

const principles = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Accuracy before everything",
    desc: "Daily QC, calibrated analysers, and pathologist sign-off on every report.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Transparent pricing",
    desc: "Each of our tests is published with its full price, sample requirement and TAT — no surprises.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Accessible to everyone",
    desc: "Three branches across Nepal and home sample collection on request.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Confidential by default",
    desc: "Reports are shared only with the patient or their authorised clinician.",
  },
];

export default async function AboutPage() {
  const [branches, settings, team] = await Promise.all([getBranches(), getSettings(), getTeamMembers()]);
  const mission =
    settings["about.mission"] ||
    "Our laboratory's mission is to provide high quality laboratory services at reasonable prices in the shortest time possible, with the importance on quality and complete client contentment.";
  const vision =
    settings["about.vision"] ||
    "To ensure that the entire laboratory examination procedures conducted give accuracy, reliable and the highest quality results.";
  const story = settings["about.story"] || "";
  return (
    <>
      <PageBanner
        page="about"
        fallbackTitle="Quality Comes First"
        fallbackSubtitle={`Life Quest Clinical Lab — ${TOTAL_TESTS} routine and specialised tests across Nepal with same-day reporting.`}
      />

      {/* Facts */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal stagger staggerGap={0.08} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {facts.map((f) => (
              <RevealItem key={f.label}>
              <div
                className="bg-white rounded-lg p-7 border card-premium text-center group h-full"
                style={{ borderColor: "#DCDCDC" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "#134CF7" }}
                >
                  {f.icon}
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color: "#040B2F" }}>{f.value}</p>
                <p className="text-sm" style={{ color: "#444444" }}>{f.label}</p>
              </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <div className="lab-subtitle justify-center mb-4">Who We Are</div>
            <h2 className="text-4xl sm:text-5xl font-bold h-display" style={{ color: "#040B2F" }}>
              Discover the Heart of <span className="text-gradient">Life Quest</span>
            </h2>
          </Reveal>
          <Reveal stagger staggerGap={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealItem>
              <div className="rounded-xl p-10 h-full border card-premium" style={{ borderColor: "#DCDCDC", background: "#F6F6F6" }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ background: "#134CF7" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#040B2F" }}>Our Mission</h3>
                <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: "#444444" }}>
                  {mission}
                </p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="rounded-xl p-10 h-full border card-premium" style={{ borderColor: "#DCDCDC", background: "#F6F6F6" }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ background: "#134CF7" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#040B2F" }}>Our Vision</h3>
                <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: "#444444" }}>
                  {vision}
                </p>
              </div>
            </RevealItem>
          </Reveal>
          {story && (
            <Reveal className="mt-10">
              <div className="rounded-xl p-10 border card-premium" style={{ borderColor: "#DCDCDC", background: "#fff" }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#040B2F" }}>Our Story</h3>
                <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: "#444444" }}>{story}</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 relative overflow-hidden mesh-light" style={{ background: "#F6F6F6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <div className="lab-subtitle justify-center mb-4">How We Work</div>
            <h2 className="text-4xl sm:text-5xl font-bold h-display" style={{ color: "#040B2F" }}>
              Four Commitments That Shape{" "}
              <span className="text-gradient">Every Report</span>
            </h2>
          </Reveal>
          <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {principles.map((p) => (
              <RevealItem key={p.title}>
              <div
                className="bg-white rounded-lg p-8 border card-premium flex gap-5 h-full"
                style={{ borderColor: "#DCDCDC" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "#134CF7" }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#040B2F" }}>{p.title}</h3>
                  <p className="leading-relaxed" style={{ color: "#444444" }}>{p.desc}</p>
                </div>
              </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Meet Our Team */}
      {team.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-14">
              <div className="lab-subtitle justify-center mb-4">Meet Our Team</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold h-display" style={{ color: "#040B2F" }}>
                The People Behind <span className="text-gradient">Every Report</span>
              </h2>
              <p className="text-base mt-4 max-w-2xl mx-auto" style={{ color: "#444" }}>
                Skilled pathologists, technologists and support staff working together to deliver accurate diagnostics.
              </p>
            </Reveal>
            <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {team.map((m, index) => (
                <RevealItem key={m.id}>
                  <div
                    className="card-premium bg-white text-center h-full flex flex-col overflow-hidden"
                    style={{ borderRadius: "16px", border: "1px solid #DCDCDC" }}
                  >
                    {/* Photo */}
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
                        <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold" style={{ color: "#134CF7", background: "#EEF3FF" }}>
                          {m.name.split(/\s+/).slice(0, 2).map((s: string) => s[0]?.toUpperCase()).join("")}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold" style={{ color: "#040B2F" }}>{m.name}</h3>
                      <p className="text-sm font-semibold mb-3" style={{ color: "#134CF7" }}>{m.role}</p>
                      {m.bio && (
                        <p className="text-sm leading-relaxed line-clamp-3 mb-4 flex-1" style={{ color: "#444" }}>
                          {m.bio}
                        </p>
                      )}

                      {/* Socials */}
                      {(m.facebook || m.twitter || m.linkedin || m.email) && (
                        <div className="flex items-center justify-center gap-2 mt-auto pt-4 border-t" style={{ borderColor: "#F0F0F0" }}>
                          {m.facebook && (
                            <a href={m.facebook} target="_blank" rel="noreferrer" aria-label={`${m.name} on Facebook`}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#134CF7] hover:text-white"
                              style={{ background: "#F6F6F6", color: "#134CF7" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                          )}
                          {m.twitter && (
                            <a href={m.twitter} target="_blank" rel="noreferrer" aria-label={`${m.name} on Twitter`}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#134CF7] hover:text-white"
                              style={{ background: "#F6F6F6", color: "#134CF7" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                          )}
                          {m.linkedin && (
                            <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#134CF7] hover:text-white"
                              style={{ background: "#F6F6F6", color: "#134CF7" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                          )}
                          {m.email && (
                            <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#134CF7] hover:text-white"
                              style={{ background: "#F6F6F6", color: "#134CF7" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
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

      {/* Branches */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <div className="lab-subtitle justify-center mb-4">Our Locations</div>
            <h2 className="text-4xl sm:text-5xl font-bold h-display" style={{ color: "#040B2F" }}>
              Three Branches <span className="text-gradient">Across Nepal</span>
            </h2>
          </Reveal>
          <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-7">
            {branches.map((b) => (
              <RevealItem key={b.id}>
              <div
                className="rounded-lg p-8 border card-premium text-center h-full"
                style={{ background: "#F6F6F6", borderColor: "#DCDCDC" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg mb-5 mx-auto"
                  style={{ background: "#134CF7" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#040B2F" }}>{b.name}</h3>
                <p className="text-sm mb-4" style={{ color: "#444444" }}>{b.address}</p>
                {b.phone && (
                  <a
                    href={`tel:${b.phone.split(/[\/·]/)[0].trim()}`}
                    className="inline-flex items-center gap-2 font-semibold text-sm transition-opacity hover:opacity-70"
                    style={{ color: "#134CF7" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
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

    </>
  );
}
