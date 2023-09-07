import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import StaffRepository from "./repository/staffs.repository";

const StaffUpdateRequest = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  role: z.enum(["ADMIN", "EMPLOYEE"]).optional(),
});

const staffRepository = new StaffRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const staffId = z.string().uuid().parse(req.query.id);
      try {
        const staff = await staffRepository.getStaffById(staffId);
        if (!staff) {
          return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json(staff);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "PUT":
      try {
        const staffId = z.string().uuid().parse(req.query.id);
        const staff = StaffUpdateRequest.parse(req.body);
        const updatedStaff = await staffRepository.updateStaff(staffId, {
          role: staff.role,
          email: staff.email,
          name: staff.name,
        });
        res.status(200).json(updatedStaff);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "DELETE":
      try {
        const staffId = z.string().uuid().parse(req.query.id);
        await staffRepository.deleteStaff(staffId);
        res.status(200).json({ message: "Staff deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request method" });
      break;
  }
}
