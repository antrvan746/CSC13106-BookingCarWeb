import {z} from "zod";


const RideGetQuery = z.object({
  rideId:z.string().optional(),
  userId: z.string().optional(),
  driverId: z.string().optional(),
  page: z.coerce.number().default(0)
}).refine(val => !!val.driverId || !!val.userId || !!val.rideId, "At least 1 id is needed");

const RidePostRequestBody = z.object({
  user_id: z.string(),
  driver_id: z.string(),
  vehicle_id: z.string(),
  fee: z.number(),
  payment_type: z.union([
    z.literal("CASH"),
    z.literal("CARD"),
    z.literal("E_WALLET")
  ]),
  start_google_place_id: z.string(),
  end_google_place_id: z.string(),
  book_time: z.coerce.date()
});

const RidePutRequestBody = z.object({
  rideId: z.string(),
  fee: z.number().optional(),
  start_place_name: z.string().optional(),
  end_place_name: z.string().optional(),
  arrive_time: z.coerce.date().optional(),
  status: z.union([
    z.literal("BOOKED"),
    z.literal("CANCELED"),
    z.literal("FINISED")
  ]).optional()
});

export {RideGetQuery,RidePostRequestBody,RidePutRequestBody}