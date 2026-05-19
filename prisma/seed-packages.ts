import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding packages...");

  await prisma.package.createMany({
    data: [
      {
        title: "Full Body Checkup",
        description:
          "Comprehensive health screening covering all major organ systems. Ideal for annual preventive health check.",
        price: 3500,
        oldPrice: 5500,
        icon: "🏥",
        tests: [
          "Complete Blood Count (CBC)",
          "Fasting Blood Sugar",
          "HbA1c",
          "Lipid Profile",
          "Liver Function Test (LFT)",
          "Kidney Function Test (KFT)",
          "Thyroid Profile (TSH, FT3, FT4)",
          "Urine Complete Examination",
          "Serum Electrolytes (Na/K/Cl)",
          "Vitamin D3",
          "Vitamin B12",
          "Iron Studies (Serum Iron, TIBC, Ferritin)",
          "ESR",
          "CRP Quantitative",
        ].join("\n"),
        featured: true,
        active: true,
        order: 1,
      },
      {
        title: "Diabetes Care Package",
        description:
          "Targeted tests to monitor and manage diabetes effectively. Recommended every 3–6 months for diabetics.",
        price: 1800,
        oldPrice: 2800,
        icon: "🩸",
        tests: [
          "Fasting Blood Sugar",
          "Post-Prandial Blood Sugar (PPBS)",
          "HbA1c",
          "Kidney Function Test (KFT)",
          "Urine Microalbumin",
          "Lipid Profile",
          "Liver Function Test (LFT)",
          "Complete Blood Count (CBC)",
        ].join("\n"),
        featured: true,
        active: true,
        order: 2,
      },
      {
        title: "Thyroid & Hormones Panel",
        description:
          "In-depth hormone evaluation for thyroid disorders, PCOS, fertility concerns, and adrenal health.",
        price: 2200,
        oldPrice: 3500,
        icon: "⚕️",
        tests: [
          "TSH",
          "Free T3 (FT3)",
          "Free T4 (FT4)",
          "Anti TPO",
          "Anti Thyroglobulin",
          "FSH",
          "LH",
          "Prolactin",
          "Testosterone",
          "DHEA Sulfate (DHEAS)",
        ].join("\n"),
        featured: true,
        active: true,
        order: 3,
      },
      {
        title: "Cardiac Risk Package",
        description:
          "Assess your heart health with a focused panel of cardiac markers and lipid tests.",
        price: 2000,
        oldPrice: 3000,
        icon: "❤️",
        tests: [
          "Lipid Profile",
          "Apolipoprotein A1",
          "Apolipoprotein B",
          "Homocysteine",
          "hs-CRP",
          "Troponin I",
          "CPK NAC",
          "CPK MB",
          "NT-Pro BNP",
          "ECG (Referral)",
        ].join("\n"),
        featured: false,
        active: true,
        order: 4,
      },
      {
        title: "Women's Wellness Package",
        description:
          "Designed for women's preventive care — covering hormones, bone health, vitamin status and more.",
        price: 2800,
        oldPrice: 4500,
        icon: "👩‍⚕️",
        tests: [
          "Complete Blood Count (CBC)",
          "Thyroid Profile (TSH, FT3, FT4)",
          "FSH",
          "LH",
          "Estradiol",
          "Prolactin",
          "AMH (Anti-Müllerian Hormone)",
          "Calcium",
          "Vitamin D3",
          "Vitamin B12",
          "Ferritin",
          "Pap Smear",
        ].join("\n"),
        featured: false,
        active: true,
        order: 5,
      },
      {
        title: "Liver & Kidney Panel",
        description:
          "Essential tests to evaluate the health of your liver and kidneys — key organs for detoxification.",
        price: 1200,
        oldPrice: 1900,
        icon: "🧪",
        tests: [
          "Liver Function Test (LFT)",
          "Kidney Function Test (KFT)",
          "Uric Acid",
          "Blood Urea Nitrogen (BUN)",
          "Creatinine",
          "eGFR",
          "Bilirubin (Total & Direct)",
          "ALP",
          "ALT (SGPT)",
          "AST (SGOT)",
          "GGT",
          "Total Protein",
          "Albumin",
        ].join("\n"),
        featured: false,
        active: true,
        order: 6,
      },
      {
        title: "Pre-Marital Screening",
        description:
          "Recommended for couples before marriage — screens for hereditary and infectious conditions.",
        price: 3000,
        oldPrice: 4800,
        icon: "💑",
        tests: [
          "Complete Blood Count (CBC)",
          "Blood Grouping & Rh Factor",
          "HBsAg (Hepatitis B Surface Antigen)",
          "HCV Antibody",
          "HIV I & II",
          "VDRL (Syphilis)",
          "TPHA",
          "Thalassemia Screening",
          "G6PD",
          "Rubella IgG (Female)",
          "Fasting Blood Sugar",
          "Thyroid (TSH)",
        ].join("\n"),
        featured: false,
        active: true,
        order: 7,
      },
      {
        title: "Vitamin & Nutrition Panel",
        description:
          "Check for common nutritional deficiencies that affect energy, immunity and bone health.",
        price: 1500,
        oldPrice: 2400,
        icon: "🌿",
        tests: [
          "Vitamin D3 (25-OH)",
          "Vitamin B12",
          "Folic Acid",
          "Ferritin",
          "Serum Iron",
          "TIBC",
          "Zinc",
          "Magnesium",
          "Calcium",
          "Complete Blood Count (CBC)",
        ].join("\n"),
        featured: false,
        active: true,
        order: 8,
      },
    ],
    skipDuplicates: true,
  });

  const count = await prisma.package.count();
  console.log(`✅ Done — ${count} packages in database.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
