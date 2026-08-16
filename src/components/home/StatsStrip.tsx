import { prisma } from "@/lib/prisma";

const DEFAULTS = [
  { value: "1,500+",  label: "Tests Daily" },
  { value: "50,000+", label: "Tests Monthly" },
  { value: "50+",     label: "Staff Members" },
  { value: "3",       label: "Labs Across Nepal" },
  { value: "500+",    label: "Patients Daily" },
];

export default async function StatsStrip() {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { startsWith: "home.stat" } },
  });

  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  const stats = DEFAULTS.map((d, i) => ({
    value: map[`home.stat${i + 1}.value`] ?? d.value,
    label: map[`home.stat${i + 1}.label`] ?? d.label,
  }));

  return (
    <section style={{ background: "#F0FDF9", borderTop: "1px solid #E2E6F0", borderBottom: "1px solid #E2E6F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center px-4 py-10"
              style={{ borderRight: i < stats.length - 1 ? "1px solid #E2E6F0" : "none" }}
            >
              <span className="text-3xl sm:text-4xl font-black leading-none mb-2" style={{ color: "#00B67A" }}>
                {s.value}
              </span>
              <span className="text-sm font-medium" style={{ color: "#5D6478" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
