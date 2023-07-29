import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodType } from "zod";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const IdentityType = z.string();
        const driverId = IdentityType.parse(req);

        const result = await prisma.rating.findMany({
          where: {
            ride: {
              user_id: driverId,
            },
          },
          select: {
            user_rating: true,
          },
        });

        res.status(200).json(result);
      } catch (err) {
        res.status(500).json(err);
      }
  }
}
