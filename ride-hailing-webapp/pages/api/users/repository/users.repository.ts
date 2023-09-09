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

  async getUsers({ skip, take, phone }: z.infer<typeof UserGetRequest>) {
    if (!!phone) {
      const user = await prismaClient.user.findFirst({
        where:{phone}
      })
      return user ? [user] : [];
    }

    return await prismaClient.user.findMany({
      skip: skip,
      take: take,
    });
  }

  async getUserById({ id }: z.infer<typeof idParamsSchema>) {
    return await prismaClient.user.findFirst({
      where: {
        id,
      },
    });
  }

  async findExistUser({ phone }: z.infer<typeof driverPhoneSchema>) {
    return await prismaClient.user.findFirst({
      where: {
        phone: phone,
      },
    });
  }

  async createUser(data: z.infer<typeof UserCreateRequest>) {
    const { email, phone, name } = data;
    return await prismaClient.user.create({
      data: {
        email: email || "",
        phone: phone,
        name: name,
      },
    });
  }

  async updateUser(data: z.infer<typeof UserPutRequest>) {
    return await prismaClient.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async deleteUser({ id }: z.infer<typeof idParamsSchema>) {
    return await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
