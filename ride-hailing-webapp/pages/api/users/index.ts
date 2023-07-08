import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { z, ZodType } from "zod";


const prisma = new PrismaClient();

const UserCreateRequest = z.object({
  email: z.string().email(),
  phone: z.string().nonempty(),
  name: z.string().nonempty()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "POST":
      try {
        const user = UserCreateRequest.parse(req.body);
        const createdUser = await prisma.user.create({
          data: {
            email: user.email,
            phone: user.phone,
            name: user.name
          }
        });
        res.status(200).json(createdUser);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request method" });
      break;
  }
}
