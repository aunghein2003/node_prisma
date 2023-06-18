import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchUsersFromDB() {
  const user = await prisma.user.findMany();

  return user;
}

export async function addUserToDB(name: string) {
  await prisma.user.create({
    data: {
      name: name,
    },
  });
}

export async function updateUserDB(id: number, name: string) {
  await prisma.user.update({
    where: { id: id },
    data: { name: name },
  });
}

export async function deleteUserDB(id: number) {
  await prisma.user.delete({
    where: { id: id },
  });
}

export async function checkUser(id: number) {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}
