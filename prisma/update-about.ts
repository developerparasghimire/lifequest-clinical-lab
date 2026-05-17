import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const settings = [
    { key: "about.title", value: "Discover the Heart of Life Quest" },
    { key: "about.description", value: "Our commitment to excellence is unwavering. We are dedicated to providing the highest standards of accuracy, reliability, and precision in every diagnostic service we offer." },
    { key: "about.mission", value: "Our laboratory’s mission is to provide high quality laboratory services at reasonable prices in the shortest time possible with the importance on quality and complete client contentment." },
    { key: "about.vision", value: "To ensure that the entire laboratory examination procedures conducted give accuracy, reliable and the highest quality results." }
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    })
  }
  
  console.log("Updated SiteSettings with real about data.")
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
