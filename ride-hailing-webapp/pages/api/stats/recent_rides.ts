import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const recentRides = await prisma.ride.findMany({
        select: {
          start_place_name: true,
          end_place_name: true,
          fee: true,
          payment_type: true,
          book_time: true,
        },
        orderBy: {
          book_time: "desc",
        },
        take: 5,
      });
      break;
  }
}
