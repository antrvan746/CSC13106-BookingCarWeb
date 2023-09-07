import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import DriverRepository from "./repository/drivers.repository";

const driverRepository = new DriverRepository();

const driverSchema = z.object({
  phone: z.string().max(12),
  email: z.string().email().optional(),
  name: z.string(),
  rating: z.number().optional().default(5),
});

type DriverCreateInput = {
  phone: string;
  email?: string;
  name: string;
  rating?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const drivers = await driverRepository.getAllDrivers();
        res.status(200).json(drivers);
      } catch (message) {
        console.log(message);
        res.status(500).json({ error: "Failed to get drivers", message });
      }
      break;

    case "POST":
      try {
        const { phone, email, name, rating } = driverSchema.parse(req.body);
        const driverData: DriverCreateInput = {
          phone,
          email,
          name,
          rating: rating || 5, // Set default rating to 5 if not provided
        };
        const driver = await driverRepository.createDriver(driverData);
        res.status(201).json(driver);
      } catch (message) {
        console.log(message);
        res.status(400).json({ error: message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}
