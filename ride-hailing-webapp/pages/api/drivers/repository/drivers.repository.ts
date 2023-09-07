import { PrismaClient, driver } from "@prisma/client";
import { prismaClient } from "../../../../libs/prisma";

class DriverRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async getAllDrivers(): Promise<driver[]> {
    return this.prisma.driver.findMany();
  }

  async createDriver(data: {
    phone: string;
    email?: string;
    name: string;
    // rating?: number; // Include the rating field
  }): Promise<driver> {
    // , rating
    const { phone, email, name } = data;
    return this.prisma.driver.create({
      data: {
        phone: phone,
        email: email || "", // email field is optional, default to an empty string
        name: name,
        // rating: rating || 5, // Set default rating to 5 if not provided
      },
    });
  }
  

  async findById(id: string): Promise<driver | null> {
    return this.prisma.driver.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByPhone(phone: string): Promise<driver | null> {
    return this.prisma.driver.findFirst({
      where: {
        phone: phone,
      },
    });
  }

  async updateDriver(id: string, data: Partial<driver>): Promise<driver | null> {
    return this.prisma.driver.update({
      where: { id },
      data,
    });
  }

  async deleteDriver(id: string): Promise<void> {
    await this.prisma.driver.delete({
      where: { id },
    });
  }
}

export default DriverRepository;