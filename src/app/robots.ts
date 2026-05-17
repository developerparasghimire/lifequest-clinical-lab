import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://lifequestclinicallab.com.np";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/questlife-admin/", "/api/"],
      },
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
