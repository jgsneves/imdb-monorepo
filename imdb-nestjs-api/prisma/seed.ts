import { PrismaClient } from "@prisma/client"
import { v4 as uuid } from "uuid"

const prisma = new PrismaClient()

async function main() {
    const adminUser = await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            id: uuid(),
            name: "Usuário admin",
            password: "$2a$10$Zl7gyl20KFzhHSsCHDav6eNgXpzpZ2k7anMZBNide0tlTuLOGlG.2",
            role: "ADMIN",
        }
    })
    console.log({ adminUser })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })