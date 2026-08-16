"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const testCategories = [
  {
    label: "Vitamins",
    desc: "Understand your vitamin levels and spot potential deficiencies early.",
    tests: ["Vitamin D (25-OH)", "Vitamin B12", "Folate (Folic Acid)", "Vitamin A"],
    image: "/our%20images/DSC00078.jpg",
  },
  {
    label: "Diabetes",
    desc: "Monitor blood sugar levels and reduce risk of complications.",
    tests: ["HbA1c", "Fasting Blood Sugar", "Post Prandial Sugar", "Insulin Fasting"],
    image: "/our%20images/DSC00251.jpg",
  },
  {
    label: "Women's Health",
    desc: "Hormonal and reproductive health panels for women at every stage.",
    tests: ["FSH & LH", "Estradiol (E2)", "Progesterone", "TORCH Panel"],
    image: "/our%20images/DSC00269.jpg",
  },
  {
    label: "Thyroid",
    desc: "Comprehensive thyroid function tests for accurate diagnosis.",
    tests: ["TSH", "Free T3", "Free T4", "Anti-TPO Antibodies"],
    image: "/our%20images/DSC00065.jpg",
  },
  {
    label: "Bone & Joint Health",
    desc: "Assess bone density, calcium metabolism and joint markers.",
    tests: ["Vitamin D", "Calcium & Phosphorus", "Uric Acid", "CRP (hs)"],
    image: "/our%20images/DSC00057.jpg",
  },
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const cat = testCategories[activeTab];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold h-display"
              style={{ color: "#040B2F" }}
            >
              A Lab Test{" "}
              <span style={{ color: "#00B67A" }}>Just for You</span>
            </h2>
          </div>
          <Link
            href="/services/lab-tests"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#00B67A" }}
          >
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {testCategories.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setActiveTab(i)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: i === activeTab ? "#00B67A" : "#ECFDF5",
                color: i === activeTab ? "#fff" : "#5D6478",
                border: "none",
                cursor: "pointer",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Content: test list + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: description + test list */}
          <div>
            <p className="text-base mb-8" style={{ color: "#5D6478" }}>{cat.desc}</p>
            <div className="space-y-3">
              {cat.tests.map((t) => (
                <Link
                  key={t}
                  href="/services/lab-tests"
                  className="flex items-center justify-between px-5 py-4 rounded-xl transition-all group"
                  style={{ background: "#F0FDF9", border: "1px solid #E2E6F0" }}
                >
                  <span className="font-medium text-sm" style={{ color: "#040B2F" }}>{t}</span>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#00B67A]"
                    style={{ background: "#DCFCE7" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/appointments"
                className="lab-btn inline-flex items-center gap-2"
                style={{ fontSize: "14px", padding: "12px 28px" }}
              >
                Book This Test
              </Link>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative rounded-3xl overflow-hidden" style={{ height: "400px" }}>
            <Image
              key={cat.image}
              src={cat.image}
              alt={cat.label}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(4,11,47,0.4) 0%, transparent 60%)" }}
            />
            <div
              className="absolute bottom-5 left-5 right-5 text-white text-xl font-bold"
            >
              {cat.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
