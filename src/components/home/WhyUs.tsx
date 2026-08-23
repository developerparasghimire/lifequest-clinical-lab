import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const capabilities = [
  {
    label: "Biochemistry & Immunology",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>,
  },
  {
    label: "Hematology",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l4.24 4.24"/></svg>,
  },
  {
    label: "Microbiology",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>,
  },
  {
    label: "Histopathology",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  },
  {
    label: "Cytopathology",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>,
  },
  {
    label: "Molecular Diagnostics",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  },
  {
    label: "Immunofluorescence",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    label: "Next Generation Sequencing",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-4V6"/><path d="M6 14h4v4"/><path d="M3 3l7 7"/><path d="M21 21l-7-7"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>,
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>About Us</p>
          <h2
            className="text-3xl sm:text-4xl font-bold h-display"
            style={{ color: "#040B2F" }}
          >
            Your Partner in Quality Diagnostics
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: Content */}
          <Reveal direction="right">
            <p className="text-base leading-relaxed mb-4" style={{ color: "#5D6478" }}>
              Established in 2021, Life Quest Clinical Lab was founded with a commitment to providing
              accurate, reliable, accessible, and quality-focused diagnostic services to patients and
              healthcare professionals across Nepal.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: "#5D6478" }}>
              Our comprehensive diagnostic services encompass Biochemistry, Hematology, Microbiology,
              Histopathology, Cytopathology, Immunology, Molecular Diagnostics, Genetic Testing, and
              specialised laboratory investigations — supported by modern technology and trained
              laboratory professionals.
            </p>

            {/* Capabilities list */}
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "#F0FDF9", border: "1px solid #E2E6F0" }}
                >
                  <span className="shrink-0">{c.icon}</span>
                  <span className="text-sm font-medium" style={{ color: "#040B2F" }}>{c.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/about" className="lab-btn inline-flex items-center gap-2" style={{ fontSize: "14px", padding: "12px 28px" }}>
                Learn More About Us
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>

          {/* Right: Image collage — desktop only */}
          <Reveal direction="left" delay={0.1} className="hidden lg:block">
            <div className="relative">
              <div className="flex gap-4">
                <div className="w-1/2 relative rounded-3xl overflow-hidden" style={{ height: "460px" }}>
                  <Image
                    src="/our%20images/DSC00269.jpg"
                    alt="Life Quest Clinical Lab full team"
                    fill sizes="250px" className="object-cover object-top"
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-4">
                  <div className="relative rounded-3xl overflow-hidden" style={{ height: "218px" }}>
                    <Image
                      src="/our%20images/DSC00045.jpg"
                      alt="Blood collection by Life Quest nurse"
                      fill sizes="250px" className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-3xl overflow-hidden flex-1" style={{ minHeight: "218px" }}>
                    <Image
                      src="/our%20images/DSC00149.jpg"
                      alt="Beckman Coulter Access 2 analyzer at Life Quest"
                      fill sizes="250px" className="object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
