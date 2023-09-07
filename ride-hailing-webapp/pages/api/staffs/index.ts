import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import StaffRepository from "./repository/staffs.repository";

const StaffCreateRequest = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
});

const StaffGetRequest = z.object({
  skip: z.number().default(0),
  take: z.number().default(10),
});

const staffRepository = new StaffRepository;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { skip, take } = StaffGetRequest.parse(req.query);
        const staffList = await staffRepository.getAllStaff(skip, take);
        res.status(200).json(staffList);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    case "POST":
      try {
        const staff = StaffCreateRequest.parse(req.body);
        const createdStaff = await staffRepository.createStaff(staff);
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
