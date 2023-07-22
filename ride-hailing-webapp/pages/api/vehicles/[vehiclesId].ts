import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

const vehicleSchema = z.object({
  driver_id: z.string(),
  plate_number: z.string().max(10),
  model: z.string(),
  color: z.string().optional(),
  type: z.string().optional(),
});

const vehicleIdSchema = z.string().uuid();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const { vehiclesId } = req.query;
        const id = vehicleIdSchema.parse(vehiclesId);
        const vehicle = await prisma.vehicle.findUnique({
          where: {
            id: id,
          },
        });

        if (!vehicle) {
          return res.status(404).json({ error: "Vehicle not found" });
        }

        res.status(200).json(vehicle);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
      }
      break;

    case "DELETE":
      try {
        const { vehiclesId } = req.query;
        const id = vehicleIdSchema.parse(vehiclesId);
        const existingVehicle = await prisma.vehicle.findUnique({ where: { id: id } });

        if (!existingVehicle) {
          return res.status(404).json({ error: "Vehicle not found" });
        }

        await prisma.vehicle.delete({
          where: {
            id: id,
          },
        });

        res.status(200).json({ message: "Vehicle deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}
