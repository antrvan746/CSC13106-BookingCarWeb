import { z } from "zod";

const driverPutSchema = z.object({
  id: z.string(),
  phone: z.string().max(12).optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  rating: z.number().optional().default(5),
});
const driverPostSchema = z.object({
  phone: z.string().max(12),
  email: z.string().email().optional(),
  name: z.string(),
  rating: z.number().optional().default(5),
});

const driverPhoneSchema = z.object({
  phone: z.string().max(12)
});

export { driverPutSchema,driverPostSchema, driverPhoneSchema }