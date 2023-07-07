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
  const {userId,driverId,page} = req.query;
  if(typeof userId !== "string" && typeof driverId !== "string"){
    res.status(400).json({error: "Missing id"});
    return;
  }

  if(Array.isArray(page)){
    res.status(400).json({error: "Invalid page"});
    return;
  }

  const pageNum = page ? parseInt(page) : 0;
  const userIdQuery = !(typeof userId === "string") ? {} : {user_id: {equals: userId}};
  const driverIdQuery = !(typeof driverId === "string") ? {} : {driver_id: {equals: driverId}}

  const queryResult = await prismaClient.ride.findMany({
    where:{
      ...userIdQuery,
      ...driverIdQuery
    },
    skip: (isNaN(pageNum) ? 0 : pageNum)*query_limit,
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