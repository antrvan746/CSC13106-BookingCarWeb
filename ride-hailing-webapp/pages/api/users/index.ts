import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { z, ZodType } from "zod";
import { prismaClient } from "../../../libs/prisma";

const prisma = new PrismaClient();

const UserCreateRequest = z.object({
  email: z.string().email().optional(),
  phone: z.string().nonempty(),
  name: z.string().nonempty(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const NumberQueryType = z.number().optional();

        let skip = NumberQueryType.parse(req.query.skip);
        let take = NumberQueryType.parse(req.query.take);

        const users = await prisma.user.findMany({
          skip: skip,
          take: take
        });
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "POST":
      try {
        const user = UserCreateRequest.parse(req.body);
        if(user.phone === "0" && !user.email){
          return res.status(400).json({message:"Invalid data"});
        }

        const existed = await prisma.user.findFirst({
          where:{email: user.email,phone: user.phone,name: user.name}
        });
        if (existed){
          return res.status(202).json(existed);
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
