import { getTestimonials } from "@/lib/cms";
import TestimonialsSlider from "./TestimonialsSlider";
import Reveal from "@/components/ui/Reveal";

export default async function Testimonials() {
  const items = await getTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Patient Stories</p>
          <h2
            className="text-4xl sm:text-5xl font-bold h-display"
            style={{ color: "#040B2F" }}
          >
            What Our{" "}
            <span style={{ color: "#00B67A" }}>Patients Say</span>
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: "#5D6478" }}>
            Thousands of patients trust Life Quest Clinical Lab for accurate,
            timely, and compassionate diagnostic services.
          </p>
        </Reveal>

        <TestimonialsSlider items={items} />
      </div>
    </section>
  );
}
