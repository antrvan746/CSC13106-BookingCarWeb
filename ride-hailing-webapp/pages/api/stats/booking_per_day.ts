import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface QueryResponse {
  day: string;
  count: BigInt;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const numberBookingPerHour: QueryResponse[] = await prisma.$queryRaw(
          Prisma.sql`SELECT DATE_TRUNC('day', book_time) AS day, COUNT(*) AS count
          FROM "ride"
          WHERE DATE_PART('year', book_time) = DATE_PART('year', CURRENT_DATE)
            AND DATE_PART('month', book_time) = DATE_PART('month', CURRENT_DATE)
          GROUP BY day
          ORDER BY day`
        );

        const formattedBookingPerHour = numberBookingPerHour.map((entry) => ({
          day: entry.day,
          count: Number(entry.count),
        }));

        res.status(200).json(formattedBookingPerHour);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
      }
      break;
  }
}
