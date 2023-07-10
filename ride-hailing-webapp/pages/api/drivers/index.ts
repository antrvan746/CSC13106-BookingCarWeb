import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../libs/prisma";
import z from "zod";

const driverSchema = z.object({
  phone: z.string().max(11),
  name: z.string(),
  rating: z.number().default(5),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all drivers
    try {
      const drivers = await prismaClient.driver.findMany();
      res.status(200).json(drivers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else if (req.method === 'POST') {
    // Create a new driver
    try {
      const { phone, name, rating } = driverSchema.parse(req.body);
      const driver = await prismaClient.driver.create({
        data: {
          phone,
          name,
          rating,
        },
      });
      res.status(201).json(driver);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Invalid request payload' });
    }
  } else if (req.method === 'PUT') {
    // Update a driver by ID
    try {
      const { id, phone, name, rating } = req.body;
      const updatedDriver = await prismaClient.driver.update({
        where: { id },
        data: {
          phone,
          name,
          rating,
        },
      });
      res.status(200).json(updatedDriver);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Invalid request payload' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a driver by ID
    try {
      const { id } = req.body;
      await prismaClient.driver.delete({
        where: { id },
      });
      res.status(200).json({ message: 'Driver deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Invalid request payload' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};
