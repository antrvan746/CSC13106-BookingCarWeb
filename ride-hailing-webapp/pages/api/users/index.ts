import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import UserRepository from "./repository/users.repository";

const userRepository = new UserRepository();

const UserCreateRequest = z.object({
  email: z.string().email().optional(),
  phone: z.string().nonempty(),
  name: z.string().nonempty(),
});

const UserGetRequest = z.object({
  skip: z.number().default(0),
  take: z.number().default(10),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { skip, take} = UserGetRequest.parse(req.query);
        const users = await userRepository.getUsers(skip, take);
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    
    case "POST":
      try {
        const user = UserCreateRequest.parse(req.body);
      
        const exist = await userRepository.findExistUser(user.phone);
        if (exist !== null) {
          return res.status(409).json({ error: "User already exists", exist });
        }
      
        const createdUser = await userRepository.createUser(user);
        res.status(200).json(createdUser);
      } catch (message) {
        console.log(message);
        res.status(500).json({ error: message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request method" });
      break;
  }
}
