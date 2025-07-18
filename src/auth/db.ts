import { PrismaClient } from "../../generated/prisma";
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

export async function getUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });
}

export async function disconnect() {
  await prisma.$disconnect();
}
