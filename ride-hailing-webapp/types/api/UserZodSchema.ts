import { z } from "zod";

const UserPutRequest = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  isVip: z.boolean().optional(),
  rating: z.number().min(1).max(5).optional(),
});
const UserCreateRequest = z.object({
  email: z.string().email().optional(),
  phone: z.string().nonempty(),
  name: z.string().nonempty(),
});

const UserGetRequest = z.object({
  skip: z.number().default(0),
  take: z.number().default(10),
  phone:z.string().optional()
});
export { UserPutRequest, UserCreateRequest, UserGetRequest }