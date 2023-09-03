import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import { Message } from "@mui/icons-material";

const prisma = new PrismaClient();

const driverSchema = z.object({
  phone: z.string().max(11).optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  rating: z.number().optional().default(5),
});

const driverIdSchema = z.string().uuid();
const driverPhoneSchema = z.string().max(11);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // case "GET":
    //   try {
    //     const driverId = req.query.id;
    //     const id = driverIdSchema.parse(driverId);
    //     const driver = await prisma.driver.findFirstOrThrow({
    //       where: {
    //         id: id,
    //       },
    //     });

    //     if (!driver) {
    //       return res.status(404).json({ error: "Driver not found" });
    //     }

    //     res.status(200).json(driver);
    //   } catch (message) {
    //     res.status(500).json({ error: message });
    //     // res.status(500).json({ error: "Something went wrong" });
    //   }
    //   break;

    case "GET":
      try {
        const driverPhone = req.query.id;
        console.log(driverPhone);
        const phone = driverPhoneSchema.parse(driverPhone);
        const driver = await prisma.driver.findFirstOrThrow({
          where: {
            phone: phone,
          },
        });

        if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
        }

        res.status(200).json(driver);
      } catch (message) {
        res.status(500).json({ error: message });
      }
      break;

    case "PUT":
      try {
        const updatedData = driverSchema.parse(req.body);
        const { driverId } = req.query;
        const id = driverIdSchema.parse(driverId);
        const existingDriver = await prisma.driver.findUnique({
          where: { id },
        });

        if (!existingDriver) {
          return res.status(404).json({ error: "Driver not found" });
        }

        const updatedDriver = await prisma.driver.update({
          where: { id },
          data: updatedData,
        });

        res.status(200).json(updatedDriver);
      } catch (error) {
        res.status(400).json({ error: "Invalid request payload" });
      }
      break;

    case "DELETE":
      try {
        const { driverId } = req.query;
        const id = driverIdSchema.parse(driverId);

        const existingDriver = await prisma.driver.findUnique({
          where: { id: id },
        });

        if (!existingDriver) {
          return res.status(404).json({ error: "Driver not found" });
        }

        await prisma.driver.delete({
          where: { id: id },
        });

        res.status(200).json({ message: "Driver deleted successfully" });
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
