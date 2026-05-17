import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const mapping: Record<string, string> = {
  "Rakesh Pokhrel": "/uploads/team/DSC00021.jpg",
  "Prem Raj Pokhrel": "/uploads/team/DSC00034.jpg",
  "Dr. Deliya Paudel": "/uploads/team/DSC00234.jpg",
  "Amrit Kandel": "/uploads/team/Amrit_Kandel.jpeg",
  "Govinda Prasad Dahal": "/uploads/team/WhatsApp_Image_2025-02-27_at_11.29.45_AM.jpeg",
}

async function main() {
  for (const [name, photo] of Object.entries(mapping)) {
    await prisma.teamMember.updateMany({ where: { name }, data: { photo } })
  }
  console.log("Team photos updated to local paths.")
}

main().finally(() => prisma.$disconnect())
