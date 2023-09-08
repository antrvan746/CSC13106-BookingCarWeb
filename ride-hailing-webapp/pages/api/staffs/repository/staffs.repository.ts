import { PrismaClient, staff } from "@prisma/client";
import { prismaClient } from "../../../../libs/prisma";

class StaffRepository {
  // private prisma: PrismaClient;

  constructor() {
    // this.prisma = prismaClient;
  }

  async getAllStaff(skip: number, take: number) {
    return await prismaClient.staff.findMany({
      skip,
      take,
    });
  }

  async getStaffById(id: string) {
    return await prismaClient.staff.findFirst({
      where: {
        id,
      },
    });
  }

  async createStaff(data: { email?: string; name: string; role: "ADMIN" | "EMPLOYEE"; }) {
    const { email, name, role } = data;
    return await prismaClient.staff.create({
      data: {
        email: email || "",
        name,
        role,
      },
    });
  }

  async updateStaff(id: string, data: Partial<staff>): Promise<staff | null> {
    return await prismaClient.staff.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteStaff(id: string) {
    return await prismaClient.staff.delete({
      where: {
        id,
      },
    });
  }
}

export default StaffRepository;
