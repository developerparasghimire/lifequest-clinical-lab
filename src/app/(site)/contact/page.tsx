import type { Metadata } from "next";
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
  const address = settings["contact.address"] || "";

  return (
    <>
      {/* NPL-style hero with contact info + form */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #040B2F 0%, #071a3e 55%, #0a2060 100%)" }}>
        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Glow blobs */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(0,182,122,0.18)", filter: "blur(80px)" }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(10,53,200,0.15)", filter: "blur(80px)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <h1 className="font-bold leading-tight mb-4 h-display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff" }}>
                We&apos;re Here to{" "}<span style={{ color: "#00B67A" }}>Help</span>
              </h1>
              <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.78)" }}>
                Contact us today for expert support and guidance on your pathology needs!
              </p>
              <div className="space-y-5">
                {address && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#00B67A" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#00B67A" }}>Address</p>
                      <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.90)" }}>{address}</p>
                    </div>
                  </div>
                )}
                {(phone || mobile) && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#00B67A" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#00B67A" }}>Phone</p>
                      <a href={`tel:${phone || mobile}`} className="text-sm font-medium hover:underline" style={{ color: "rgba(255,255,255,0.90)" }}>{[phone, mobile].filter(Boolean).join(", ")}</a>
                    </div>
                  </div>
                )}
                {email && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#00B67A" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#00B67A" }}>Email</p>
                      <a href={`mailto:${email}`} className="text-sm font-medium hover:underline" style={{ color: "rgba(255,255,255,0.90)" }}>{email}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8" style={{ border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
              <h2 className="text-xl font-bold mb-6" style={{ color: "#040B2F" }}>Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      {branches.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
                Our <span style={{ color: "#00B67A" }}>Branches</span>
              </h2>
            </Reveal>
            <Reveal stagger staggerGap={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {branches.map((b) => (
                <RevealItem key={b.id}>
                <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col" style={{ border: "1px solid #E2E6F0" }}>
                  <div className="relative overflow-hidden" style={{ height: "150px" }}>
                    <iframe
                      title={b.name}
                      src={b.mapEmbed ?? `https://maps.google.com/maps?q=${encodeURIComponent(b.address + ", Nepal")}&output=embed&z=15`}
                      width="100%" height="150"
                      style={{ border: 0, display: "block" }}
                      loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold mb-2" style={{ color: "#040B2F" }}>{b.name}</h3>
                    <p className="text-sm mb-3" style={{ color: "#5D6478" }}>{b.address}</p>
                    {b.phone && (
                      <a href={`tel:${b.phone.split(/[\/·]/)[0].trim()}`} className="text-sm font-semibold mb-3" style={{ color: "#00B67A" }}>{b.phone}</a>
                    )}
                    {b.mapUrl && (
                      <a href={b.mapUrl} target="_blank" rel="noreferrer" className="lab-btn mt-auto self-start inline-flex items-center gap-2" style={{ fontSize: "12px", padding: "8px 16px" }}>
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

      <FAQ />
    </>
  );
}
