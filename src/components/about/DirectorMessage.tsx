import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * "Message From Director", laid out like page 2 of the company profile
 * brochure: a lab photo cut by a diagonal navy stripe with a lime accent,
 * the title and framed portrait sitting in the white wedge below the stripe,
 * a right-aligned name block, then the message.
 *
 * Both photos are the originals extracted from the brochure PDF.
 *
 * On large screens the portrait column is pulled up into the banner so it
 * lands in the white area under the stripe (the banner's percentage-based
 * diagonal is tuned for that overlap); smaller screens simply stack.
 */

const NAVY = "#2B3A91";
const LIME = "#A6C43C";

const paragraphs = [
  "At Life Quest Clinical Lab, our mission is to empower better healthcare through precision, reliability, and affordability. We understand the vital role that accurate diagnostic results play in shaping medical decisions and improving patient outcomes.",
  "Our commitment to excellence is unwavering. We are dedicated to providing the highest standards of accuracy, reliability, and precision in every diagnostic service we offer. From advanced technology to a team of highly skilled professionals, we leave no stone unturned in ensuring that every result meets the strictest quality benchmarks.",
  "Quality is not just a goal; it's our promise. We continuously invest in cutting-edge equipment, rigorous training, and robust quality control processes to ensure that our services are at the forefront of diagnostic innovation. Our mission is to empower healthcare providers and patients with the confidence they need to make informed decisions.",
  "Our commitment to continuous improvement, ethical practices, and exceptional customer service sets us apart in delivering the highest quality of care.",
];

export default function DirectorMessage() {
  return (
    <Reveal>
      <article
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 55%, #F1F6FF 100%)",
          border: "1px solid #E2E6F0",
          boxShadow: "0 18px 50px rgba(4,11,47,0.08)",
        }}
      >
        {/* ── Banner: lab photo with the brochure's diagonal cut ── */}
        <div className="relative h-48 sm:h-72 lg:h-[400px]">
          <Image
            src="/our%20images/director-lab-banner.jpg"
            alt="Life Quest Clinical Lab — Beckman Coulter Access 2 analyser in the laboratory"
            fill
            priority={false}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />
          {/* white wedge below the stripe */}
          <div
            className="absolute inset-0 bg-white"
            style={{ clipPath: "polygon(0 92%, 100% 30%, 100% 100%, 0 100%)" }}
          />
          {/* navy stripe along the diagonal */}
          <div
            className="absolute inset-0"
            style={{ background: NAVY, clipPath: "polygon(0 80%, 100% 18%, 100% 30%, 0 92%)" }}
          />
          {/* lime accent tucked under the stripe at the right edge */}
          <div
            className="absolute inset-0"
            style={{ background: LIME, clipPath: "polygon(100% 30%, 100% 56%, 84% 39.9%)" }}
          />
        </div>

        {/* ── Content ── */}
        <div className="relative px-6 sm:px-10 lg:px-14 pb-10 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8 lg:gap-12">
            {/* Title, portrait and name — first on phones, right column on desktop */}
            <div className="lg:order-2 relative z-10 -mt-2 sm:-mt-6 lg:-mt-[175px]">
              <h2
                className="font-black h-display text-right leading-tight"
                style={{ color: NAVY, fontSize: "clamp(1.75rem, 3vw, 2.6rem)" }}
              >
                Message From Director
              </h2>
              <div
                className="relative mt-4 overflow-hidden"
                style={{
                  aspectRatio: "3565 / 2056",
                  borderRadius: "1.75rem",
                  border: `4px solid ${NAVY}`,
                  boxShadow: "0 14px 34px rgba(43,58,145,0.22)",
                }}
              >
                <Image
                  src="/team/rakesh-pokhrel-director.jpg"
                  alt="Rakesh Pokhrel, Managing Director and Founder of Life Quest Clinical Lab"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
              <div className="mt-5 text-right">
                <p className="text-2xl font-black" style={{ color: NAVY }}>Rakesh Pokhrel</p>
                <p className="font-bold italic" style={{ color: "#16A34A" }}>Managing Director / Founder</p>
                <p className="text-sm font-semibold mt-1" style={{ color: "#1F2A44" }}>MSc. Clinical Biochemistry, IOM</p>
                <p className="text-sm font-semibold" style={{ color: "#1F2A44" }}>MSc. Total Quality Management</p>
              </div>
            </div>

            {/* Message */}
            <div className="lg:order-1 lg:pt-10 space-y-4 text-[15px] sm:text-base leading-relaxed font-medium" style={{ color: "#1F2A44" }}>
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              <p className="font-bold" style={{ color: NAVY }}>
                Thank you for placing your trust in us. Together, we strive for a dependable diagnosis.
              </p>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
