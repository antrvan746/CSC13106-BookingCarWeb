import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, StaffRole } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const staffs = await prisma.staff.findMany();
        res.status(200).json(staffs);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "POST":
      try {
        const staff: Prisma.staffCreateInput = req.body;
        const createdStaff = await prisma.staff.create({
          data: staff,
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
