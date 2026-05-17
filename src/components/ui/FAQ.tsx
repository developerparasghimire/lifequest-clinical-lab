"use client";

import Reveal, { RevealItem } from "@/components/ui/Reveal";

interface FAQItem { q: string; a: string }

interface FAQProps {
  items?: FAQItem[];
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  className?: string;
}

const DEFAULTS: FAQItem[] = [
  {
    q: "Do I need an appointment for sample collection?",
    a: "Walk-ins are welcome at all three branches during operating hours. For home sample collection or specialised tests that need preparation, booking online ensures we reserve your preferred slot.",
  },
  {
    q: "How quickly will I receive my reports?",
    a: "Routine biochemistry, hematology, and hormone panels are released the same day. Specialised molecular and histopathology reports take 2–7 working days; you will see the exact TAT on each test page.",
  },
  {
    q: "Are home sample collection services available?",
    a: "Yes. Our trained phlebotomists collect samples across the Kathmandu Valley between 6 AM and 10 AM. A small visit fee applies; reports are delivered electronically the same day.",
  },
  {
    q: "Do I need to fast before my test?",
    a: "Fasting is required for tests like FBS, Lipid Profile and Insulin (typically 8–12 hours of water-only fasting). Each test page lists exact preparation requirements at the time of booking.",
  },
  {
    q: "How do I receive my reports?",
    a: "Signed digital reports are emailed to you securely as soon as they are released. Printed copies can be collected from any of our branches with a valid photo ID.",
  },
  {
    q: "Are your tests covered by insurance?",
    a: "We provide itemised invoices that are accepted by all major insurance providers in Nepal. For corporate or panel arrangements, please contact our front desk.",
  },
];

export default function FAQ({
  items = DEFAULTS,
  eyebrow = "FAQ",
  title = "Questions Patients",
  highlight = "Often Ask",
  description = "Quick answers to the things people ask us most. Can’t find what you need? Our team is happy to help.",
  className,
}: FAQProps) {
  return (
    <section className={`py-24 bg-white ${className ?? ""}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <div className="lab-subtitle justify-center mb-4">{eyebrow}</div>
          <h2 className="text-4xl sm:text-5xl font-bold h-display" style={{ color: "#040B2F" }}>
            {title} <span style={{ color: "#134CF7" }}>{highlight}</span>
          </h2>
          {description && (
            <p className="mt-5 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#444" }}>
              {description}
            </p>
          )}
        </Reveal>

        <Reveal stagger staggerGap={0.05} className="mt-4">
          {items.map((item, i) => (
            <RevealItem key={i}>
              <details className="faq-item group">
                <summary>
                  <span className="pr-4">{item.q}</span>
                  <span className="faq-icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <div className="faq-body">{item.a}</div>
              </details>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
