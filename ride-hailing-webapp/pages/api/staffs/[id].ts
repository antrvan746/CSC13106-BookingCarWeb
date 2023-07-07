import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const staffId = req.query.id;
      try {
        if (typeof staffId != "string") {
          throw new Error("Invalid staff id");
        }
        const staff = await prisma.staff.findFirstOrThrow({
          where: {
            id: staffId,
          },
        });
        res.status(200).json(staff);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "PUT":
      try {
        const staff: Prisma.staffCreateInput = req.body;
        const updatedStaff = await prisma.staff.update({
          where: {
            email: staff.email
          },
          data: {
            role: staff.role
          },
        });
        res.status(200).json(updatedStaff);
      } catch (error) {
        res.status(500).json({ message: error });
      }

    default:
      res.status(400).json({ message: "Invalid request method" });
      break;
  }
}
