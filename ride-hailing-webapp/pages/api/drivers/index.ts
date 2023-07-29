import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../libs/prisma";
import z from "zod";

const driverSchema = z.object({
  phone: z.string().max(11),
  email: z.string().email().optional(),
  name: z.string(),
  rating: z.number().default(5),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const drivers = await prismaClient.driver.findMany();
        res.status(200).json(drivers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
      break;
    case "POST":
      try {
        const { phone, email = "", name, rating } = driverSchema.parse(req.body);
        const driver = await prismaClient.driver.create({
          data: {
            phone,
            email, // email field is optional, and if not provided, it will default to an empty string
            name,
            rating,
          },
        });
        res.status(201).json(driver);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Invalid request payload' });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}

