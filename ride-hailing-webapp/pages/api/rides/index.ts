import { NextApiRequest,NextApiResponse,NextApiHandler } from "next";
import {PaymentType, ride} from "@prisma/client"
import { prismaClient } from "../../../libs/prisma";
import { z } from "zod";

interface ErrorRespond{
  error:string
}

interface RideGetRespond{
  data: ride[]
  limit_per_page:number
}

const RideGetQuery = z.object({
  userId: z.string().optional(),
  driverId: z.string().optional(),
  page: z.coerce.number().default(0)
}).refine(val => !!val.driverId || !!val.userId,"At least 1 id is needed");

const RidePostRequestBody = z.object({
  user_id: z.string(),
  driver_id: z.string(),
  vehicle_id: z.string(),
  fee: z.number(),
  payment_type: z.union([
    z.literal("CASH"),
    z.literal("CARD"),
    z.literal("E_WALLET")
  ]),
  start_google_place_id: z.string(),
  end_google_place_id: z.string(),
  book_time: z.coerce.date()
})

const query_limit = 41;

const handler:NextApiHandler = function(req,res){
  if(req.method == "GET"){
    GET(req,res);
    return;
  }
  if(req.method == "POST"){
    POST(req,res);
    return;
  }

}


const GET:NextApiHandler<RideGetRespond | ErrorRespond> = async function(req,res){
  const query = RideGetQuery.safeParse(req.query);
  if(query.success == false){
    res.status(400).json({
      error: query.error.message
    });
    return;
  }

  const userIdQuery = !(query.data.userId) ? {} : {user_id: {equals: query.data.userId}};
  const driverIdQuery = !(query.data.driverId) ? {} : {driver_id: {equals: query.data.driverId}}

  const queryResult = await prismaClient.ride.findMany({
    where:{
      ...userIdQuery,
      ...driverIdQuery
    },
    skip: query.data.page*query_limit,
    take:query_limit
  });

  res.status(200).json({
    data: queryResult,
    limit_per_page: query_limit
  });


}


const POST:NextApiHandler<ErrorRespond> = async function name(req,res) {
  const body = RidePostRequestBody.safeParse(req.body);
  if(!body.success){
    res.status(400).json({
      error: body.error.message
    });
    return;
  }

  await prismaClient.ride.create({
    data:{
      ...body.data,
      status: "BOOKED"
    }
  })
}


export default handler;