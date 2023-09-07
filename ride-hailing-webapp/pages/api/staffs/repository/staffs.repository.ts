import { PrismaClient, staff } from "@prisma/client";

class StaffRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllStaff(skip: number, take: number): Promise<staff[]> {
    return this.prisma.staff.findMany({
      skip,
      take,
    });
  }

  async getStaffById(id: string): Promise<staff | null> {
    return this.prisma.staff.findFirst({
      where: {
        id,
      },
    });
  }

  async createStaff(data: {
    email?: string;
    name: string;
    role: "ADMIN" | "EMPLOYEE";
  }): Promise<staff> {
    const { email, name, role } = data;
    return this.prisma.staff.create({
      data: {
        email: email || "",
        name,
        role,
      },
    });
  }

  async updateStaff(id: string, data: Partial<staff>): Promise<staff | null> {
    return this.prisma.staff.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteStaff(id: string): Promise<void> {
    await this.prisma.staff.delete({
      where: {
        id,
      },
    });
  }
}

export default StaffRepository;
