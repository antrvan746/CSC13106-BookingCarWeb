import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

const vehicleIdSchema = z.string().uuid();
const driverIdSchema = z.string().uuid();

const vehicleSchema = z.object({
  driver_id: z.string().uuid().optional(),
  plate_number: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  type: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const driverId = req.query.id;
        const id = driverIdSchema.parse(driverId);
        const vehicle = await prisma.vehicle.findFirstOrThrow({
          where: {
            driver_id: id,
          },
        });

        if (!vehicle) {
          return res.status(404).json({ error: "Vehicle not found" });
        }

        res.status(200).json(vehicle);
      } catch (message) {
        res.status(500).json({ error: "Failed to get Vehicle:", message });
      }
      break;

    case "PUT":
      try {
        const updatedData = vehicleSchema.parse(req.body);
        const { vehiclesId } = req.query;
        console.log("Vehicle id is: ", vehiclesId);
        console.log("Updated data is: ", updatedData);

        const id = vehicleIdSchema.parse(vehiclesId);
        const existingVehicle = await prisma.vehicle.findUnique({
          where: { id },
        });

        if (!existingVehicle) {
          return res.status(404).json({ error: "Vehicle not found" });
        }

        const updatedVehicle = await prisma.vehicle.update({
          where: { id },
          data: updatedData,
        });
        res.status(200).json(updatedVehicle);
      } catch (error) {
        res.status(400).json({ error: "Invalid request payload" });
      }
      break;

    case "DELETE":
      try {
        const { vehiclesId } = req.query;
        const id = vehicleIdSchema.parse(vehiclesId);
        const existingVehicle = await prisma.vehicle.findUnique({
          where: { id: id },
        });

        if (!existingVehicle) {
          return res.status(404).json({ error: "Vehicle not found" });
        }

        await prisma.vehicle.delete({
          where: {
            id: id,
          },
        });

        res.status(200).json({ message: "Vehicle deleted successfully" });
      } catch (message) {
        res.status(500).json({ error: message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}
