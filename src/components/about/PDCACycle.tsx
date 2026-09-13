/**
 * PDCA cycle, laid out like the company profile brochure: four overlapping
 * circles (Plan top, Do right, Check bottom, Act left) around a navy centre,
 * with arrows running clockwise.
 *
 * Geometry is drawn on a 720-unit square. Every size below is a percentage
 * of that square or a `cqw` unit of the diagram's own width, so the whole
 * thing scales as one piece. Below `md` the circles would make the text too
 * small to read, so phones get the same content as stacked cards instead.
 */

type Phase = {
  name: string;
  color: string;
  light: string;
  points: string[];
  /** Circle position, % of the diagram. */
  circle: { left: string; top: string };
  /** Text box: the largest rectangle inside the circle that clears the centre. */
  text: { left: string; top: string; width: string; height: string };
  /** Direction the arrow points, following the cycle clockwise. */
  arrow: "right" | "down" | "left" | "up";
  /** Where the arrow sits relative to the heading. */
  arrowAt: "after-points" | "before-heading" | "after-heading";
};

const PHASES: Phase[] = [
  {
    name: "Plan",
    color: "#1A7FA8",
    light: "#2B97C2",
    points: [
      "Strategy Development",
      "Quality indicators establishment",
      "Establishment of performance benchmark",
      "Align objectives with regulatory and accreditation benchmark",
    ],
    circle: { left: "27.778%", top: "0%" },
    text: { left: "35.28%", top: "5.56%", width: "29.44%", height: "26.67%" },
    arrow: "right",
    arrowAt: "after-points",
  },
  {
    name: "Do",
    color: "#E5344D",
    light: "#F24D63",
    points: [
      "Staff training and competency assessment",
      "Execution of internal quality control",
      "Execution of external quality assurance",
      "Implementation of pre-analytical, analytical and post-analytical quality checks",
    ],
    circle: { left: "55.556%", top: "27.778%" },
    text: { left: "67.78%", top: "35.28%", width: "26.67%", height: "29.44%" },
    arrow: "down",
    arrowAt: "before-heading",
  },
  {
    name: "Check",
    color: "#483C98",
    light: "#5C50B2",
    points: [
      "Review of proficiency testing score and quality control data",
      "Performance evaluation of quality indicators",
      "Benchmarking against global standard",
      "Data driven decision making",
    ],
    circle: { left: "27.778%", top: "55.556%" },
    text: { left: "35.28%", top: "67.78%", width: "29.44%", height: "26.67%" },
    arrow: "left",
    arrowAt: "after-heading",
  },
  {
    name: "Act",
    color: "#2DA64E",
    light: "#3EBD60",
    points: [
      "Implementation of Corrective & Preventive Actions",
      "Standardization of Successful Improvements",
      "Establishment of preventive measures",
    ],
    circle: { left: "0%", top: "27.778%" },
    text: { left: "5.56%", top: "35.28%", width: "26.67%", height: "29.44%" },
    arrow: "up",
    arrowAt: "after-heading",
  },
];

const ROTATION = { right: 0, down: 90, left: 180, up: 270 } as const;

function Arrow({ direction, size }: { direction: Phase["arrow"]; size: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: size, height: size, transform: `rotate(${ROTATION[direction]}deg)`, flexShrink: 0 }}
    >
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

export default function PDCACycle() {
  return (
    <>
      {/* ── Diagram (md and up) ── */}
      <div className="hidden md:block mx-auto w-full" style={{ maxWidth: 720 }}>
        <div
          className="relative w-full"
          style={{ aspectRatio: "1 / 1", containerType: "inline-size" }}
          role="img"
          aria-label="PDCA cycle: Plan, Do, Check and Act"
        >
          {/* Side circles first so Plan and Check overlap them, as in the brochure. */}
          {[PHASES[3], PHASES[1], PHASES[0], PHASES[2]].map((p, i) => (
            <div
              key={p.name}
              className="absolute rounded-full"
              style={{
                left: p.circle.left,
                top: p.circle.top,
                width: "44.444%",
                height: "44.444%",
                background: `linear-gradient(145deg, ${p.light} 0%, ${p.color} 70%)`,
                border: "0.97cqw solid #fff",
                boxShadow: "0 1.4cqw 3.6cqw rgba(4,11,47,0.16)",
                zIndex: i < 2 ? 1 : 2,
              }}
            />
          ))}

          {/* Centre */}
          <div
            className="absolute rounded-full flex flex-col items-center justify-center text-white font-black text-center"
            style={{
              left: "33.333%",
              top: "33.333%",
              width: "33.333%",
              height: "33.333%",
              background: "linear-gradient(145deg, #3A49A8 0%, #2B3A91 70%)",
              border: "1.25cqw solid #fff",
              boxShadow: "0 1.4cqw 4cqw rgba(4,11,47,0.28)",
              zIndex: 3,
              fontSize: "6.4cqw",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            <span>PDCA</span>
            <span>Cycle</span>
          </div>

          {/* Text layer sits above every circle */}
          {PHASES.map((p) => (
            <div
              key={`${p.name}-text`}
              className="absolute flex flex-col justify-center text-white"
              style={{ ...p.text, zIndex: 4 }}
            >
              <div
                className="flex items-center font-black uppercase"
                style={{
                  gap: "1.1cqw",
                  fontSize: "4.1cqw",
                  lineHeight: 1,
                  marginBottom: "1.2cqw",
                  justifyContent: p.name === "Plan" || p.name === "Check" ? "center" : "flex-start",
                }}
              >
                {p.arrowAt === "before-heading" && <Arrow direction={p.arrow} size="3.6cqw" />}
                <span>{p.name}</span>
                {p.arrowAt === "after-heading" && <Arrow direction={p.arrow} size="3.6cqw" />}
              </div>
              <ul style={{ fontSize: "1.72cqw", lineHeight: 1.3 }}>
                {p.points.map((pt) => (
                  <li key={pt} className="flex font-semibold" style={{ gap: "0.8cqw", marginTop: "0.35cqw" }}>
                    <span aria-hidden="true" style={{ opacity: 0.85 }}>•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              {p.arrowAt === "after-points" && (
                <div className="flex justify-end" style={{ marginTop: "0.8cqw" }}>
                  <Arrow direction={p.arrow} size="4cqw" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Stacked cards (phones) ── */}
      <div className="md:hidden space-y-4">
        {PHASES.map((p, i) => (
          <div key={`${p.name}-card`} className="rounded-2xl overflow-hidden bg-white" style={{ border: "1px solid #E2E6F0" }}>
            <div
              className="flex items-center justify-between px-5 py-3 text-white"
              style={{ background: `linear-gradient(135deg, ${p.light}, ${p.color})` }}
            >
              <span className="text-lg font-black uppercase tracking-wide">{p.name}</span>
              <span className="text-xs font-bold opacity-90">Step {i + 1} of 4</span>
            </div>
            <ul className="px-5 py-4 space-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "#40474F" }}>
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
