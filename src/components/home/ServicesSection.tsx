import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/ui/Reveal";
import ServicesSlider from "@/components/home/ServicesSlider";

export default async function ServicesSection() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });


  return (
    <section className="py-24 relative overflow-hidden mesh-light" style={{ background: "#F6F6F6" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <div className="lab-subtitle justify-center mb-4">Our Lab Expertise</div>
          <h2 className="text-4xl sm:text-5xl font-bold h-display" style={{ color: "#040B2F" }}>
            Scientific Research and Laboratory{" "}
            <span style={{ color: "#134CF7" }}>Services</span>
          </h2>
        </Reveal>

        {/* Cards grid */}
        {services.length === 0 ? (
          <div className="text-center py-16" style={{ color: "#444444" }}>
            <p className="text-lg">Services are being updated. Check back soon!</p>
          </div>
        ) : (
          <ServicesSlider services={services} />
        )}

        {/* View all */}
        <div className="text-center mt-12">
          <Link href="/services" className="lab-btn btn-pop inline-flex items-center gap-2" style={{ borderRadius: "10px" }}>
            <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
              <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
