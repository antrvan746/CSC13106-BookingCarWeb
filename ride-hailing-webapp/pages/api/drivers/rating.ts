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
        const driverId = IdentityType.parse(req.query.driver_id);

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

        let rating = 5;
        if (result.length > 0) {
          rating = result
            .map((item) => item.user_rating)
            .reduce((partialSum, a) => partialSum + a, 0);
          rating /= result.length;
        }
        console.log(rating);
        res.status(200).json(rating);
      } catch (err) {
        res.status(500).json(err);
      }
  }
}
