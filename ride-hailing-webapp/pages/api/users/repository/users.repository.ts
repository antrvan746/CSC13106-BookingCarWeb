import { PrismaClient, user } from "@prisma/client";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUsers(
    skip: number,
    take: number,
    email?: string,
    phone?: string
  ): Promise<user[]> {
    return this.prisma.user.findMany({
      skip: skip,
      take: take,
      where: {
        phone: phone,
        email: email,
      },
    });
  }

  async getUserById(id: string): Promise<user | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async findExistUser(phone: string): Promise<user | null> {
    return this.prisma.user.findFirst({
      where: {
        phone: phone,
      },
    });
  }

  async createUser(data: {
    email?: string;
    phone: string;
    name: string;
  }): Promise<user> {
    const { email, phone, name } = data;
    return this.prisma.user.create({
      data: {
        email: email || "",
        phone: phone,
        name: name,
      },
    });
  }

  async updateUser(id: string, data: Partial<user>): Promise<user | null> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
