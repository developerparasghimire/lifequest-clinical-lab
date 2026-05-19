import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PackagesBrowser from "@/components/services/PackagesBrowser";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Health Checkup Packages",
  description: "Affordable curated health packages from Life Quest Clinical Lab — full body checkup, diabetes, thyroid, cardiac and more. Save more with bundled tests.",
  alternates: { canonical: "/services/packages" },
  openGraph: {
    title: "Health Checkup Packages · Life Quest Clinical Lab",
    description: "Affordable curated health packages — full body checkup, diabetes, thyroid, cardiac and more.",
    url: "/services/packages",
    type: "website",
  },
};

export default function PackagesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        <div className="absolute inset-0">
          <Image
            src="/julia-koblitz-RlOAwXt2fEA-unsplash.jpg"
            alt="Health checkup packages"
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
              Health Checkup Packages
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              Curated bundles of essential tests at discounted prices. Choose the package that fits your health goals.
            </p>
            <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span style={{ color: "#fff" }}>Packages</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* Browser */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PackagesBrowser />
        </div>
      </section>
    </>
  );
}
