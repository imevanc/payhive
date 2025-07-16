import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });
}

export async function disconnect() {
  await prisma.$disconnect();
}
