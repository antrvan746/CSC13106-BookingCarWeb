import { NextApiRequest,NextApiResponse,NextApiHandler } from "next";
import {ride} from "@prisma/client"
import { prismaClient } from "../../../libs/prisma";

interface ErrorRespond{
  error:string
}

interface RideGetRespond{
  data: ride[]
  limit_per_page:number
}

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


const POST:NextApiHandler = async function name(req,res) {
  
}


export default handler;