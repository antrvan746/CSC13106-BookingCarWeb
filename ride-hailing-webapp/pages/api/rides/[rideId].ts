import { NextApiHandler } from "next";
import { ride } from "@prisma/client"
import { prismaClient } from "../../../libs/prisma";
import { z } from "zod";
import { RideGetQuery, RidePutRequestBody } from "../../../types/api/rides/RideZodSchema";

export const config = {
  api: {
    externalResolver: true,
  },
}

async function getRide(id:string):Promise<ride | null>{
  try{
    const ride = await prismaClient.ride.findFirst({
      where:{id:id}
    });
    return ride;
  }catch(e){
    return null;
  }
  
}

const handler: NextApiHandler = async function (req, res) {
  if(req.method == "GET"){
    GET(req,res);
    return;
  }
  if(req.method == "PUT"){
    PUT(req,res);
    return;
  }
}

const GET:NextApiHandler = async function(req,res){
  const query = RideGetQuery.safeParse(req.query);
  if(!query.success || !query.data.rideId){
    res.status(404).json({error: "Invalid ride id"});
    return;
  }
  const ride = await getRide(query.data.rideId);
  if(!ride){
    res.status(404).json({error: "Ride not found"});
    return;
  }
  res.status(200).json({data:ride});
}

const PUT:NextApiHandler = async function (req,res) {
  const query = RideGetQuery.safeParse(req.query);
  if(!query.success || !query.data.rideId){
    res.status(404).json({error: "Invalid ride id"});
    return;
  }

  const body = RidePutRequestBody.safeParse({...req.body,rideId:query.data.rideId});
  if(!body.success){
    res.status(404).json({error: body.error.message});
    return;
  }

  try {
    const result = await prismaClient.ride.update({
      where: {id: body.data.rideId},
      data:{...body.data}
    })
    res.status(200).json({data:result});
    return;
  } catch (e:any) {
    res.status(500).json({error: e.message || "Query error"});
  }

}

export default handler;
