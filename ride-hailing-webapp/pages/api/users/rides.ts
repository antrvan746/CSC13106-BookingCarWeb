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
        const userId = IdentityType.parse(req.query.user_id);

        const userRides = await prisma.ride.findMany({
          where: {
            user_id: userId,
          },
          select: {
            id: true,
            vehicle: {
              select: {
                plate_number: true,
                model: true,
                type: true,
              },
            },
            fee: true,
            start_google_place_id: true,
            start_place_name: true,
            end_google_place_id: true,
            end_place_name: true,
          },
        });
        res.status(200).json(userRides);
      } catch (err) {
        res.status(500).json(err);
      }
  }
}
