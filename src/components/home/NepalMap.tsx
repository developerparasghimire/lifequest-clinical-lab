import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Nepal outline traced on a linear lon/lat projection:
 *   x = (lon - 80.05) / 8.15  * 800
 *   y = (30.45 - lat) / 4.10  * 400
 * Pin coordinates below use the same projection, so they land on the
 * geographically correct spot inside the outline.
 */
const NEPAL_PATH = `
M 1 158 L 29 127 L 49 107 L 69 83 L 93 44 L 118 34 L 142 20 L 191 10
L 241 34 L 290 54 L 339 88 L 388 102 L 437 107 L 486 146 L 535 210
L 584 229 L 633 229 L 682 254 L 731 254 L 780 249 L 800 254 L 795 317
L 785 366 L 771 390 L 731 395 L 682 395 L 633 381 L 584 376 L 535 356
L 486 351 L 437 302 L 388 293 L 339 298 L 290 293 L 241 268 L 191 249
L 142 229 L 93 205 L 44 181 Z`;

const locations = [
  {
    n: 1,
    city: "Kathmandu",
    address: "Maharajgunj-03, Panipokhari",
    district: "Kathmandu",
    tag: "Main Branch",
    phone: "+977-1-4002747",
    mapUrl: "https://maps.google.com/?q=Panipokhari+Kathmandu",
    x: 518,
    y: 267,
    anchor: "middle" as const,
    dx: 0,
    main: true,
  },
  {
    n: 2,
    city: "Gaighat",
    address: "Triyuga Municipality-10",
    district: "Udayapur",
    tag: "Branch",
    phone: "+977-35-590621",
    mapUrl: "https://maps.google.com/?q=Gaighat+Udayapur+Nepal",
    x: 652,
    y: 357,
    anchor: "middle" as const,
    dx: 0,
    main: false,
  },
  {
    n: 3,
    city: "Birtamod",
    address: "Shree Krishna Complex, Birtamod-5",
    district: "Jhapa",
    tag: "Branch",
    phone: "+977-23-591222",
    mapUrl: "https://maps.google.com/?q=Birtamod+Jhapa+Nepal",
    x: 766,
    y: 362,
    anchor: "end" as const,
    dx: 22,
    main: false,
  },
];

export default function NepalMap() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00B67A" }}>
            Our Presence
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold h-display" style={{ color: "#040B2F" }}>
            Find Us Across Nepal
          </h2>
          <p className="text-base mt-3 max-w-2xl" style={{ color: "#5D6478" }}>
            Three fully equipped laboratories serving patients in Kathmandu, Udayapur and Jhapa —
            with the same quality standards at every location.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 items-center">
          {/* ── MAP ── */}
          <Reveal direction="right">
            <div
              className="rounded-3xl p-5 sm:p-8"
              style={{
                background: "linear-gradient(160deg, #F0FDF9 0%, #ffffff 60%)",
                border: "1px solid #E2E6F0",
              }}
            >
              <svg
                viewBox="-14 -14 828 428"
                className="w-full h-auto"
                role="img"
                aria-label="Map of Nepal showing Life Quest Clinical Lab branches in Kathmandu, Gaighat and Birtamod"
              >
                <defs>
                  <linearGradient id="nepalFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E6F7F1" />
                    <stop offset="100%" stopColor="#D3F0E5" />
                  </linearGradient>
                  <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#040B2F" floodOpacity="0.28" />
                  </filter>
                </defs>

                {/* Country outline */}
                <path
                  d={NEPAL_PATH}
                  fill="url(#nepalFill)"
                  stroke="#040B2F"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Country name watermark */}
                <text
                  x="260"
                  y="185"
                  textAnchor="middle"
                  style={{ fontSize: "44px", fontWeight: 800, letterSpacing: "0.06em" }}
                  fill="#040B2F"
                  opacity="0.13"
                >
                  NEPAL
                </text>

                {locations.map((loc) => {
                  const color = loc.main ? "#040B2F" : "#00B67A";
                  return (
                    <g key={loc.city}>
                      {/* Pulsing halo */}
                      <circle cx={loc.x} cy={loc.y} r="6" fill={color} opacity="0.35">
                        <animate
                          attributeName="r"
                          values="6;20;6"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.35;0;0.35"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Ground dot */}
                      <ellipse cx={loc.x} cy={loc.y} rx="5" ry="2.5" fill={color} opacity="0.5" />

                      {/* Pin — tip sits exactly on the coordinate */}
                      <path
                        d={`M ${loc.x} ${loc.y} c -8 -12 -13 -18 -13 -25 a 13 13 0 1 1 26 0 c 0 7 -5 13 -13 25 z`}
                        fill={color}
                        filter="url(#pinShadow)"
                      />
                      <circle cx={loc.x} cy={loc.y - 25} r="5.5" fill="#ffffff" />

                      {/* Label */}
                      <text
                        x={loc.x + loc.dx}
                        y={loc.y - 48}
                        textAnchor={loc.anchor}
                        style={{ fontSize: "19px", fontWeight: 700 }}
                        fill="#040B2F"
                        stroke="#ffffff"
                        strokeWidth="4"
                        paintOrder="stroke"
                      >
                        {loc.city}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 pt-5" style={{ borderTop: "1px solid #E2E6F0" }}>
                <span className="flex items-center gap-2 text-xs font-medium" style={{ color: "#5D6478" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: "#040B2F" }} />
                  Main Branch
                </span>
                <span className="flex items-center gap-2 text-xs font-medium" style={{ color: "#5D6478" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: "#00B67A" }} />
                  Branch Laboratory
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── LOCATION CARDS ── */}
          <Reveal direction="left" delay={0.1}>
            <div className="space-y-4">
              {locations.map((loc) => (
                <a
                  key={loc.city}
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl p-6 bg-white transition-all hover:shadow-lg"
                  style={{ border: "1px solid #E2E6F0" }}
                >
                  <div className="flex items-start gap-4">
                    {/* Number badge — matches the pin on the map */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-black"
                      style={{
                        background: loc.main ? "#040B2F" : "#00B67A",
                        color: "#ffffff",
                      }}
                    >
                      {loc.n}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-lg font-bold" style={{ color: "#040B2F" }}>
                          {loc.city}
                        </h3>
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            background: loc.main ? "#040B2F" : "#DCFCE7",
                            color: loc.main ? "#ffffff" : "#00B67A",
                          }}
                        >
                          {loc.tag}
                        </span>
                      </div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "#00B67A" }}>
                        Life Quest Clinical Lab
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "#5D6478" }}>
                        {loc.address}
                        <br />
                        {loc.district}
                      </p>
                      <p className="text-sm mt-2 font-medium" style={{ color: "#040B2F" }}>
                        {loc.phone}
                      </p>
                    </div>
                  </div>
                </a>
              ))}

              <Link
                href="/contact"
                className="lab-btn w-full justify-center"
                style={{ padding: "13px 24px", fontSize: "14px" }}
              >
                Get Directions &amp; Contact Details
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
