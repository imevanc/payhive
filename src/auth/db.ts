"use server";
import {PrismaClient} from "@prisma/client";
import {genSaltSync, hashSync} from "bcrypt";
import {redirect} from "next/navigation";

const prisma = new PrismaClient();

export async function getUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return prisma.user.create({
    data: {
      email,
      password: hash,
      firstName,
      lastName,
    },
  });
}

export async function disconnect() {
  await prisma.$disconnect();
}

export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  const user = await getUser(email);
  if (user) {
    return "User already exists";
  } else {
    await createUser(email, password, firstName, lastName);
    redirect("/sign-in");
  }
}
