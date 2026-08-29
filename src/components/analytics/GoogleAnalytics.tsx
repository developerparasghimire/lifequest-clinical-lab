import Script from "next/script";

/**
 * Google Analytics 4 for lifequestclinicallab.com.np.
 *
 * A GA Measurement ID is not a secret — it ships in the page source of every
 * site that uses GA — so the live property ID is the built-in default here.
 * That means analytics work on deploy with no Vercel configuration needed.
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID to point a given environment somewhere
 * else (a staging property, say).
 *
 * Only runs in production builds, so `npm run dev` never counts your own
 * work as site traffic.
 *
 * Written against gtag.js directly rather than pulling in
 * @next/third-parties, to avoid adding a dependency for ~15 lines.
 */
/**
 * Live GA4 data stream:
 *   Stream name    lifequestclinicallab
 *   Stream URL     https://lifequestclinicallab.com.np
 *   Stream ID      15523845968      (Measurement Protocol only — not used by gtag.js)
 *   Measurement ID G-PEY9BFZLNX     (this is the one the page needs)
 */
const DEFAULT_GA_ID = "G-PEY9BFZLNX";

export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_ID;
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
