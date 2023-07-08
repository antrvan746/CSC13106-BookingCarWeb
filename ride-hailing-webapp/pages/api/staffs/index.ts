import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, StaffRole } from "@prisma/client";
import {z} from 'zod';

const prisma = new PrismaClient();

const StaffCreateInput = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
  role: z.enum(['ADMIN', 'EMPLOYEE']),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        let skip;
        let take;
        if (typeof req.query.skip === 'string') {
          skip = parseInt(req.query.skip) 
        } 
        if (typeof req.query.take === 'string') {
          take = parseInt(req.query.take) 
        }
        if (Number.isNaN(skip) || Number.isNaN(take)) {
          skip = undefined
          take = undefined
        }
        const staffs = await prisma.staff.findMany({
          skip: skip,
          take: take
        });
        res.status(200).json(staffs);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "POST":
      try {
        let staff = StaffCreateInput.parse(req.body)
        const createdStaff = await prisma.staff.create({
          data: {
            email: staff.email,
            role: staff.role,
            name: staff.name
          }
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
