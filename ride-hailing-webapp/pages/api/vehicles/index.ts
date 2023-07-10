import { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from "../../../libs/prisma";
import { z } from 'zod';

const vehicleSchema = z.object({
  driver_id: z.string(),
  plate_number: z.string().max(20),
  model: z.string(),
  color: z.string().optional(),
  type: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all vehicles
    try {
      const vehicles = await prismaClient.vehicle.findMany();
      res.status(200).json(vehicles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else if (req.method === 'POST') {
    // Create a new vehicle
    try {
      const { driver_id, plate_number, model, color, type } = vehicleSchema.parse(req.body);
      const vehicle = await prismaClient.vehicle.create({
        data: {
          driver_id,
          plate_number,
          model,
          color,
          type,
        },
      });
      res.status(201).json(vehicle);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Invalid request payload' });
    }
  } else if (req.method === 'PUT') {
    // Update a vehicle by ID
    try {
      const { id, driver_id, plate_number, model, color, type } = req.body;
      const updatedVehicle = await prismaClient.vehicle.update({
        where: { id },
        data: {
          driver_id,
          plate_number,
          model,
          color,
          type,
        },
      });
      res.status(200).json(updatedVehicle);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Invalid request payload' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a vehicle by ID
    try {
      const { id } = req.body;
      await prismaClient.vehicle.delete({
        where: { id },
      });
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Invalid request payload' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
