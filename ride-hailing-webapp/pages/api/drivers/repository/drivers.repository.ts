import { PrismaClient, driver } from "@prisma/client";
import { prismaClient } from "../../../../libs/prisma";
import { z } from "zod";
import { driverPhoneSchema, driverPostSchema, driverPutSchema } from "../../../../types/api/DriverZodSchema";
import { idParamsSchema } from "../../../../types/api/RestApiCommon";

class DriverRepository {

  constructor() {
  }

  async getAllDrivers(): Promise<driver[]> {
    return await prismaClient.driver.findMany();
  }

  async createDriver(data: z.infer<typeof driverPostSchema>) {
    return await prismaClient.driver.create({
      data
    });
  }


  async findById({ id }: z.infer<typeof idParamsSchema>) {
    return await prismaClient.driver.findUnique({
      where: {
        id,
      },
    });
  }

  async findByPhone({ phone }: z.infer<typeof driverPhoneSchema>) {
    return await prismaClient.driver.findFirst({
      where: {
        phone: { contains: phone },
      },
    });
  }

  async updateDriver(data: z.infer<typeof driverPutSchema>) {
    return await prismaClient.driver.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteDriver({ id }: z.infer<typeof idParamsSchema>) {
    return await prismaClient.driver.delete({
      where: { id },
    });
  }
}

export default DriverRepository;