import { PrismaClient, user } from "@prisma/client";
import { prismaClient } from "../../../../libs/prisma";
import { z } from "zod";
import { idParamsSchema } from "../../../../types/api/RestApiCommon";
import { UserCreateRequest, UserGetRequest, UserPutRequest } from "../../../../types/api/UserZodSchema";
import { driverPhoneSchema } from "../../../../types/api/DriverZodSchema";

class UserRepository {
  // private prisma: PrismaClient;

  constructor() {
    // this.prisma = prismaClient;
  }

  async getUsers({ skip, take }: z.infer<typeof UserGetRequest>): Promise<user[]> {
    return prismaClient.user.findMany({
      skip: skip,
      take: take,
    });
  }

  async getUserById({ id }: z.infer<typeof idParamsSchema>): Promise<user | null> {
    return prismaClient.user.findFirst({
      where: {
        id,
      },
    });
  }

  async findExistUser({ phone }: z.infer<typeof driverPhoneSchema>): Promise<user | null> {
    return prismaClient.user.findFirst({
      where: {
        phone: phone,
      },
    });
  }

  async createUser(data: z.infer<typeof UserCreateRequest>): Promise<user> {
    const { email, phone, name } = data;
    return prismaClient.user.create({
      data: {
        email: email || "",
        phone: phone,
        name: name,
      },
    });
  }

  async updateUser(data: z.infer<typeof UserPutRequest>): Promise<user | null> {
    return prismaClient.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async deleteUser({ id }: z.infer<typeof idParamsSchema>): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
