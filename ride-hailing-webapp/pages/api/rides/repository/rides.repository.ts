import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../../../libs/prisma";
import { z } from "zod";
import { RideGetQuery, RidePostBody, RidePutBody } from "../../../../types/api/RideZodSchema";

class RideRepository {
  // private prisma: PrismaClient
  constructor() {
    // this.prisma = prismaClient;
  }

  async getRideById(id: string) {
    return await prismaClient.ride.findUnique({ where: { id } });
  }

  async updateRide(id: string, data: z.infer<typeof RidePutBody>) {
    const result = await prismaClient.ride.update({
      where: { id },
      data: { ...data },
    });
    return result;
  }

  async getRides(query: z.infer<typeof RideGetQuery>, query_limit: number) {
    const userIdQuery = !query.userId ? {} : { user_id: query.userId };
    const driverIdQuery = !query.driverId
      ? {}
      : { driver_id: query.driverId };

    const queryResult = await prismaClient.ride.findMany({
      where: {
        ...userIdQuery,
        ...driverIdQuery,
      },
      skip: query.page * query_limit,
      take: query_limit,
    });

    return queryResult;
  }

  async createRide(data: z.infer<typeof RidePostBody>) {
    const result = await prismaClient.ride.create({
      data: {
        ...data,
        status: "BOOKED",
      },
    });
    return result;
  }
}

export default RideRepository;