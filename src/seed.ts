import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  await prisma.nutricionist.deleteMany({})
  await prisma.client.deleteMany({})



  const nutricionistLeticia = await prisma.nutricionist.create({
    data: {
      name: "Leticia Ribeiro",
      email: "leticiarib@course.com",
      cnn: "77114",
      phone: "61 9 98888888"
    }
  })

  const clientAlexandre = await prisma.client.create({
    data: {
      name: "Alexandre Abreu",
      email: "alexandreabr@course.com",
      phone: "61 9 98888888",
      nutricionistId: nutricionistLeticia.id
    }
  })
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect()
  })
