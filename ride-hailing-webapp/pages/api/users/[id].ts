import { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import UserRepository from "./repository/users.repository";
import RestApiHandler from "../../../libs/RestApiHandle.strategy";
import { idParamsSchema } from "../../../types/api/RestApiCommon";
import { UserPutRequest } from "../../../types/api/UserZodSchema";



const userRepository = new UserRepository();

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
        RestApiHandler(req.query, idParamsSchema, userRepository.getUserById, defaultReturn)
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "PUT":
      try {
        RestApiHandler({ ...req.body, id: req.query.id }, UserPutRequest,
          userRepository.updateUser, defaultReturn)
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "DELETE":
      try {
        RestApiHandler(req.query, idParamsSchema, userRepository.deleteUser, defaultReturn)
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    default:
      return res.status(400).json({ message: "Invalid request method" });
  }

}

