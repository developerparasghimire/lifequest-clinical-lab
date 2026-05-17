import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const teamMembers = [
    {
      name: "Rakesh Pokhrel",
      role: "Managing Director/Founder",
      photo: "https://api.lifequestclinicallab.com.np/components/popup/DSC00021.jpg",
      order: 1,
      active: true
    },
    {
      name: "Prem Raj Pokhrel",
      role: "Executive Director/Co-Founder",
      photo: "https://api.lifequestclinicallab.com.np/components/popup/DSC00034.jpg",
      order: 2,
      active: true
    },
    {
      name: "Dr. Deliya Paudel",
      role: "Consultant Pathologist/ Lab Head",
      photo: "https://api.lifequestclinicallab.com.np/components/popup/DSC00234.jpg",
      order: 3,
      active: true
    },
    {
      name: "Amrit Kandel",
      role: "Executive Advisor",
      photo: "https://api.lifequestclinicallab.com.np/components/popup/Amrit_Kandel.jpeg",
      order: 4,
      active: true
    },
    {
      name: "Govinda Prasad Dahal",
      role: "Advisor",
      photo: "https://api.lifequestclinicallab.com.np/components/popup/WhatsApp_Image_2025-02-27_at_11.29.45_AM.jpeg",
      order: 5,
      active: true
    }
  ];

  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({
    data: teamMembers
  });
  
  console.log("Updated Team Members with real data from live site!")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
