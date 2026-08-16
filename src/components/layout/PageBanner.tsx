import Link from "next/link";
import { getBanner } from "@/lib/cms";
import Reveal from "@/components/ui/Reveal";

interface PageBannerProps {
  page: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackImage?: string;
}

export default async function PageBanner({
  page,
  fallbackTitle,
  fallbackSubtitle,
}: PageBannerProps) {
  const banner = await getBanner(page);

  const title    = banner?.title    || fallbackTitle;
  const subtitle = banner?.subtitle || fallbackSubtitle;
  const ctaLabel = banner?.ctaLabel;
  const ctaHref  = banner?.ctaHref;

  if (!title) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "380px",
        background: "linear-gradient(135deg, #040B2F 0%, #071a3e 55%, #0a2060 100%)",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft blue glow blob top-right */}
      <div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "rgba(0,182,122,0.25)", filter: "blur(80px)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
        <Reveal>
          <h1
            className="font-bold leading-[1.07] tracking-tight mb-5 h-display"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff" }}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.80)" }}>
              {subtitle}
            </p>
          )}

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "#fff" }}>{title}</span>
          </nav>

          {ctaLabel && ctaHref && (
            <div className="mt-8">
              <Link href={ctaHref} className="lab-btn btn-pop">
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
