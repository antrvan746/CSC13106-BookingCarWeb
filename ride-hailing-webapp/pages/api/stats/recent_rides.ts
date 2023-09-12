import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
// select: {
//   id: true,
//   start_place_name: true,
//   end_place_name: true,
//   fee: true,
//   payment_type: true,
//   book_time: true,
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const recentRides = await prisma.ride.findMany({
          select: {
            id: true,
            start_name: true,
            end_name: true,
            fee: true,
            payment_type: true,
            book_time: true,
          },
          orderBy: {
            book_time: "desc",
          },
          take: 5,
        });
        const data = recentRides.map(v => ({
          ...v,
          start_place_name: v.start_name,
          end_place_name: v.end_name,
        }))
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({ message: err });
      }
      break;
  }
}
