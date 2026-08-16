import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const branches = [
  {
    name: "Kathmandu — HQ",
    address: "Maharajgunj-03, Panipokhari, Kathmandu",
    phone: "+977-1-4002747",
    mobile: "+977-9802302472",
    email: "lifequestclinicallab@gmail.com",
    hours: "Sun–Fri: 7 AM – 7 PM | Sat: 8 AM – 4 PM",
    mapUrl: "https://maps.google.com/?q=Panipokhari+Kathmandu",
    badge: "Main Branch",
  },
  {
    name: "Birtamod Branch",
    address: "Shree Krishna Complex, Birtamod-5, Jhapa",
    phone: "+977-23-591222",
    mobile: "+977-9802313383",
    email: "lifequestbtm@gmail.com",
    hours: "Sun–Fri: 7 AM – 7 PM | Sat: 8 AM – 4 PM",
    mapUrl: "https://maps.google.com/?q=Birtamod+Jhapa+Nepal",
    badge: "Branch",
  },
  {
    name: "Gaighat Branch",
    address: "Triyuga Municipality-10, Gaighat, Udayapur",
    phone: "+977-35-590621",
    mobile: "+977-9704583951",
    email: "lifequestgaighat@gmail.com",
    hours: "Sun–Fri: 7 AM – 7 PM | Sat: 8 AM – 4 PM",
    mapUrl: "https://maps.google.com/?q=Gaighat+Udayapur+Nepal",
    badge: "Branch",
  },
];

export default function BranchesSection() {
  return (
    <section className="py-20 overflow-hidden" style={{ background: "#F0FDF9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>Branches</p>
          <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
            We Are Right Next to You
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">
          <Reveal direction="right">
            <div className="rounded-2xl p-8" style={{ background: "#ffffff", border: "1px solid #E2E6F0" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#00B67A" }}>Our Locations</p>
              <h3 className="text-2xl font-bold mb-4 h-display" style={{ color: "#040B2F" }}>
                3 Branches Across Nepal
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#5D6478" }}>
                Life Quest Clinical Lab is present across Nepal — in Kathmandu, Jhapa and Udayapur — with modern laboratories and collection centers serving patients every day.
              </p>
              <div className="space-y-4">
                {[
                  { city: "Kathmandu", detail: "Maharajgunj-03, Panipokhari", tag: "Main Branch" },
                  { city: "Birtamod", detail: "Shree Krishna Complex, Birtamod-5, Jhapa", tag: "Branch" },
                  { city: "Gaighat", detail: "Triyuga Municipality-10, Udayapur", tag: "Branch" },
                ].map((loc) => (
                  <div key={loc.city} className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid #F0F4F8" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "#DCFCE7" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold" style={{ color: "#040B2F" }}>{loc.city}</span>
                      <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ background: "#DCFCE7", color: "#00B67A", fontWeight: 600 }}>{loc.tag}</span>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "#9AA4B2" }}>{loc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="space-y-4">
              {branches.map((b, i) => (
                <div
                  key={b.name}
                  className="bg-white rounded-2xl p-6"
                  style={{ border: "1px solid #E2E6F0" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-base font-bold" style={{ color: "#040B2F" }}>{b.name}</h3>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full shrink-0 ml-3"
                      style={{
                        background: i === 0 ? "#00B67A" : "#DCFCE7",
                        color: i === 0 ? "#fff" : "#00B67A",
                      }}
                    >
                      {b.badge}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-sm" style={{ color: "#5D6478" }}>
                    <div className="flex items-start gap-2.5">
                      <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {b.address}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                      <span>
                        <a href={`tel:${b.phone.replace(/[^+\d]/g, "")}`} className="hover:text-[#00B67A]">{b.phone}</a>
                        {b.mobile && <><span className="mx-1">·</span><a href={`tel:${b.mobile.replace(/[^+\d]/g, "")}`} className="hover:text-[#00B67A]">{b.mobile}</a></>}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                      <a href={`mailto:${b.email}`} className="hover:text-[#00B67A] truncate">{b.email}</a>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                      </svg>
                      {b.hours}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: "1px solid #F0F0F0" }}>
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lab-btn-outline flex-1 justify-center text-sm"
                      style={{ padding: "9px 16px", fontSize: "13px" }}
                    >
                      View on Map
                    </a>
                    <Link
                      href="/appointments"
                      className="lab-btn flex-1 justify-center text-sm"
                      style={{ padding: "9px 16px", fontSize: "13px" }}
                    >
                      Book Test
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
