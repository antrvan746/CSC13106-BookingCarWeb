import { PrismaClient, RideStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const balance = await prisma.ride.aggregate({
          _sum: {
            fee: true,
          },
          where: {
            status: RideStatus.BOOKED,
          },
        });
        res.status(200).json({ balance: balance._sum.fee });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
  }
}
