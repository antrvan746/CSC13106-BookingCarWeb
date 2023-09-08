import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import z, { ZodError } from "zod";
import DriverRepository from "./repository/drivers.repository";
import { driverPostSchema } from "../../../types/api/DriverZodSchema";
import RestApiHandler from "../../../libs/RestApiHandle.strategy";

const driverRepository = new DriverRepository();



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const defaultReturn = async function <T extends any>(data: T, err?: Error) {
    if (err || !data) {
      console.log(err);
      return err instanceof ZodError ?
        res.status(400).json({ error: "Invalid request payload" }) :
        res.status(500).json({ error: "Something went wrong" })
    }
    const result = await data;
    return result ?
      res.status(200).json(result) :
      res.status(404).json({ error: "Driver not found" });
  }

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
        RestApiHandler(
          req.body,
          driverPostSchema,
          driverRepository.createDriver,
          defaultReturn
        );
      } catch (message) {
        console.log(message);
        res.status(400).json({ error: message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }


}
