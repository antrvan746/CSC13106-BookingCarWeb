import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
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
        const NumberQueryType = z.number().optional();

        let skip = NumberQueryType.parse(req.query.skip);
        let take = NumberQueryType.parse(req.query.take);

        const staffs = await prisma.staff.findMany({
          skip: skip,
          take: take,
        });
        res.status(200).json(staffs);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "POST":
      try {
        let staff = StaffCreateInput.parse(req.body);
        const createdStaff = await prisma.staff.create({
          data: {
            email: staff.email,
            role: staff.role,
            name: staff.name,
          },
        });
        res.status(200).json(createdStaff);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request method" });
      break;
  }
}
