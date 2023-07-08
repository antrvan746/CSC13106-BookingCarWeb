import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();

const UserUpdateRequest = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  isVip: z.boolean().optional(),
  rating: z.number().min(1).max(5).optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const userId = z.string().uuid().parse(req.query.id);
      try {
        const user = await prisma.user.findFirstOrThrow({
          where: {
            id: userId,
          },
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    case "PUT":
      try {
        const userId = z.string().parse(req.query.id);
        const user = UserUpdateRequest.parse(req.body);
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            is_vip: user.isVip,
            rating: user.rating,
          },
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    default:
      res.status(400).json({ message: "Invalid request method" });
      break;
  }
}
