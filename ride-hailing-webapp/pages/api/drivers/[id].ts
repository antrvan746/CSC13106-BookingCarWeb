import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import { Message } from "@mui/icons-material";
import DriverRepository from "./repository/drivers.repository";

const driverRepository = new DriverRepository();

const driverSchema = z.object({
  phone: z.string().max(12).optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  rating: z.number().optional().default(5),
});

const driverIdSchema = z.string().uuid();
const driverPhoneSchema = z.string().max(12);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const driverPhone = req.query.id;
        const phone = driverPhoneSchema.parse(driverPhone);
        const driver = await driverRepository.findByPhone(phone);

        if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
        }

        res.status(200).json(driver);
      } catch (message) {
        res.status(500).json({ error: "Failed to get Driver:", message });
      }
      break;

    case "PUT":
      try {
        const updatedData = driverSchema.parse(req.body);
        const driverId = req.query.id;
        const id = driverIdSchema.parse(driverId);
        const existingDriver = await driverRepository.findById(id);

        if (!existingDriver) {
          return res.status(404).json({ error: "Driver not found" });
        }

        const updatedDriver = await driverRepository.updateDriver(id, updatedData);

        res.status(200).json(updatedDriver);
      } catch (message) {
        console.log(message);
        res.status(400).json({ error: "Invalid request payload", message });
      }
      break;

    case "DELETE":
      try {
        const driverId = req.query.id;
        const id = driverIdSchema.parse(driverId);

        const existingDriver = await driverRepository.findById(id);
  
        if (!existingDriver) {
          return res.status(404).json({ error: "Driver not found" });
        }
    
        await driverRepository.deleteDriver(id);
    
        res.status(200).json({ message: "Driver deleted successfully" });
      } catch (message) {
        console.log(message);
        res.status(500).json({ error: message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}
