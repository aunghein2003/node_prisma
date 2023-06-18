const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.user
  .create({
    data: {
      name: "aunghein",
      email: "aunghein@gmail.com",
    },
  })
  .then(() => console.log("User created"));
