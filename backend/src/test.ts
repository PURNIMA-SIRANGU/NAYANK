import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  console.log(prisma.user);

  console.log(prisma.officerProfile);
}