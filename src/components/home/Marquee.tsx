import { prisma } from "@/lib/prisma";

export default async function Marquee() {
  const packages = await prisma.package.findMany({
    where: { active: true },
    select: { title: true },
    orderBy: { order: "asc" },
    take: 20,
  });

  const items = packages.length > 0
    ? packages.map((p) => p.title)
    : [
        "General Health Check Up",
        "Diabetes Care Package",
        "Thyroid Profile",
        "Full Body Checkup",
        "Women's Health Panel",
        "Cardiac Risk Profile",
        "Vitamin D & B12",
        "Liver Function Test",
      ];

  const doubled = [...items, ...items, ...items];

  return (
    <div
      className="marquee-wrapper overflow-hidden py-5 border-y relative"
      style={{ background: "#fff", borderColor: "#E2E6F0" }}
    >
      <div
        className="flex gap-0 whitespace-nowrap animate-marquee"
        style={{ width: "max-content" }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 text-sm font-medium px-6"
            style={{ color: "#5D6478" }}
          >
            {name}
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0"
              style={{ background: "#00B67A" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

