import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { PaymentType, ride } from "@prisma/client"
import { prismaClient } from "../../../libs/prisma";
import { z } from "zod";

interface ErrorRespond {
  error: string
}

interface RideGetRespond {
  data: ride[]
  limit_per_page: number
}

const RideGetQuery = z.object({
  userId: z.string().optional(),
  driverId: z.string().optional(),
  page: z.coerce.number().default(0)
}).refine(val => !!val.driverId || !!val.userId, "At least 1 id is needed");

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
});

const RidePutRequestBody = z.object({
  rideId: z.string(),
  fee: z.number().optional(),
  start_place_name: z.string().optional(),
  end_place_name: z.string().optional(),
  arrive_time: z.coerce.date().optional(),
  status: z.union([
    z.literal("BOOKED"),
    z.literal("CANCELED"),
    z.literal("FINISED")
  ]).optional()
});


const query_limit = 41;

const handler: NextApiHandler = function (req, res) {
  if (req.method == "GET") {
    GET(req, res);
    return;
  }
  if (req.method == "POST") {
    POST(req, res);
    return;
  }
  if(req.method == "PUT"){
    PUT(req,res);
    return;
  }
  if(req.method == "DELETE"){
    DELETE(req,res);
    return;
  }

}


const GET: NextApiHandler<RideGetRespond | ErrorRespond> = async function (req, res) {
  const query = RideGetQuery.safeParse(req.query);
  if (query.success == false) {
    res.status(400).json({
      error: query.error.message
    });
    return;
  }

  const userIdQuery = !(query.data.userId) ? {} : { user_id: { equals: query.data.userId } };
  const driverIdQuery = !(query.data.driverId) ? {} : { driver_id: { equals: query.data.driverId } }

  const queryResult = await prismaClient.ride.findMany({
    where: {
      ...userIdQuery,
      ...driverIdQuery
    },
    skip: query.data.page * query_limit,
    take: query_limit
  });

  res.status(200).json({
    data: queryResult,
    limit_per_page: query_limit
  });


}


const POST: NextApiHandler<ErrorRespond | { data: ride }> = async function name(req, res) {
  const body = RidePostRequestBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({
      error: body.error.message
    });
    return;
  }

  try {
    const result = await prismaClient.ride.create({
      data: {
        ...body.data,
        status: "BOOKED"
      }
    });
    res.json({ data: result });
    return
  } catch (e: any) {
    return res.json({ error: e.message || "some error occured" });
  }

}


const PUT: NextApiHandler<ErrorRespond | { data: ride }> = async function name(req, res) {
  const body = RidePutRequestBody.safeParse(req.body);
  if(!body.success){
    res.json({error: body.error.message});
    return;
  }

  try{
    const result = await prismaClient.ride.update({
      where:{id: body.data.rideId},
      data:{
        ...body.data
      }
    });
    res.json({data:result});
    return;
  }catch(e:any){
    res.json({error: e.message || "Some error"})
  }
  
}

const DELETE: NextApiHandler<ErrorRespond | { data: ride }> = async function (req,res) {
  const body = RidePutRequestBody.safeParse(req.body);
  if(!body.success){
    res.json({error: body.error.message});
    return;
  }
  try {
    const result = await prismaClient.ride.delete({
      where:{id:body.data.rideId}
    });
    res.json({data:result});
    return;
  } catch (e:any) {
    res.json({error: e.message || "some error occured"})
  }
}

export default handler;