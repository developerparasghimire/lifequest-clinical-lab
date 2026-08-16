import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function HomeCollection() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="right" className="order-2 lg:order-1">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#00B67A" }}>Home Collection</p>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-5 leading-tight h-display"
                style={{ color: "#040B2F" }}
              >
                We Bring Tests to Your Door
              </h2>

              <p className="text-base leading-relaxed mb-4" style={{ color: "#5D6478" }}>
                Get your tests done in the comfort of your home, with the assistance of our skilled technicians — no waiting rooms, no travel.
              </p>

              <p className="text-base leading-relaxed mb-8" style={{ color: "#5D6478" }}>
                We make healthcare accessible and hassle-free for every patient across Kathmandu and our service areas.
              </p>

              <Link
                href="/appointments"
                className="lab-btn btn-pop inline-flex items-center gap-2"
              >
                Book Home Collection
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="order-1 lg:order-2">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                <Image
                  src="/our%20images/DSC00045.jpg"
                  alt="Home sample collection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

