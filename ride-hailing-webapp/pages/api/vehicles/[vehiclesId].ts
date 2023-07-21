import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../libs/prisma";
import z from "zod";

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
        const validId = vehicleIdSchema.parse(req.query);
        const vehicle = await prismaClient.vehicle.findUnique({
          where: {
            id: validId,
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
        const id = vehicleIdSchema.parse(req.query);
        const existingVehicle = await prismaClient.vehicle.findUnique({ where: { id: String(id) } });
    
        if (!existingVehicle) {
          return res.status(404).json({ error: "Vehicle not found" });
        }

        await prismaClient.vehicle.delete({
          where: {
            id: String(id),
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
};

