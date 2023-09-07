import { PrismaClient, vehicle } from "@prisma/client";

class VehicleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllVehicles(): Promise<vehicle[]> {
    return this.prisma.vehicle.findMany();
  }

  async createVehicle(data: {
    driver_id: string;
    plate_number: string;
    model: string;
    color?: string;
    type: string;
  }): Promise<vehicle> {
    const { driver_id, plate_number, model, color, type } = data;
    return this.prisma.vehicle.create({
      data: {
        driver_id: driver_id || "", 
        plate_number: plate_number || "",
        model: model || "",
        color: color || null, 
        type: type,
      },
    });
  }

  async findVehicleById(id: string): Promise<vehicle | null> {
    return this.prisma.vehicle.findFirstOrThrow({
      where: {
        driver_id: id,
      },
    });
  }

  async findVehicleByDriverId(driverId: string): Promise<vehicle | null> {
    return this.prisma.vehicle.findFirst({
      where: {
        driver_id: driverId,
      },
    });
  }

  async updateVehicle(id: string, data: Partial<vehicle>): Promise<vehicle | null> {
    return this.prisma.vehicle.update({
      where: { id },
      data,
    });
  }

  async deleteVehicle(id: string): Promise<void> {
    await this.prisma.vehicle.delete({
      where: { id },
    });
  }
}

export default VehicleRepository;