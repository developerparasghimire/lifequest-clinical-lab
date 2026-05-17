import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash("Admin@123", 12);
  await prisma.user.upsert({
    where: { email: "admin@medlab.com" },
    update: { password: hashedPassword },
    create: { email: "admin@medlab.com", password: hashedPassword, role: "admin" },
  });

  // Services
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      { title: "Complete Blood Count (CBC)", description: "A comprehensive blood test that evaluates the cellular components of blood including red cells, white cells, and platelets.", price: 25.0, icon: "🩸", featured: true, order: 1 },
      { title: "Lipid Profile", description: "Measures cholesterol levels including HDL, LDL, and triglycerides to assess cardiovascular risk.", price: 35.0, icon: "💊", featured: true, order: 2 },
      { title: "Liver Function Test (LFT)", description: "Evaluates liver health by measuring enzymes, proteins, and bilirubin levels in the blood.", price: 45.0, icon: "🧪", featured: true, order: 3 },
      { title: "Thyroid Profile (TSH/T3/T4)", description: "Assesses thyroid gland function by measuring TSH, T3, and T4 hormone levels.", price: 55.0, icon: "⚕️", featured: true, order: 4 },
      { title: "HbA1c (Diabetes)", description: "Measures average blood sugar levels over the past 3 months, essential for diabetes management.", price: 30.0, icon: "🔬", featured: true, order: 5 },
      { title: "Urine Complete Examination", description: "Comprehensive urine analysis to detect kidney disease, diabetes, and urinary tract infections.", price: 20.0, icon: "🧫", featured: false, order: 6 },
      { title: "COVID-19 PCR Test", description: "Highly accurate polymerase chain reaction test for detecting active COVID-19 infection.", price: 75.0, icon: "🦠", featured: false, order: 7 },
      { title: "Vitamin D3 Test", description: "Measures the level of vitamin D in your blood to detect deficiency or toxicity.", price: 40.0, icon: "☀️", featured: false, order: 8 },
    ],
  });

  // Blog posts
  await prisma.blog.deleteMany();
  await prisma.blog.createMany({
    data: [
      {
        title: "Understanding Your CBC Blood Test Results",
        slug: "understanding-cbc-blood-test-results",
        excerpt: "Learn what each component of your Complete Blood Count test means and what normal ranges look like.",
        content: "<h2>What is a CBC Test?</h2><p>A Complete Blood Count (CBC) is one of the most common blood tests ordered by doctors. It gives important information about the kinds and numbers of cells in the blood, especially red blood cells, white blood cells, and platelets.</p><h2>Components of CBC</h2><h3>Red Blood Cells (RBC)</h3><p>Red blood cells carry oxygen from your lungs to the rest of your body. Normal range for adults: Men 4.5–5.5 million/μL, Women 4.0–5.0 million/μL.</p><h3>White Blood Cells (WBC)</h3><p>White blood cells help fight infection. Normal range: 4,500–11,000 cells/μL.</p><h3>Hemoglobin</h3><p>Low hemoglobin indicates anemia. Normal: Men 13.5–17.5 g/dL, Women 12–15.5 g/dL.</p><h3>Platelets</h3><p>Platelets help with blood clotting. Normal range: 150,000–400,000/μL.</p>",
        metaTitle: "Understanding Your CBC Blood Test Results | MedLab Diagnostics",
        metaDescription: "Learn what each component of your Complete Blood Count (CBC) test means, what normal ranges are, and when you need this test.",
        published: true,
      },
      {
        title: "Top 5 Health Tests Everyone Should Get Annually",
        slug: "top-5-health-tests-everyone-should-get-annually",
        excerpt: "Preventive health testing is the cornerstone of a healthy life. Here are the 5 most important tests you should get every year.",
        content: "<h2>Why Annual Health Tests Matter</h2><p>Regular health screenings can catch diseases early when they are most treatable. Many serious conditions have no symptoms in early stages.</p><h2>1. Complete Blood Count (CBC)</h2><p>Checks your overall health and detects disorders including anemia, infection, and leukemia.</p><h2>2. Comprehensive Metabolic Panel</h2><p>Tests blood glucose, calcium, electrolytes, kidney and liver function.</p><h2>3. Lipid Panel</h2><p>Measures cholesterol and triglycerides to assess cardiovascular risk.</p><h2>4. HbA1c</h2><p>Reveals your average blood sugar over 3 months — essential for diabetes screening.</p><h2>5. TSH (Thyroid)</h2><p>Detects hypothyroidism and hyperthyroidism early.</p>",
        metaTitle: "5 Essential Annual Health Tests | MedLab Diagnostics",
        metaDescription: "Discover the 5 most important health tests you should get every year to catch diseases early and maintain optimal health.",
        published: true,
      },
      {
        title: "What Your Cholesterol Numbers Really Mean",
        slug: "what-your-cholesterol-numbers-really-mean",
        excerpt: "High cholesterol is one of the biggest risk factors for heart disease. But what do your numbers actually mean?",
        content: "<h2>Understanding Cholesterol</h2><p>Cholesterol is a waxy, fat-like substance found in all cells. Too much can build up in your arteries and increase risk of heart disease and stroke.</p><h2>LDL (Bad Cholesterol)</h2><p>Optimal: below 100 mg/dL. High LDL leads to plaque buildup in arteries.</p><h2>HDL (Good Cholesterol)</h2><p>Carries cholesterol away from arteries. Higher is better. Optimal: above 60 mg/dL.</p><h2>Triglycerides</h2><p>Normal: below 150 mg/dL. High triglycerides combined with high LDL significantly increase heart disease risk.</p>",
        metaTitle: "Understanding Cholesterol Test Results | MedLab Diagnostics",
        metaDescription: "Learn what LDL, HDL, and triglyceride numbers mean on your cholesterol test and how to interpret your results.",
        published: true,
      },
    ],
  });

  // Sample appointment
  await prisma.appointment.deleteMany();
  await prisma.appointment.create({
    data: {
      name: "John Doe",
      phone: "+1 555-0100",
      email: "john.doe@example.com",
      testType: "Complete Blood Count (CBC)",
      date: new Date("2026-05-10"),
      status: "confirmed",
      notes: "Patient prefers morning slot",
    },
  });

  // Sample contact message
  await prisma.contact.deleteMany();
  await prisma.contact.create({
    data: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 555-0199",
      message: "I would like to know more about the home sample collection service and pricing.",
      read: false,
    },
  });

  // Banners (one per page)
  await prisma.banner.deleteMany();
  await prisma.banner.createMany({
    data: [
      { page: "home",         title: "Trusted Diagnostics. Faster Results.", subtitle: "529+ accredited tests across 3 branches in Nepal.", image: "/belova59-laboratory-3827742_1920.jpg",        ctaLabel: "Book a Test", ctaHref: "/appointments" },
      { page: "about",        title: "About Life Quest Clinical Lab",        subtitle: "Quality comes first — accurate results, every time.",   image: "/testalize-me-ZdToNCVLpOg-unsplash.jpg",       ctaLabel: "Our Branches", ctaHref: "/contact" },
      { page: "services",     title: "All 529 Tests with Pricing",            subtitle: "Search the full catalogue and book in seconds.",        image: "/kropekk_pl-lab-313879_1920.jpg",    ctaLabel: "Browse Tests", ctaHref: "#tests" },
      { page: "blog",         title: "Health Insights & Lab News",            subtitle: "Articles from our medical specialists.",                image: "/stephen-dawson-qwtCeJ5cLYs-unsplash.jpg" },
      { page: "contact",      title: "Contact Life Quest",                     subtitle: "Three branches across Nepal. We are here to help.",   image: "/moritz-kindler-G66K_ERZRhM-unsplash.jpg",     ctaLabel: "Call Now", ctaHref: "tel:+97714002747" },
      { page: "appointments", title: "Book Your Test in Under 2 Minutes",      subtitle: "Same-day collection in Kathmandu, Birtamod, Gaighat.", image: "/ousa-chea-gKUC4TMhOiY-unsplash.jpg" },
    ],
  });

  // Testimonials
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      { name: "Anish Rai",     role: "Patient, Kathmandu", content: "Same day reports, friendly staff, and very transparent pricing. Highly recommended.",                                rating: 5, order: 1 },
      { name: "Kabita Magar",  role: "Patient, Birtamod",  content: "I got my thyroid panel done in the morning and the report was ready by evening. Truly impressed by the service.",   rating: 5, order: 2 },
      { name: "Sita Thapa",    role: "Patient, Gaighat",   content: "The home collection was punctual and very professional. Saved me hours of travel.",                                  rating: 5, order: 3 },
    ],
  });

  // Branches
  await prisma.branch.deleteMany();
  await prisma.branch.createMany({
    data: [
        { name: "Life Quest Kathmandu Branch", address: "Maharajgunj-03, Panipokhari, Kathmandu", phone: "+977 9802302472", email: "lifequestclinicallab@gmail.com", hours: "Sun–Fri 7:00 AM – 7:00 PM · Sat 8:00 AM – 4:00 PM", order: 1 },
        { name: "Life Quest Clinical Lab, Birtamod", address: "Shree Krishna Complex, Birtamod-05, Jhapa", phone: "977023591222", email: "lifequestbtm@gmail.com", hours: "Sun–Fri 7:00 AM – 7:00 PM · Sat 8:00 AM – 4:00 PM", order: 2 },
        { name: "Life Quest Clinical Lab, Gaighat",  address: "Triyuga-10, Setopul, Gaighat", phone: "+977 9704583951", email: "lifequestgaighat@gmail.com", hours: "Sun–Fri 7:00 AM – 7:00 PM · Sat 8:00 AM – 4:00 PM", order: 3 },
    ],
  });

  // Site settings (KV — phone, email, address, footer copy, socials)
    // Values sourced from https://lifequestclinicallab.com.np/contact (verified in browser)
  await prisma.siteSetting.deleteMany();
  const settings: Record<string, string> = {
    "contact.phone":   "+977 01-4002747",
      "contact.mobile":  "+977 9868591121",
      "contact.email":   "lifequest@gmail.com",
    "contact.address": "Maharajgunj-03, Panipokhari, Kathmandu, Nepal",
    "contact.hours":   "Sun–Fri 7:00 AM – 7:00 PM · Sat 8:00 AM – 4:00 PM",
    "contact.whatsapp":"9779802302471",
    "contact.messenger":"https://m.me/lifequestclinicallab",
    "footer.tagline":  "Trusted clinical diagnostics across Nepal — accurate results, every time.",
    "footer.copyright":"© 2026 Life Quest Clinical Lab. All rights reserved.",
    "social.facebook": "https://www.facebook.com/lifequestclinicallab",
    "social.instagram":"",
    "social.twitter":  "",
    "site.name":       "Life Quest Clinical Lab",
    "about.title": "Discover the Heart of Life Quest",
    "about.description": "Our commitment to excellence is unwavering. We are dedicated to providing the highest standards of accuracy, reliability, and precision in every diagnostic service we offer.",
    "about.mission": "Our laboratory’s mission is to provide high quality laboratory services at reasonable prices in the shortest time possible with the importance on quality and complete client contentment.",
    "about.vision": "To ensure that the entire laboratory examination procedures conducted give accuracy, reliable and the highest quality results."
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  // Team Members
  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({
    data: [
      { name: "Rakesh Pokhrel", role: "Managing Director/Founder", photo: "/uploads/team/DSC00021.jpg", order: 1, active: true },
      { name: "Prem Raj Pokhrel", role: "Executive Director/Co-Founder", photo: "/uploads/team/DSC00034.jpg", order: 2, active: true },
      { name: "Dr. Deliya Paudel", role: "Consultant Pathologist/ Lab Head", photo: "/uploads/team/DSC00234.jpg", order: 3, active: true },
      { name: "Amrit Kandel", role: "Executive Advisor", photo: "/uploads/team/Amrit_Kandel.jpeg", order: 4, active: true },
      { name: "Govinda Prasad Dahal", role: "Advisor", photo: "/uploads/team/WhatsApp_Image_2025-02-27_at_11.29.45_AM.jpeg", order: 5, active: true }
    ]
  });

  console.log("✅ Seed complete!");
  console.log("📧 Admin: admin@medlab.com");
  console.log("🔑 Password: Admin@123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
