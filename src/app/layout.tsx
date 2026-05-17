import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lifequestclinicallab.com.np";
const SITE_NAME = "Life Quest Clinical Lab";
const SITE_DESCRIPTION =
  "Life Quest Clinical Lab is a trusted medical laboratory in Nepal offering 529+ diagnostic tests across biochemistry, hematology, hormones, immunology, microbiology, molecular diagnostics and histopathology. Three branches in Kathmandu, Birtamod and Gaighat with home sample collection and same-day reporting.";
const OG_IMAGE = "/logo.png";

export const viewport: Viewport = {
  themeColor: "#134CF7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Trusted Medical Diagnostics in Nepal`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "Life Quest Clinical Lab",
    "lifequestclinicallab",
    "medical laboratory Nepal",
    "pathology lab Kathmandu",
    "blood test Kathmandu",
    "diagnostic lab Nepal",
    "lab test Birtamod",
    "lab test Gaighat",
    "home sample collection Nepal",
    "Maharajgunj lab",
    "Panipokhari lab",
    "pathology Nepal",
    "hematology test Kathmandu",
    "biochemistry test Kathmandu",
    "hormone test Nepal",
    "thyroid test Kathmandu",
    "CBC test Nepal",
    "NPHL accredited lab",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Medical",
  classification: "Medical Laboratory",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    languages: { "en-NP": "/", en: "/" },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Trusted Medical Diagnostics in Nepal`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Trusted Medical Diagnostics in Nepal`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}#organization`,
  name: SITE_NAME,
  alternateName: "Life Quest Lab",
  legalName: "Life Quest Clinical Lab Pvt. Ltd.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  medicalSpecialty: ["Pathology", "ClinicalLaboratoryScience", "Diagnostic"],
  priceRange: "$$",
  telephone: "+977-1-4002747",
  email: "lifequestclinicallab@gmail.com",
  areaServed: { "@type": "Country", name: "Nepal" },
  sameAs: ["https://www.facebook.com/lifequestclinicallab"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Maharajgunj-03, Panipokhari",
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati",
    postalCode: "44600",
    addressCountry: "NP",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "16:00",
    },
  ],
  department: [
    {
      "@type": "MedicalBusiness",
      name: "Life Quest Clinical Lab — Kathmandu HQ",
      telephone: "+977-1-4002747",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Maharajgunj-03, Panipokhari",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
    },
    {
      "@type": "MedicalBusiness",
      name: "Life Quest Clinical Lab — Birtamod Branch",
      telephone: "+977-23-591222",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shree Krishna Complex, Birtamod",
        addressLocality: "Jhapa",
        addressCountry: "NP",
      },
    },
    {
      "@type": "MedicalBusiness",
      name: "Life Quest Clinical Lab — Gaighat Branch",
      telephone: "+977-9704583951",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Triyuga-11, Himali Tole, Gaighat",
        addressLocality: "Udayapur",
        addressCountry: "NP",
      },
    },
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/services?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
