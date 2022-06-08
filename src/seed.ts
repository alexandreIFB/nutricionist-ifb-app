import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  await prisma.mealDiet.deleteMany({})
  await prisma.diet.deleteMany({})
  await prisma.foodMeal.deleteMany({})
  await prisma.meal.deleteMany({})
  await prisma.food.deleteMany({})
  await prisma.avaliation.deleteMany({})
  await prisma.appointment.deleteMany({})
  await prisma.client.deleteMany({})
  await prisma.nutricionist.deleteMany({})



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

  const appointmentOneAlexandre = await prisma.appointment.create({
    data: {
      dateAndTime: new Date(2022, 8, 7, 14 - 3, 0),
      clientId: clientAlexandre.id,
    }
  })

  const appointmentTwoAlexandre = await prisma.appointment.create({
    data: {
      dateAndTime: new Date(2022, 8, 8, 14 - 3, 0),
      clientId: clientAlexandre.id,
    }
  })

  const avaliatonOneAlexandre = await prisma.avaliation.create({
    data: {
      date: new Date(2022, 8, 7, 14 - 3, 30),
      clientId: clientAlexandre.id,
      appointmentId: appointmentOneAlexandre.id,
      fat: 32,
      mmc: 110,
      size: 1.72,
      weight: 105,
    }
  })

  const avaliatonTwoAlexandre = await prisma.avaliation.create({
    data: {
      date: new Date(2022, 8, 8, 14 - 3, 30),
      clientId: clientAlexandre.id,
      appointmentId: appointmentTwoAlexandre.id,
      fat: 25,
      mmc: 100,
      size: 1.72,
      weight: 100,
    }
  })

  const foodOvo = await prisma.food.create({
    data: {
      calories: 100,
      name: 'Ovo'
    }
  })

  const foodCuscus = await prisma.food.create({
    data: {
      calories: 100,
      name: 'Cuscus'
    }
  })

  const foodCafe = await prisma.food.create({
    data: {
      calories: 100,
      name: 'Cafe'
    }
  })

  const meelCafeManhaCuscus = await prisma.meal.create({
    data: {
      name: 'Cuscus com ovo',
      foods: {
        create: [
          { foodId: foodOvo.id },
          { foodId: foodCuscus.id },
          { foodId: foodCafe.id }
        ]
      }
    }
  })

  const dietAle = await prisma.diet.create({
    data: {
      calories: 10000,
      type: 'Emagrecimento',
      clientId: clientAlexandre.id,
      meals: {
        create: {
          mealId: meelCafeManhaCuscus.id
        }
      }
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
