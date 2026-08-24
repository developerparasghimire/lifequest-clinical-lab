import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Official Nepal outline, derived from geoBoundaries ADM0 open data
 * (469 points, Douglas-Peucker simplified at ~1.3 km tolerance).
 *
 * Equirectangular projection with a longitude correction so the country
 * is not horizontally stretched:
 *   x = (lon - 80.0601) * cos(28.41°) * 111.684
 *   y = (30.4731 - lat) * 111.684
 *
 * Pin coordinates below use the exact same projection, so every marker
 * lands on its true geographic position inside the outline.
 */
const NEPAL_PATH = `
  M 53.8 0.0 L 50.0 0.6 L 45.9 5.3 L 47.2 6.5 L 54.4 3.1 L 59.7 14.3 L 68.6 18.7 L 69.1 21.7
  L 79.8 34.8 L 80.5 38.4 L 73.4 42.8 L 69.0 47.3 L 67.7 52.1 L 60.9 57.4 L 52.7 58.1 L 48.6 69.5
  L 42.7 75.7 L 37.0 74.5 L 30.2 81.0 L 32.0 89.2 L 35.5 93.1 L 34.3 98.0 L 31.5 101.8
  L 27.9 102.8 L 28.6 106.6 L 22.4 111.3 L 24.0 113.9 L 18.1 115.0 L 18.0 118.6 L 21.2 120.6
  L 21.8 125.9 L 25.4 129.4 L 23.5 141.6 L 22.5 142.7 L 18.6 139.8 L 17.9 141.9 L 20.9 148.7
  L 17.2 151.3 L 12.3 149.2 L 8.4 153.0 L 7.6 163.7 L 5.8 166.6 L 4.1 166.0 L 0.0 173.9
  L 1.6 184.1 L 5.9 183.6 L 15.5 191.8 L 19.0 191.6 L 19.4 194.8 L 25.4 198.1 L 26.3 201.8
  L 30.7 205.9 L 38.6 206.0 L 40.3 211.1 L 45.6 214.5 L 44.0 201.3 L 47.3 199.1 L 52.3 200.3
  L 52.2 203.9 L 59.8 204.5 L 62.1 210.6 L 64.5 212.8 L 69.7 213.0 L 71.8 217.6 L 79.3 221.5
  L 80.3 219.3 L 83.5 220.6 L 84.2 225.1 L 90.5 225.4 L 89.0 226.6 L 90.4 227.7 L 94.2 225.8
  L 95.7 231.7 L 95.9 230.0 L 100.9 233.4 L 113.2 235.9 L 115.5 240.0 L 115.4 243.9 L 124.0 254.2
  L 124.1 257.4 L 122.1 257.7 L 124.7 259.7 L 123.7 261.3 L 129.0 260.3 L 129.3 256.5
  L 136.2 258.1 L 140.1 263.0 L 139.5 267.0 L 153.8 276.1 L 161.1 277.5 L 179.5 292.2
  L 183.5 291.9 L 187.6 284.2 L 197.7 284.9 L 202.9 291.3 L 211.2 293.7 L 234.8 312.1
  L 260.3 307.3 L 260.7 313.6 L 265.0 322.3 L 263.0 331.8 L 282.1 331.9 L 284.5 335.6
  L 292.3 337.8 L 307.4 337.2 L 315.7 345.1 L 315.1 347.1 L 317.9 350.7 L 322.6 350.5
  L 327.1 345.9 L 329.2 341.8 L 326.7 339.2 L 328.5 336.8 L 327.2 334.3 L 349.4 335.5
  L 373.7 349.2 L 378.0 345.1 L 374.7 344.1 L 374.4 339.9 L 380.5 337.7 L 389.9 339.5
  L 396.6 333.2 L 396.8 330.1 L 401.6 330.0 L 401.9 333.6 L 407.4 335.5 L 407.7 338.5
  L 412.2 337.4 L 415.9 344.9 L 448.4 350.4 L 455.1 363.9 L 453.5 377.1 L 450.7 379.5
  L 450.4 382.7 L 461.6 387.6 L 463.2 385.9 L 465.2 388.4 L 468.3 385.6 L 474.8 391.3
  L 481.8 392.3 L 483.3 394.6 L 482.3 397.3 L 491.4 400.5 L 487.6 404.1 L 504.1 402.4
  L 502.8 409.2 L 506.3 415.0 L 518.3 416.8 L 525.5 411.2 L 530.1 412.3 L 542.0 403.4
  L 543.0 405.0 L 547.8 402.2 L 557.6 410.7 L 557.6 427.0 L 565.8 432.3 L 569.1 431.6
  L 569.0 436.1 L 578.6 431.1 L 579.8 426.9 L 586.4 425.2 L 597.3 429.4 L 597.1 431.9
  L 602.6 431.0 L 605.1 433.9 L 608.5 430.7 L 616.5 430.5 L 632.6 439.0 L 636.9 439.5
  L 639.7 444.2 L 655.5 452.4 L 659.0 448.3 L 665.6 450.6 L 671.5 448.0 L 671.3 445.3
  L 675.1 444.9 L 675.3 441.9 L 683.5 440.2 L 686.3 434.0 L 689.0 434.2 L 691.0 449.3
  L 697.9 454.5 L 707.1 453.7 L 708.1 457.9 L 712.6 458.1 L 715.5 460.8 L 718.2 454.0
  L 727.8 450.4 L 735.8 452.9 L 741.4 457.1 L 746.0 455.7 L 748.5 451.0 L 754.0 454.1
  L 757.3 453.7 L 759.5 447.2 L 765.3 450.9 L 769.2 445.3 L 773.0 452.9 L 779.4 455.8
  L 781.0 459.3 L 789.5 450.7 L 789.9 439.6 L 796.0 428.5 L 798.5 417.1 L 797.4 403.6
  L 793.6 399.2 L 794.6 396.7 L 792.0 393.4 L 793.5 389.6 L 789.3 387.4 L 787.8 384.0
  L 783.9 383.8 L 782.3 378.1 L 779.0 374.6 L 782.1 368.8 L 783.3 356.0 L 786.8 350.4
  L 784.3 346.4 L 785.2 341.8 L 788.1 339.9 L 784.5 332.5 L 788.3 322.6 L 794.4 313.6
  L 795.6 305.7 L 799.6 299.6 L 797.2 296.3 L 800.0 294.4 L 799.4 292.5 L 793.5 289.4
  L 789.6 291.1 L 788.5 287.9 L 786.5 288.9 L 783.2 286.7 L 778.7 289.0 L 773.5 285.4
  L 767.0 286.2 L 766.2 282.0 L 763.7 281.5 L 763.0 285.1 L 759.0 287.5 L 758.5 291.2
  L 753.2 298.0 L 747.3 297.8 L 747.3 294.5 L 742.0 297.4 L 737.2 291.1 L 734.6 293.8
  L 730.1 293.4 L 726.2 296.1 L 721.6 294.8 L 724.4 293.8 L 723.1 291.6 L 717.1 295.5
  L 707.6 292.9 L 704.1 296.4 L 698.9 296.2 L 693.4 294.1 L 692.5 290.2 L 685.8 281.8
  L 675.5 280.5 L 674.6 277.6 L 668.9 273.4 L 661.3 274.1 L 657.7 272.0 L 658.9 267.9
  L 656.3 264.6 L 651.4 264.1 L 646.1 268.3 L 640.2 263.6 L 639.3 268.5 L 634.9 274.1
  L 634.4 281.0 L 629.8 282.2 L 627.2 286.8 L 624.1 286.7 L 621.2 283.2 L 617.9 283.2
  L 616.7 280.1 L 615.0 282.1 L 612.1 278.6 L 606.0 278.4 L 603.8 266.8 L 605.3 263.8
  L 602.1 256.8 L 596.5 265.0 L 591.9 266.1 L 593.0 269.3 L 591.5 274.0 L 595.9 284.3
  L 590.1 287.4 L 583.8 286.1 L 578.7 282.8 L 581.5 276.6 L 574.0 270.2 L 573.7 264.0
  L 571.0 262.4 L 568.8 255.7 L 561.7 252.9 L 559.0 249.6 L 555.4 233.1 L 552.7 233.5
  L 552.9 237.5 L 550.9 237.4 L 550.4 242.4 L 545.3 247.5 L 544.5 242.2 L 535.2 238.9
  L 526.3 239.7 L 522.6 245.1 L 518.9 242.3 L 512.3 244.1 L 505.4 238.2 L 503.3 240.0
  L 497.3 238.7 L 496.1 237.5 L 497.9 232.4 L 495.3 225.2 L 497.1 222.0 L 500.5 221.4
  L 501.8 216.8 L 503.8 216.6 L 502.5 209.5 L 504.9 206.9 L 504.0 204.6 L 500.9 204.4
  L 496.8 199.5 L 493.7 201.3 L 491.2 200.0 L 483.8 210.2 L 480.5 211.4 L 480.1 209.8
  L 475.7 210.0 L 471.4 212.5 L 455.5 205.1 L 456.5 201.3 L 452.9 199.9 L 448.8 194.0
  L 443.4 194.1 L 441.9 192.2 L 435.6 194.2 L 432.5 192.3 L 430.1 190.3 L 430.0 184.5
  L 426.6 183.5 L 427.4 180.9 L 420.9 178.7 L 419.0 179.9 L 413.3 175.9 L 409.4 176.4
  L 411.6 160.4 L 405.9 159.3 L 407.0 150.7 L 404.4 149.9 L 403.2 143.8 L 407.2 138.1
  L 398.7 137.3 L 399.1 133.3 L 396.6 131.9 L 391.4 130.9 L 389.8 132.6 L 386.2 131.4
  L 387.3 129.7 L 384.9 127.8 L 377.9 128.1 L 372.3 131.3 L 368.8 130.8 L 367.3 136.6
  L 358.9 137.2 L 353.4 141.7 L 354.1 144.1 L 351.9 146.6 L 345.8 144.6 L 345.2 141.9
  L 340.0 140.1 L 339.6 136.0 L 332.6 131.0 L 332.7 126.5 L 329.6 123.6 L 330.9 119.6
  L 325.5 116.7 L 322.6 112.5 L 323.1 109.5 L 315.3 107.9 L 314.1 102.3 L 316.7 102.3
  L 316.3 101.0 L 311.8 100.0 L 308.3 96.3 L 304.6 97.9 L 303.7 94.9 L 300.8 94.3 L 297.4 97.2
  L 289.8 89.4 L 284.6 90.5 L 282.6 85.7 L 271.9 87.5 L 271.1 84.0 L 265.7 82.9 L 264.6 79.0
  L 258.5 79.3 L 258.9 76.2 L 263.2 73.7 L 262.1 71.2 L 259.2 69.0 L 251.7 71.0 L 253.8 67.3
  L 249.9 65.2 L 244.7 56.9 L 242.8 56.1 L 239.8 58.9 L 229.6 50.2 L 226.4 51.7 L 223.6 47.6
  L 220.1 48.6 L 215.0 44.4 L 207.6 45.6 L 209.1 40.4 L 207.5 39.2 L 210.9 35.7 L 208.6 34.9
  L 208.9 31.5 L 204.4 30.6 L 200.5 26.4 L 203.3 19.1 L 199.2 12.7 L 196.2 15.7 L 192.3 14.4
  L 189.6 17.0 L 185.8 12.7 L 182.3 13.7 L 177.7 10.7 L 166.3 9.4 L 154.8 3.1 L 153.2 3.0
  L 152.1 6.8 L 147.6 5.0 L 146.7 11.5 L 132.6 5.8 L 131.9 8.6 L 134.7 10.0 L 131.3 11.7
  L 131.4 16.7 L 134.1 18.8 L 132.0 20.1 L 133.4 21.4 L 131.0 24.9 L 131.3 29.8 L 125.1 35.7
  L 117.9 35.9 L 121.0 40.3 L 120.9 44.5 L 115.8 49.3 L 116.6 51.6 L 111.6 50.3 L 108.5 51.7
  L 101.4 46.8 L 103.2 43.2 L 100.5 41.6 L 100.7 36.3 L 95.8 30.8 L 97.0 29.7 L 95.0 27.5
  L 95.6 25.0 L 91.5 22.6 L 86.2 23.2 L 83.0 19.1 L 73.1 16.2 L 66.4 7.7 L 53.8 0.0 Z`;

const locations = [
  {
    n: 1,
    city: "Kathmandu",
    address: "Maharajgunj-03, Panipokhari",
    district: "Kathmandu",
    tag: "Main Branch",
    phone: "+977-1-4002747",
    mapUrl: "https://maps.google.com/?q=Panipokhari+Kathmandu",
    x: 517.1,
    y: 307.8,
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
    x: 652.0,
    y: 410.5,
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
    x: 779.2,
    y: 427.7,
    anchor: "end" as const,
    dx: 20,
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
                viewBox="-16 -16 832 493"
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
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />

                {/* Country name watermark */}
                <text
                  x="250"
                  y="205"
                  textAnchor="middle"
                  style={{ fontSize: "46px", fontWeight: 800, letterSpacing: "0.06em" }}
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

                      {/* Label — halo drawn as its own element beneath the
                          solid text, so legibility does not depend on
                          paint-order support. */}
                      <text
                        x={loc.x + loc.dx}
                        y={loc.y - 48}
                        textAnchor={loc.anchor}
                        style={{ fontSize: "19px", fontWeight: 700 }}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {loc.city}
                      </text>
                      <text
                        x={loc.x + loc.dx}
                        y={loc.y - 48}
                        textAnchor={loc.anchor}
                        style={{ fontSize: "19px", fontWeight: 700 }}
                        fill="#040B2F"
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
