import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import z, { ZodError } from "zod";
import { Message } from "@mui/icons-material";
import DriverRepository from "./repository/drivers.repository";
import { driverIdSchema, driverPhoneSchema, driverPostSchema } from "../../../types/api/DriverZodSchema";
import RestApiHandler from "../../../libs/RestApiHandle.strategy";

const driverRepository = new DriverRepository();



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const id = driverIdSchema.parse(req.query.id);
        if (req.query.phone) {

          const phone = driverPhoneSchema.parse(req.query.phone);
          const driver = await driverRepository.findByPhone(phone);
          if (driver) {
            return res.status(200).json(driver);
          }
        }

        const driver = await driverRepository.findById(id);

        if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
        }

        return res.status(200).json(driver);
      } catch (message) {
        res.status(500).json({ error: "Failed to get Driver:", message });
      }
      break;

    case "PUT":
      RestApiHandler(res,
        {
          ...req.body,
          id: req.query.id
        }, driverPostSchema,
        driverRepository.updateDriver,
        async (res, data, err) => {
          if (err) {
            console.log(err);
            return err instanceof ZodError ?
              res.status(400).json({ error: "Invalid request payload" }) :
              res.status(500).json({ error: "something wen wrong" })
          }
          return data ?
            res.status(200).json(await data) :
            res.status(404).json({ error: "Driver not found" });
        })
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
