import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import HomeCollection from "@/components/home/HomeCollection";
import WhyUs from "@/components/home/WhyUs";
import StatsStrip from "@/components/home/StatsStrip";
import BranchesSection from "@/components/home/BranchesSection";
import BlogSection from "@/components/home/BlogSection";
import FAQ from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Life Quest Clinical Lab",
  description:
    "Life Quest Clinical Lab — 529+ diagnostic tests, home sample collection, same-day reporting and three branches across Kathmandu, Birtamod and Gaighat.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Life Quest Clinical Lab — Life Quest Clinical Lab",
    description:
      "529+ diagnostic tests · 3 branches across Nepal · Home sample collection · Same-day reporting.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — full-screen with callback form */}
      <Hero />

      {/* 2. Home Collection — "We Bring Tests Home" */}
      <HomeCollection />

      {/* 3. About — "Your Trusted Partner in Quality Diagnostics" */}
      <WhyUs />

      {/* 4. Stats strip */}
      <StatsStrip />

      {/* 5. Branches — "We Are Right Next to You" */}
      <BranchesSection />

      {/* 6. Blog — Latest Articles */}
      <BlogSection />

      {/* 7. FAQ */}
      <FAQ />
    </>
  );
}
