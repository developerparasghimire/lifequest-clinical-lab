import type { Metadata } from "next";
import Link from "next/link";
import ServicesBrowser from "@/components/services/ServicesBrowser";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Inhouse Tests",
  description:
    "Browse Life Quest Clinical Lab inhouse tests, search by name, and explore recommended diagnostics.",
  alternates: { canonical: "/services/lab-tests" },
  openGraph: {
    title: "Inhouse Tests · Life Quest Clinical Lab",
    description:
      "Search Life Quest Clinical Lab inhouse tests and view recommended diagnostics.",
    url: "/services/lab-tests",
    type: "website",
  },
};

export default function LabTestsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #040B2F 0%, #071a3e 55%, #0a2060 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(0,182,122,0.18)", filter: "blur(80px)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Services</p>
            <h1 className="font-bold leading-tight mb-4 h-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#fff" }}>
              Inhouse Tests
            </h1>
            <p className="text-base max-w-xl mb-5" style={{ color: "rgba(255,255,255,0.78)" }}>
              Search and browse our full catalogue of diagnostic tests.
            </p>
            <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span style={{ color: "#fff" }}>Inhouse Tests</span>
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14" style={{ background: "#fcfcfc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesBrowser />
        </div>
      </section>
    </>
  );
}