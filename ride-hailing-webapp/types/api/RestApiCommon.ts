import { z } from "zod";

const idParamsSchema = z.object({
  id: z.string()
});

export { idParamsSchema }