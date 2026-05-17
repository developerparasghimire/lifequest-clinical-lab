import Reveal, { RevealItem } from "@/components/ui/Reveal";

const features = [
  {
    number: "01",
    title: "Analytical Testing",
    desc: "Perform precise chemical, biological, and physical analyses for reliable diagnostic results.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="52" width="52" fill="none" stroke="#134CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 11.5V16l-3.06 2.678a2.751 2.751 0 0 0 -0.94 2.071h0a2.75 2.75 0 0 0 2.749 2.751h5.5a2.75 2.75 0 0 0 2.75 -2.75h0a2.75 2.75 0 0 0 -0.939 -2.07L19.5 16v-4.5" />
        <path d="m12.59 21.446 2.043 -1.013a3.9 3.9 0 0 1 3.679 0.1h0a3.9 3.9 0 0 0 3.471 0.2l1.617 -0.713" />
        <path d="M10.5 20.5h-9a1 1 0 0 1 -1 -1v-15a1 1 0 0 1 1 -1h3" />
        <path d="M12.5 3.5h3a1 1 0 0 1 1 1v5" />
        <path d="M10.5 2.5a2 2 0 0 0 -4 0H5a0.5 0.5 0 0 0 -0.5 0.5v3a0.5 0.5 0 0 0 0.5 0.5h7a0.5 0.5 0 0 0 0.5 -0.5V3a0.5 0.5 0 0 0 -0.5 -0.5Z" />
        <path d="m15 11.5 6 0" />
        <path d="m5 9.5 7 0" />
        <path d="m5 12.5 4.25 0" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Sample Analysis",
    desc: "Accurately examine and process blood, urine, and tissue samples for consistent, reliable results.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="52" width="52" fill="none" stroke="#134CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.762 6.15a5.951 5.951 0 0 1 -2.608 0.521 0.5 0.5 0 0 0 -0.466 0.7l2.582 5.741a0.494 0.494 0 0 0 0.831 0.115 5.936 5.936 0 0 1 2.121 -1.6l9.652 -4.339a3.075 3.075 0 0 0 1.8 -3.447 3 3 0 0 0 -4.158 -2.072Z" />
        <path d="M7.249 20.5a2 2 0 0 1 -4 0c0 -0.79 1.023 -2.24 1.605 -3a0.5 0.5 0 0 1 0.789 0c0.583 0.76 1.606 2.21 1.606 3" />
        <path d="m8.945 11.747 -1.23 -2.736" />
        <path d="m11.682 10.517 -0.821 -1.825" />
        <path d="m14.418 9.287 -1.231 -2.736" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Molecular Research",
    desc: "Explore genes, proteins, and cellular processes with advanced clinical laboratory techniques.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="52" width="52" stroke="#134CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path strokeLinejoin="round" d="m8.80516 4.65601 4.57874 2.64354v5.28705l-4.57874 2.6436 -4.57876 -2.6436V7.29955z" />
        <path strokeLinejoin="round" d="m13.3957 12.5322 4.5788 2.6436v5.2871l-4.5788 2.6435 -4.57872 -2.6435v-5.2871z" />
        <path strokeLinejoin="round" d="m17.9863 4.65601 4.5788 2.64354v5.28705l-4.5788 2.6436 -4.5787 -2.6436V7.29955z" />
      </svg>
    ),
  },
];

// Laborax-style corner decoration SVG
function CornerDecoration() {
  return (
    <svg width="80" height="80" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0C19.33 0 35 15.67 35 35V41C35 60.33 50.67 76 70 76H76C95.33 76 111 91.67 111 111V0H0Z" fill="#F6F6F6" />
    </svg>
  );
}

export default function TrustBar() {
  return (
    <section className="py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal stagger staggerGap={0.12} className="grid grid-cols-1 md:grid-cols-3 -mt-16 relative z-10 gap-px" style={{ background: "#DCDCDC" }}>
          {features.map((f) => (
            <RevealItem key={f.title}>
            <div
              className="trustbar-card relative bg-white p-10 overflow-hidden group cursor-default h-full"
            >
              <CornerDecoration />

              {/* Icon */}
              <div className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">{f.icon}</div>

              {/* Title */}
              <h4 className="trustbar-title text-xl font-semibold mb-3 transition-colors duration-300" style={{ color: "#040B2F" }}>{f.title}</h4>

              {/* Desc */}
              <p className="text-sm leading-relaxed" style={{ color: "#444444" }}>{f.desc}</p>

              {/* Number */}
              <div
                className="trustbar-num absolute bottom-6 right-6 text-5xl font-black transition-colors duration-300"
                style={{ color: "#F6F6F6", lineHeight: 1, userSelect: "none", zIndex: 0 }}
              >
                {f.number}
              </div>
            </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
