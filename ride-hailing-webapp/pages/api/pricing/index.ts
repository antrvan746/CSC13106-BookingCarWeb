import { PrismaClient, RideStatus, Weather } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();

const GetPricingRequest = z.object({
  vehicle_type: z.string().optional(),
  weather: z.enum(["SUNNY", "RAINNY", "WINDY"]).optional(),
  distance: z.number(),
  estimated_time: z.number(),
});

const PostPricingRequest = z.object({
  weather: z.enum(["SUNNY", "RAINNY", "WINDY"]).optional(),
  x_distance: z.number(),
  x_estimated_time: z.number()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const pricingRequest = GetPricingRequest.parse(req.body);

        let weather;

        switch (pricingRequest.weather) {
          case "RAINNY":
            weather = Weather.RAINY;
            break;
          case "WINDY":
            weather = Weather.WINDY;
            break;
          default:
            weather = Weather.SUNNY;
        }

        const pricingFactor = await prisma.pricing_factor.findUniqueOrThrow({
          where: {
            weather: Weather.SUNNY,
          },
          select: {
            x_distance: true,
            x_estimated_time: true,
            x_4seats: true,
            x_7seats: true,
            x_motorcycle: true,
          },
        });

        const vehicleType = pricingRequest.vehicle_type
          ? pricingRequest.vehicle_type
          : "motorcycle";

        let price =
          pricingRequest.distance * pricingFactor.x_distance +
          pricingRequest.estimated_time * pricingFactor.x_estimated_time;

        switch (vehicleType) {
          case "4seats":
            price *= pricingFactor.x_4seats;
            break;
          case "7seats":
            price *= pricingFactor.x_7seats;
            break;
          default:
            price *= pricingFactor.x_motorcycle;
        }

        res.status(200).json({ price: price });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "POST":
      try {
      } catch (error) {}
      break;
  }
}
