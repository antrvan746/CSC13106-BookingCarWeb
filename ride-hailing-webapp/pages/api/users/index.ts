import { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import UserRepository from "./repository/users.repository";
import { UserCreateRequest, UserGetRequest } from "../../../types/api/UserZodSchema";
import RestApiHandler from "../../../libs/RestApiHandle.strategy";

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
        RestApiHandler(req.query, UserGetRequest, userRepository.getUsers, defaultReturn)
      } catch (error) {
        return res.status(500).json({ message: error });
      }
      break;

    case "POST":
      try {
        RestApiHandler(req.body, UserCreateRequest, async (data) => {
          const exist = await userRepository.findExistUser(data);
          return exist ? exist : await userRepository.createUser(data)
        }, defaultReturn)

      } catch (message) {
        console.log(message);
        return res.status(500).json({ error: message });
      }
      break;
    default:
      return res.status(400).json({ message: "Invalid request method" });
      break;
  }

}
