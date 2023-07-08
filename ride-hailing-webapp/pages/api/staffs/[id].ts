import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();

const StaffUpdateRequest = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  role: z.enum(["ADMIN", "EMPLOYEE"]).optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const staffId = z.string().uuid().parse(req.query.id);
      try {
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
        const staffId = z.string().parse(req.query.id);
        const staff = StaffUpdateRequest.parse(req.body);
        const updatedStaff = await prisma.staff.update({
          where: {
            id: staffId,
          },
          data: {
            role: staff.role,
            email: staff.email,
            name: staff.name,
          },
        });
        res.status(200).json(updatedStaff);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    default:
      res.status(400).json({ message: "Invalid request method" });
      break;
  }
}
