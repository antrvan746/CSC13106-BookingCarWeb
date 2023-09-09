import { z } from "zod";

const TripStatus = [
  "WAITING_DRIVER",
  "DRIVER_AT_PICKUP",
  "TRIP_IS_GOING",
  "DRIVER_AT_DROP",
  "CANT_FIND_DRIVER",
  "DRIVER_CANCELED",
  "CLIENT_CANCELED",
] as const;


const RideGetQuery = z
  .object({
    rideId: z.string().optional(),
    userId: z.string().optional(),
    driverId: z.string().optional(),
    page: z.coerce.number().default(0),
  })
  .refine(
    (val) => !!val.driverId || !!val.userId || !!val.rideId,
    "At least 1 id is needed"
  );

const RidePostBody = z.object({
  user_id: z.string(),
  price: z.number(),
  payment_type: z.union([
    z.literal("CASH"),
    z.literal("CARD"),
    z.literal("E_WALLET"),
  ]).default("CASH"),
  slon: z.number(),
  slat: z.number(),
  sadr: z.string(),

  elon: z.number(),
  elat: z.number(),
  eadr: z.string()
});

const RidePutBody = z.object({
  rideId: z.string(),

  driver_id: z.string().optional(),
  vehicle_id: z.string().optional(),
  status: z.union([
    z.literal("BOOKED"),
    z.literal("FINDING_DRIVER"),
    ...TripStatus.map(v => z.literal(v))
  ]).default("WAITING_DRIVER"),
});

export { RideGetQuery, RidePostBody, RidePutBody };
