import Reveal, { RevealItem } from "@/components/ui/Reveal";

const departments = [
  {
    n: "01",
    name: "Biochemistry & Immunology",
    tag: "Core Chemistry",
    desc: "Metabolic panels, liver & kidney function, lipid profiles, thyroid hormones, tumour markers, and immunoassays.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1a1 1 0 0 0 .9 1.9h12.76a1 1 0 0 0 .9-1.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/>
        <path d="M8.5 2h7"/><path d="M7 16h10"/>
      </svg>
    ),
  },
  {
    n: "02",
    name: "Hematology",
    tag: "Blood Sciences",
    desc: "Complete blood counts, peripheral smear, coagulation studies (PT, APTT, INR), ESR, and blood grouping.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
      </svg>
    ),
  },
  {
    n: "03",
    name: "Microbiology",
    tag: "Infection Detection",
    desc: "Bacterial & fungal culture with sensitivity, AFB smear, parasitology, urine culture, and wound swabs.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/>
      </svg>
    ),
  },
  {
    n: "04",
    name: "Histopathology",
    tag: "Tissue Analysis",
    desc: "Biopsy processing, H&E staining, special stains, and microscopic examination for cancer and organ pathology.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="m15 9-6 6"/>
      </svg>
    ),
  },
  {
    n: "05",
    name: "Cytopathology",
    tag: "Cell Diagnostics",
    desc: "Pap smear, liquid-based cytology, FNAC, sputum cytology, and body-fluid analysis for early cancer detection.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    n: "06",
    name: "Molecular Diagnostics",
    tag: "PCR & Genomics",
    desc: "RT-PCR for TB, HIV, HBV, HCV, HPV; viral-load quantification; drug-resistance genotyping.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 15c6.667-6 13.333 6 20 0"/><path d="M2 9c6.667-6 13.333 6 20 0"/>
        <path d="M8 21v-4M8 7V3M16 21v-4M16 7V3"/>
        <circle cx="8" cy="17" r="1" fill="currentColor"/>
        <circle cx="8" cy="7" r="1" fill="currentColor"/>
        <circle cx="16" cy="17" r="1" fill="currentColor"/>
        <circle cx="16" cy="7" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    n: "07",
    name: "Immunofluorescence",
    tag: "Autoimmune",
    desc: "ANA, ANCA, anti-dsDNA antibodies; direct IF on biopsies for IgG, IgA, IgM, and complement deposits.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    n: "08",
    name: "Next Generation Sequencing",
    tag: "Precision Medicine",
    desc: "Whole-exome sequencing, NIPT, tumour mutational profiling, and pharmacogenomics for personalised therapy.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h3v3H3zM3 10.5h3v3H3zM3 18h3v3H3z"/>
        <path d="M18 3h3v3h-3zM18 10.5h3v3h-3zM18 18h3v3h-3z"/>
        <path d="M6 4.5h12M6 12h12M6 19.5h12"/>
      </svg>
    ),
  },
];

export default function DepartmentsSection() {
  return (
    <section style={{ background: "#F4F7FA", padding: "96px 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#00B67A", marginBottom: "10px",
              }}>
                <span style={{ width: "20px", height: "2px", background: "#00B67A", display: "inline-block", borderRadius: "2px" }} />
                Our Departments
              </span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                color: "#040B2F", letterSpacing: "-0.025em", lineHeight: 1.1,
              }}>
                Eight Specialized<br />Disciplines
              </h2>
            </div>
            <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.75, maxWidth: "300px" }}>
              Dedicated instruments, certified reagents, and expert scientists — accurate results across every field.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <Reveal stagger staggerGap={0.055} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {departments.map((dept) => (
            <RevealItem key={dept.name}>
              <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 1px 3px rgba(4,11,47,0.06), 0 4px 12px rgba(4,11,47,0.04)",
              }}>

                {/* Card body */}
                <div style={{ padding: "24px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>

                  {/* Icon row */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "18px" }}>
                    <div style={{
                      width: "48px", height: "48px",
                      borderRadius: "12px",
                      background: "#E6FAF4",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#00B67A",
                      flexShrink: 0,
                    }}>
                      {dept.icon}
                    </div>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: "#CBD5E1",
                    }}>
                      {dept.n}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px", fontWeight: 700,
                    color: "#040B2F", lineHeight: 1.35,
                    margin: "0 0 6px 0",
                  }}>
                    {dept.name}
                  </h3>

                  {/* Tag */}
                  <span style={{
                    fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "#00B67A",
                    display: "block",
                    marginBottom: "14px",
                  }}>
                    {dept.tag}
                  </span>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "#EEF2F7", marginBottom: "14px" }} />

                  {/* Description */}
                  <p style={{
                    fontSize: "13px", color: "#64748B",
                    lineHeight: 1.75, margin: 0, flex: 1,
                  }}>
                    {dept.desc}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
