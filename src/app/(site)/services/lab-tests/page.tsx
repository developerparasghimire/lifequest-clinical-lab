import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServicesBrowser from "@/components/services/ServicesBrowser";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "All Lab Tests",
  description: "Browse all diagnostic tests offered by Life Quest Clinical Lab — biochemistry, hematology, hormones, molecular diagnostics, histopathology and more. Search any test by name.",
  keywords: [
    "lab tests Nepal",
    "medical tests Kathmandu",
    "blood test list Nepal",
    "biochemistry tests",
    "hematology tests",
    "hormone tests Nepal",
  ],
  alternates: { canonical: "/services/lab-tests" },
  openGraph: {
    title: "All Lab Tests · Life Quest Clinical Lab",
    description: "Browse all diagnostic tests with pricing — search by name, method or sample type.",
    url: "/services/lab-tests",
    type: "website",
  },
};

export default function LabTestsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        <div className="absolute inset-0">
          <Image
            src="/julia-koblitz-RlOAwXt2fEA-unsplash.jpg"
            alt="Lab test services"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(274deg, rgba(1,9,10,0.25) 30%, rgba(1,9,10,0.72) 65%, rgba(1,9,10,0.97))",
                "linear-gradient(1deg, rgba(1,9,10,0.15) 40%, rgba(1,9,10,0.5) 75%, rgba(1,9,10,0.88))",
              ].join(", "),
            }}
          />
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none animate-blob-1" style={{ background: "rgba(19,76,247,0.28)", filter: "blur(80px)" }} />
          <div className="absolute -bottom-24 right-0 w-[400px] h-[400px] rounded-full pointer-events-none animate-blob-2" style={{ background: "rgba(0,198,255,0.14)", filter: "blur(70px)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <Reveal>
          <div className="inline-flex items-center gap-2 mb-5 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#134CF7" }}>
            <span className="inline-block w-6 h-[2px] rounded" style={{ background: "#134CF7" }} />
            Life Quest Clinical Lab
          </div>
          <h1 className="font-bold leading-[1.07] tracking-tight mb-5 h-display" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff" }}>
            All Our Lab Tests
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            Search by test name, method (CLIA, PCR, ELISA…) or sample type.
            Every entry shows price, sample requirement, and turnaround time.
          </p>
          <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span style={{ color: "#fff" }}>Lab Tests</span>
          </nav>
          </Reveal>
        </div>
      </section>

      {/* Browser */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesBrowser />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50 relative overflow-hidden grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <span className="inline-block bg-blue-100 text-blue-700 font-semibold text-sm uppercase tracking-widest px-5 py-2 rounded-full mb-5">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 h-display">
              How It <span className="text-gradient">Works</span>
            </h2>
          </Reveal>
          <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "📋", title: "Book Online", desc: "Click Book on any test and fill in your details." },
              { step: "02", icon: "🩸", title: "Sample Collection", desc: "Visit a branch or opt for home collection." },
              { step: "03", icon: "🔬", title: "Lab Processing", desc: "Analysed by qualified staff on calibrated equipment." },
              { step: "04", icon: "📱", title: "Get Results", desc: "Signed report delivered to your email same day." },
            ].map((s) => (
              <RevealItem key={s.step}>
              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm card-premium text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg">
                  {s.icon}
                </div>
                <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">Step {s.step}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
