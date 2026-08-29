import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * Renders nothing until NEXT_PUBLIC_GA_MEASUREMENT_ID is set, so local
 * development and preview deploys stay out of the production stats.
 *
 * To switch it on:
 *   1. analytics.google.com -> Admin -> Create property (or pick the
 *      existing one for lifequestclinicallab.com.np)
 *   2. Data streams -> Web -> add https://lifequestclinicallab.com.np
 *   3. Copy the Measurement ID (looks like G-XXXXXXXXXX)
 *   4. Vercel -> Project -> Settings -> Environment Variables:
 *      NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
 *   5. Redeploy
 *
 * Written against gtag.js directly rather than pulling in
 * @next/third-parties, to avoid adding a dependency for ~15 lines.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;

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
