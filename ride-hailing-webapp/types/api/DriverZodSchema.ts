import { z } from "zod";

const driverPostSchema = z.object({
  id: z.string(),
  phone: z.string().max(12).optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  rating: z.number().optional().default(5),
});

const driverIdSchema = z.string();
const driverPhoneSchema = z.string().max(12);

export { driverPostSchema, driverIdSchema, driverPhoneSchema }