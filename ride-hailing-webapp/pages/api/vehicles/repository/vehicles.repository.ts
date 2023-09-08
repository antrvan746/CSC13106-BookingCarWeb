import { PrismaClient, vehicle } from "@prisma/client";
import { prismaClient } from "../../../../libs/prisma";

class VehicleRepository {
  // private prisma: PrismaClient;

  constructor() {
    // this.prisma = prismaClient;
  }

  async getAllVehicles(): Promise<vehicle[]> {
    return prismaClient.vehicle.findMany();
  }

  async createVehicle(data: {
    driver_id: string;
    plate_number: string;
    model: string;
    color?: string;
    type: string;
  }): Promise<vehicle> {
    const { driver_id, plate_number, model, color, type } = data;
    return await prismaClient.vehicle.create({
      data: {
        driver_id: driver_id || "",
        plate_number: plate_number || "",
        model: model || "",
        color: color || null,
        type: type,
      },
    });
  }

  async findVehicleById(id: string) {
    return await prismaClient.vehicle.findFirstOrThrow({
      where: {
        driver_id: id,
      },
    });
  }

  async findVehicleByDriverId(driverId: string) {
    return await prismaClient.vehicle.findFirst({
      where: {
        driver_id: driverId,
      },
    });
  }

  async updateVehicle(id: string, data: Partial<vehicle>) {
    return await prismaClient.vehicle.update({
      where: { id },
      data,
    });
  }

  async deleteVehicle(id: string) {
    return await prismaClient.vehicle.delete({
      where: { id },
    });
  }
}

export default VehicleRepository;