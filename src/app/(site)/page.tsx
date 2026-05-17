import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import WhyUs from "@/components/home/WhyUs";
import Marquee from "@/components/home/Marquee";
import Testimonials from "@/components/home/Testimonials";
import BlogSection from "@/components/home/BlogSection";

export const metadata: Metadata = {
  title: "Trusted Medical Diagnostics in Nepal",
  description:
    "Life Quest Clinical Lab — Nepal's trusted medical laboratory offering 529+ diagnostic tests, home sample collection, same-day reporting and three branches across Kathmandu, Birtamod and Gaighat.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Life Quest Clinical Lab — Trusted Medical Diagnostics in Nepal",
    description:
      "529+ diagnostic tests · 3 branches across Nepal · Home sample collection · Same-day reporting.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyUs />
      <Marquee />
      <ServicesSection />
      <StatsSection />
      <Testimonials />
      <BlogSection />
    </>
  );
}
