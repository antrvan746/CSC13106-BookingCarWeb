import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import { prismaClient } from "../../../libs/prisma";


const findInfoSchema = z.object({
  driver_id: z.string()
})

interface ErrorResponse{error:string[]}


const handler:NextApiHandler<ErrorResponse> =  async function (req:NextApiRequest,res:NextApiResponse) {
  const body = findInfoSchema.safeParse(req.query);
  if(body.success === false){
    return res.status(400).json({error: body.error.errors.map(v => v.message)})
  }

  const info = await prismaClient.driver.findUnique({
    where:{id:body.data.driver_id}
  });
  if(info == null){
    return res.status(404).json({error: ["Driver id not found"]});
  }

  const vehicle = await prismaClient.vehicle.findFirst({
    where:{driver_id:body.data.driver_id}
  });
  if(vehicle == null){
    return res.status(404).json({error: ["Vehicle not found"]});
  }

  return res.status(200).json({
    ...info,
    vehicle:vehicle
  });
}

export default handler;