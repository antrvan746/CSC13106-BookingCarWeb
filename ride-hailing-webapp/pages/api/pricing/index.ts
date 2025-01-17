import { PrismaClient, RideStatus, Weather } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();

const VehicleType = z.string().optional();
const WeatherType = z.enum(["SUNNY", "RAINNY", "WINDY"]).optional();
const DistanceType = z.number();
const EstimatedTimeType = z.number();

const PostPricingRequest = z.object({
  weather: z.enum(["SUNNY", "RAINNY", "WINDY"]).optional(),
  x_distance: z.number(),
  x_estimated_time: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        let distance;
        let estimatedTime;

        if (
          typeof req.query.distance == "string" &&
          typeof req.query.estimated_time == "string"
        ) {
          distance = DistanceType.parse(parseFloat(req.query.distance));
          estimatedTime = EstimatedTimeType.parse(
            parseInt(req.query.estimated_time)
          );
        } else {
          throw new Error("Error type of query");
        }

        let weather;

        switch (req.query.weather) {
          case "RAINY":
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
            weather: weather,
          },
          select: {
            x_distance: true,
            x_estimated_time: true,
            x_4seats: true,
            x_7seats: true,
            x_motorcycle: true,
          },
        });

        const vehicleType = req.query.vehicle_type
          ? req.query.vehicle_type
          : "motorcycle";

        // Distance : KM
        // Estimated_time: s

        let price =
          distance * pricingFactor.x_distance +
          estimatedTime * pricingFactor.x_estimated_time;

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
