import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchUsersFromDB() {
  const user = await prisma.user.findMany();

  return user;
}

export async function addUserToDB(name: string, email: string) {
  await prisma.user.create({
    data: {
      name,
      email,
    },
  });
}

export async function updateUserDB(
  id: number,
  updateData: { name: string; email: string }
) {
  await prisma.user.update({
    where: { id },
    data: { ...updateData },
  });
}

export async function deleteUserDB(id: number) {
  await prisma.user.delete({
    where: { id },
  });
}

export async function checkUser({
  id,
  email,
}: {
  id?: number;
  email?: string;
}) {
  return await prisma.user.findFirst({
    where: {
      id,
      email,
    },
  });
}
