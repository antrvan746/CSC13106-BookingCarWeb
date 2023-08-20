import { PrismaClient, RideStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();

const StaffCreateInput = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
});

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
        res.status(200).json(balance._sum.fee);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
  }
}
