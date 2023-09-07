import { PrismaClient, user } from "@prisma/client";
import { prismaClient } from "../../../../libs/prisma";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async getUsers(
    skip: number,
    take: number,
  ): Promise<user[]> {
    return this.prisma.user.findMany({
      skip: skip,
      take: take,
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
