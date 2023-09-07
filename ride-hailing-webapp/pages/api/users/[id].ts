import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import UserRepository from "./repository/users.repository";

const UserUpdateRequest = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  isVip: z.boolean().optional(),
  rating: z.number().min(1).max(5).optional(),
});

const userRepository = new UserRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const userId = z.string().uuid().parse(req.query.id);
      try {
        const user = await userRepository.getUserById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "PUT":
      try {
        const userId = z.string().parse(req.query.id);
        const user = UserUpdateRequest.parse(req.body);
        const updatedUser = await userRepository.updateUser(userId, {
          name: user.name,
          email: user.email,
          phone: user.phone,
          is_vip: user.isVip,
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "DELETE":
      try {
        const userId = z.string().uuid().parse(req.query.id);
        await userRepository.deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid request method" });
      break;
  }
}

