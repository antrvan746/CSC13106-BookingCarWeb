import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { z, ZodType } from "zod";

const prisma = new PrismaClient();

const UserCreateRequest = z.object({
  email: z.string().email().optional(),
  phone: z.string().nonempty(),
  name: z.string().nonempty(),
});

const UserGetRequest = z.object({
  email: z.string().email().optional(),
  phone:z.string().optional(),
  skip: z.number().default(0),
  take: z.number().default(10)
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":

      try {
        const {skip,take,email,phone} = UserGetRequest.parse(req.query)
        const users = await prisma.user.findMany({
          skip: skip,
          take: take,
          where:{
            phone: phone,
            email: email
          }
        });
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "POST":
      try {
        const user = UserCreateRequest.parse(req.body);

        const exist = await prisma.user.findFirst({
          where:{
            OR:[{phone:user.phone}]
          }
        })
        if (exist !== null){
          return res.status(200).json(exist);
        }

        const createdUser = await prisma.user.create({
          data: {
            email: user.email,
            phone: user.phone,
            name: user.name,
          },
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
