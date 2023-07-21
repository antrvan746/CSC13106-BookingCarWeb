import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../libs/prisma";
import z from "zod";

const driverSchema = z.object({
  phone: z.string().max(11),
  email: z.string().email().optional(),
  name: z.string(),
  rating: z.number().default(5),
});

const driverIdSchema = z.string().uuid();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const validId = driverIdSchema.parse(req.query);

        const driver = await prismaClient.driver.findUnique({ where: { id: validId } });

        if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
        }

        res.status(200).json(driver);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    case "DELETE":
      try {
        const validId = driverIdSchema.parse(req.query);

        const existingDriver = await prismaClient.driver.findUnique({ where: { id: validId } });

        if (!existingDriver) {
          return res.status(404).json({ error: "Driver not found" });
        }

        await prismaClient.driver.delete({
          where: { id: validId },
        });
        res.status(200).json({ message: "Driver deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}

