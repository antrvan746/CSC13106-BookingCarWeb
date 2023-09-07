import { z } from "zod";

const RatingGetQuery = z.object({   
  rateId:z.string().optional(),
  rideId:z.string().optional(),
  userId: z.string().optional(),
  driverId: z.string().optional(),
  page: z.coerce.number().default(0),
}).refine(val => !!val.rateId || !!val.rateId || !!val.userId || !!val.driverId,"At least 1 id required");

const RatingPostBody = z.object({
  ride_id: z.string(),
  score: z.number(),
  comment: z.string().optional()
})

export {RatingGetQuery,RatingPostBody}