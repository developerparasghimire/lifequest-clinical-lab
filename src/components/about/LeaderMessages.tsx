import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/** Short messages from the company profile brochure, styled as its coloured bands. */
const leaderMessages = [
  {
    name: "Prem Raj Pokhrel",
    role: "Executive Director / Co-founder",
    photo: "/team/prem-raj-pokhrel-portrait.jpg",
    background: "#A6C43C",
    text: "#141A3A",
    quote:
      "At Life Quest Clinical Lab, our mission is to provide precise, timely, and reliable diagnostic services with a commitment to excellence. We prioritize patient care, stringent quality standards, and the latest technology to ensure accurate results you can rely on. Your health and satisfaction are our top priorities, and we continuously strive to exceed expectations in every service we offer.",
  },
  {
    name: "Dr. Deliya Paudel",
    role: "Consultant Pathologist / Lab Head",
    photo: "/team/dr-deliya-paudel-portrait.jpg",
    background: "#2A4A9B",
    text: "#FFFFFF",
    quote:
      "At Life Quest Clinical Lab, quality is at the heart of everything we do. Our stringent quality control policies ensure the highest standards of accuracy, reliability, and precision in every test we perform. With state-of-the-art technology, rigorous protocols, and a dedicated team, we are committed to delivering trusted results that healthcare professionals and patients can rely on. Your health deserves nothing less than excellence.",
  },
];

export default function LeaderMessages() {
  return (
    <div className="mt-10 space-y-6">
      {leaderMessages.map((m, i) => (
        <Reveal key={m.name} delay={i * 0.08}>
          <figure
            className="rounded-3xl p-7 sm:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center"
            style={{ background: m.background, color: m.text }}
          >
            <div className="order-2 md:order-1">
              <blockquote className="text-base sm:text-lg leading-relaxed font-semibold">
                {m.quote}
              </blockquote>
              <figcaption className="mt-5 font-bold md:text-right">
                {m.name}, <span className="font-semibold opacity-90">{m.role}</span>
              </figcaption>
            </div>
            <div
              className="order-1 md:order-2 relative mx-auto overflow-hidden rounded-md w-36 h-44 sm:w-44 sm:h-[13.75rem]"
              style={{ border: "5px solid #fff", boxShadow: "0 12px 30px rgba(4,11,47,0.22)" }}
            >
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.role}`}
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-cover"
              />
            </div>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
