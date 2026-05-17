import { getTestimonials } from "@/lib/cms";
import TestimonialsSlider from "./TestimonialsSlider";
import Reveal from "@/components/ui/Reveal";

export default async function Testimonials() {
  const items = await getTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none opacity-40" style={{ background: "radial-gradient(closest-side,rgba(19,76,247,0.10),transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal className="text-center mb-14">
          <div className="lab-subtitle justify-center mb-4">Testimonials</div>
          <h2 className="text-4xl sm:text-5xl font-bold h-display" style={{ color: "#040B2F" }}>
            What Our <span className="text-gradient">Patients Say</span>
          </h2>
        </Reveal>

        <TestimonialsSlider items={items} />
      </div>
    </section>
  );
}
