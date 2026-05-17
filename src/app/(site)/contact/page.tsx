import type { Metadata } from "next";
import PageBanner from "@/components/layout/PageBanner";
import ContactForm from "@/components/contact/ContactForm";
import { getSettings, getBranches } from "@/lib/cms";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import FAQ from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Life Quest Clinical Lab. Three branches across Nepal — Kathmandu, Birtamod and Gaighat. Call +977-1-4002747 or email lifequestclinicallab@gmail.com.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Life Quest Clinical Lab",
    description: "Three branches across Nepal — Kathmandu, Birtamod and Gaighat.",
    url: "/contact",
    type: "website",
  },
};

const InfoIcon = ({ type }: { type: "email" | "phone" | "clock" | "pin" }) => {
  if (type === "email") return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
  if (type === "phone") return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  );
  if (type === "clock") return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
};

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);

export default async function ContactPage() {
  const [settings, branches] = await Promise.all([getSettings(), getBranches()]);

  const phone   = settings["contact.phone"]   || "";
  const mobile  = settings["contact.mobile"]  || "";
  const email   = settings["contact.email"]   || "";
  const hours   = settings["contact.hours"]   || "";
  const address = settings["contact.address"] || "";

  const infoCards: { iconType: "email" | "phone" | "clock" | "pin"; label: string; value: string; href: string | null }[] = [
    { iconType: "email" as const, label: "Email",      value: email,   href: email ? `mailto:${email}` : null },
    { iconType: "phone" as const, label: "Phone",      value: [phone, mobile].filter(Boolean).join(" / "), href: phone ? `tel:${phone}` : null },
    { iconType: "clock" as const, label: "Hours",      value: hours,   href: null },
    { iconType: "pin"   as const, label: "HQ Address", value: address, href: null },
  ].filter((c) => c.value);

  return (
    <>
      <PageBanner
        page="contact"
        fallbackTitle="We Are Here to Help You"
        fallbackSubtitle="Reach us by phone, email, or visit any of our branches across Nepal."
      />

      {/* Info cards */}
      {infoCards.length > 0 && (
        <section className="py-16" style={{ background: "#fff" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal stagger staggerGap={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {infoCards.map((c) => (
                <RevealItem key={c.label}>
                <div
                  className="p-7 border card-premium group text-center h-full"
                  style={{ background: "#fff", borderColor: "#DCDCDC", borderRadius: "16px" }}
                >
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "#134CF7" }}
                  >
                    <InfoIcon type={c.iconType} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#134CF7" }}>{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="font-semibold text-sm break-all transition-colors hover:text-[#134CF7]" style={{ color: "#040B2F" }}>{c.value}</a>
                  ) : (
                    <p className="font-semibold text-sm" style={{ color: "#444444" }}>{c.value}</p>
                  )}
                </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Branches */}
      {branches.length > 0 && (
        <section className="py-16 mesh-light" style={{ background: "#F6F6F6" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <div className="lab-subtitle justify-center mb-4">Our Branches</div>
              <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
                Find Us <span className="text-gradient">Near You</span>
              </h2>
            </Reveal>
            <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {branches.map((b) => (
                <RevealItem key={b.id}>
                <div
                  className="overflow-hidden card-premium h-full flex flex-col"
                  style={{ background: "#fff", borderRadius: "16px", border: "1px solid #DCDCDC" }}
                >
                  {/* Map embed */}
                  <div className="relative overflow-hidden" style={{ height: "160px" }}>
                    <iframe
                      title={b.name}
                      src={b.mapEmbed ?? `https://maps.google.com/maps?q=${encodeURIComponent(b.address + ", Nepal")}&output=embed&z=15`}
                      width="100%"
                      height="160"
                      style={{ border: 0, display: "block" }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* Blue gradient overlay at bottom for readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(255,255,255,0.6), transparent)" }} />
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    {/* Branch name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#134CF7" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <h3 className="text-base font-bold h-display" style={{ color: "#040B2F" }}>{b.name}</h3>
                    </div>

                    {/* Address */}
                    <p className="text-sm leading-relaxed mb-4 pl-0.5" style={{ color: "#444" }}>{b.address}</p>

                    {/* Divider */}
                    <div className="mb-4" style={{ height: "1px", background: "#F0F0F0" }} />

                    {/* Phone(s) */}
                    {b.phone && (
                      <div className="flex flex-col gap-1.5 mb-3">
                        {b.phone.split(/[\/·]/).map((p) => p.trim()).filter(Boolean).map((p) => (
                          <a key={p} href={`tel:${p}`} className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: "#134CF7" }}>
                            <span className="inline-flex w-6 h-6 rounded items-center justify-center flex-none" style={{ background: "#EEF3FF" }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#134CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                            </span>
                            {p}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Email */}
                    {b.email && (
                      <a href={`mailto:${b.email}`} className="inline-flex items-center gap-2 text-sm mb-3 transition-colors hover:opacity-80" style={{ color: "#444" }}>
                        <span className="inline-flex w-6 h-6 rounded items-center justify-center flex-none" style={{ background: "#F6F6F6" }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </span>
                        {b.email}
                      </a>
                    )}

                    {/* Hours */}
                    {b.hours && (
                      <div className="inline-flex items-start gap-2 text-xs rounded-lg px-3 py-2 mb-4" style={{ background: "#F6F6F6", color: "#555" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span className="leading-relaxed">{b.hours}</span>
                      </div>
                    )}

                    {b.mapUrl && (
                      <a
                        href={b.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="lab-btn btn-pop mt-auto inline-flex items-center gap-2 self-start"
                        style={{ fontSize: "13px", padding: "9px 18px", borderRadius: "8px" }}
                      >
                        <MapIcon /> View on Map
                      </a>
                    )}
                  </div>
                </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* HQ Google Map */}
      {(() => {
        const defaultEmbed =
          "https://www.google.com/maps?q=Life+Quest+Clinical+Lab,+Maharajgunj+Sadak,+Kathmandu+44600&z=16&output=embed";
        const defaultLink =
          "https://www.google.com/maps/place/LIFE+QUEST+CLINICAL+LAB/@27.7301282,85.325603,16z";
        const mapEmbed = settings["contact.mapEmbed"] || defaultEmbed;
        const mapLink = settings["contact.mapLink"] || defaultLink;
        return (
          <section className="py-16" style={{ background: "#fff" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal className="text-center mb-10">
                <div className="lab-subtitle justify-center mb-4">Find Us on the Map</div>
                <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
                  Visit Our <span className="text-gradient">Headquarters</span>
                </h2>
                {address && (
                  <p className="text-sm mt-3" style={{ color: "#444" }}>{address}</p>
                )}
              </Reveal>
              <Reveal>
                <div
                  className="overflow-hidden card-premium"
                  style={{ borderRadius: "16px", border: "1px solid #DCDCDC" }}
                >
                  <iframe
                    title="Life Quest Clinical Lab — Kathmandu HQ"
                    src={mapEmbed}
                    width="100%"
                    height="450"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="text-center mt-6">
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="lab-btn btn-pop inline-flex items-center gap-2"
                    style={{ borderRadius: "10px" }}
                  >
                    <MapIcon /> Open in Google Maps
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* Contact form */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <div className="lab-subtitle justify-center mb-4">Send a Message</div>
            <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
              Drop Us a <span className="text-gradient">Line</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <FAQ />
    </>
  );
}
