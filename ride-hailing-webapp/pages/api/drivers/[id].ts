import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import z, { ZodError } from "zod";
import { Message } from "@mui/icons-material";
import DriverRepository from "./repository/drivers.repository";
import { driverPhoneSchema, driverPostSchema, driverPutSchema } from "../../../types/api/DriverZodSchema";
import RestApiHandler from "../../../libs/RestApiHandle.strategy";
import { idParamsSchema } from "../../../types/api/RestApiCommon";

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
        console.log(decodeURIComponent(req.query.phone as string))
        if (typeof req.query.phone === "string") {
          RestApiHandler(
            { phone: decodeURIComponent(req.query.phone) },
            driverPhoneSchema,
            driverRepository.findByPhone,
            defaultReturn
          );
        } else {
          RestApiHandler(
            req.query,
            idParamsSchema,
            driverRepository.findById,
            defaultReturn
          );
        }
      } catch (message) {
        return res.status(500).json({ error: "Server error", message });
      }
      break;

    case "PUT":
      try {
        RestApiHandler(
          {
            ...req.body,
            id: req.query.id
          }, driverPutSchema,
          driverRepository.updateDriver,
          defaultReturn
        );
      } catch (e) {
        return res.status(500).json({ error: "Server error", e });
      }
      break;

    case "DELETE":
      try {
        RestApiHandler(
          req.query,
          idParamsSchema,
          driverRepository.deleteDriver,
          defaultReturn
        );
      } catch (message) {
        console.log(message);
        res.status(500).json({ error: message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }

}
