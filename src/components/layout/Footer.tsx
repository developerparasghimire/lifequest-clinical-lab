import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/lib/cms";

const linkGroups = [
  {
    heading: "Quick Links",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/services", label: "All Tests" },
      { href: "/appointments", label: "Book Appointment" },
      { href: "/blog", label: "Health Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Popular Tests",
    links: [
      { href: "/services", label: "Complete Blood Count" },
      { href: "/services", label: "Lipid Profile" },
      { href: "/services", label: "Thyroid Function Test" },
      { href: "/services", label: "HbA1c (Diabetes)" },
      { href: "/services", label: "Liver Function Test" },
      { href: "/services", label: "Vitamin D Test" },
    ],
  },
];

export default async function Footer() {
  const settings = await getSettings();

  const siteName  = settings["site.name"]      || "Life Quest Clinical Lab";
  const tagline   = settings["footer.tagline"] || "Trusted clinical diagnostics across Nepal — accurate results, every time.";
  const copyright = settings["footer.copyright"] || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;
  const email     = settings["contact.email"]  || "";
  const hours     = settings["contact.hours"]  || "";
  const fb        = settings["social.facebook"];
  const ig        = settings["social.instagram"];
  const tw        = settings["social.twitter"];
  const wa        = settings["contact.whatsapp"];

  return (
    <footer style={{ background: "#020517" }}>
      {/* Mobile-only: social icons */}
      <div className="md:hidden flex justify-center gap-3 py-8 px-4">
        {fb && (
          <a href={fb} aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded border transition-colors hover:bg-[#134CF7] hover:border-[#134CF7]" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
        )}
        {ig && (
          <a href={ig} aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded border transition-colors hover:bg-[#134CF7] hover:border-[#134CF7]" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
        )}
        {tw && (
          <a href={tw} aria-label="Twitter" className="flex h-11 w-11 items-center justify-center rounded border transition-colors hover:bg-[#134CF7] hover:border-[#134CF7]" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>𝕏</a>
        )}
        {wa && (
          <a href={`https://wa.me/${wa}`} aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded border transition-colors hover:bg-[#25D366] hover:border-[#25D366]" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        )}
      </div>

      {/* Main footer — hidden on mobile */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6" aria-label="Life Quest Clinical Lab — Home">
              <Image
                src="/logo.png"
                alt="Life Quest Clinical Lab"
                width={130}
                height={76}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "260px" }}>
              {tagline}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {fb && (
                <a href={fb} aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded border transition-colors hover:bg-[#134CF7] hover:border-[#134CF7]" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
              )}
              {ig && (
                <a href={ig} aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded border text-sm transition-colors hover:bg-[#134CF7] hover:border-[#134CF7]" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              )}
              {tw && (
                <a href={tw} aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded border text-sm transition-colors hover:bg-[#134CF7] hover:border-[#134CF7]" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>𝕏</a>
              )}
              {wa && (
                <a href={`https://wa.me/${wa}`} aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded border text-sm transition-colors hover:bg-[#25D366] hover:border-[#25D366]" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((g) => (
            <nav key={g.heading} aria-labelledby={`f-${g.heading}`}>
              <h2
                id={`f-${g.heading}`}
                className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
                style={{ color: "#fff" }}
              >
                {g.heading}
              </h2>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors hover:text-[#134CF7]"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] mb-5 text-white">
              Get in Touch
            </h2>
            <ul className="space-y-4">
              {email && (
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0" style={{ color: "#134CF7" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <a href={`mailto:${email}`} className="text-sm break-all hover:text-[#134CF7] transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {email}
                  </a>
                </li>
              )}
              <li className="flex gap-3 items-start">
                <span className="mt-0.5 shrink-0" style={{ color: "#134CF7" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                </span>
                <a href="tel:+97714002747" className="text-sm hover:text-[#134CF7] transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                  +977-1-4002747
                </a>
              </li>
              {hours && (
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0" style={{ color: "#134CF7" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{hours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
          <p>{copyright || `© ${new Date().getFullYear()} Life Quest Clinical Lab. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}
