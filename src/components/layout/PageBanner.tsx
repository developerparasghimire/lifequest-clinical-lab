import Image from "next/image";
import Link from "next/link";
import { getBanner } from "@/lib/cms";
import Reveal from "@/components/ui/Reveal";

interface PageBannerProps {
  page: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackImage?: string;
}

/** Per-page Unsplash fallback images (dark lab/science themed) */
const PAGE_IMAGES: Record<string, string> = {
  about:        "/testalize-me-ZdToNCVLpOg-unsplash.jpg",
  services:     "/kropekk_pl-lab-313879_1920.jpg",
  blog:         "/stephen-dawson-qwtCeJ5cLYs-unsplash.jpg",
  contact:      "/moritz-kindler-G66K_ERZRhM-unsplash.jpg",
  appointments: "/ousa-chea-gKUC4TMhOiY-unsplash.jpg",
  default:      "/matthias_koll_leverkusen-corona-7014304_1920.jpg",
};

export default async function PageBanner({
  page,
  fallbackTitle,
  fallbackSubtitle,
  fallbackImage,
}: PageBannerProps) {
  const banner = await getBanner(page);

  const title     = banner?.title    || fallbackTitle;
  const subtitle  = banner?.subtitle || fallbackSubtitle;
  const image     = banner?.image    || fallbackImage || PAGE_IMAGES[page] || PAGE_IMAGES.default;
  const ctaLabel  = banner?.ctaLabel;
  const ctaHref   = banner?.ctaHref;

  if (!title) return null;

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "340px" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Laborax-style dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(274deg, rgba(1,9,10,0.25) 30%, rgba(1,9,10,0.72) 65%, rgba(1,9,10,0.97))",
              "linear-gradient(1deg, rgba(1,9,10,0.15) 40%, rgba(1,9,10,0.5) 75%, rgba(1,9,10,0.88))",
            ].join(", "),
          }}
        />
        {/* Aurora glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none animate-blob-1" style={{ background: "rgba(19,76,247,0.30)", filter: "blur(80px)" }} />
        <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] rounded-full pointer-events-none animate-blob-2" style={{ background: "rgba(0,198,255,0.16)", filter: "blur(70px)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
        <Reveal>
        {/* Laborax subtitle line */}
        <div
          className="inline-flex items-center gap-2 mb-5 text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: "#134CF7" }}
        >
          <span className="inline-block w-6 h-[2px] rounded" style={{ background: "#134CF7" }} />
          Life Quest Clinical Lab
        </div>

        <h1
          className="font-bold leading-[1.07] tracking-tight mb-5 h-display"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="max-w-2xl text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            {subtitle}
          </p>
        )}

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span style={{ color: "#fff" }}>{title}</span>
        </nav>

        {ctaLabel && ctaHref && (
          <div className="mt-8">
            <Link href={ctaHref} className="lab-btn btn-pop" style={{ borderRadius: "10px" }}>
              <svg width="14" height="14" viewBox="0 0 19 19" fill="none" className="shrink-0">
                <line x1="1" y1="18" x2="17.8" y2="1.2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="1.2" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="18" y1="17.8" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              {ctaLabel}
            </Link>
          </div>
        )}
        </Reveal>
      </div>
    </section>
  );
}
