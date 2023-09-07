import { NextApiHandler } from "next";
import { ride } from "@prisma/client"
import { prismaClient } from "../../../libs/prisma";
import { z } from "zod";
import { RatingGetQuery, RatingPostBody } from "../../../types/api/RatingZodSchema";

const query_limit = 41;

const handler: NextApiHandler = async function (req, res) {
  if(req.method == "GET"){
    //GET(req,res);
    //return;
  }

  res.status(405).json({ error: "Invalid method" });
}


// const GET: NextApiHandler = async function (req, res) {
//   const query = RatingGetQuery.safeParse(req.query);
//   if (!query.success) {
//     res.status(400).json({ error: query.error.errors.map(e => e.message) });
//     return;
//   }

//   const idQuery = !query.data.rateId ? {} : { id: query.data.rateId };
//   const rideQuery = (!query.data.userId && !query.data.driverId) ? {} : {
//     ride: {
//       ...(!query.data.driverId ? {} : { driver_id: query.data.driverId }),
//       ...(!query.data.userId ? {} : { user_id: query.data.userId })
//     }
//   }

//   try {
//     const result = await prismaClient.rating.findMany({
//       where: {
//         ...idQuery,
//         ...rideQuery
//       },
//       skip: query.data.page * query_limit,
//       take: query_limit
//     });
//     res.status(200).json({
//       data: result,
//       limit_per_page: query_limit
//     });
//     return;
//   } catch (e:any) {
//     res.status(500).json({error: e.message || "Some error occured"});
//   }


// }


// const POST:NextApiHandler = async function (req,res) {
//   const body = RatingPostBody.safeParse(req.body);
//   if(!body.success){
//     res.status(400).json({error: body.error.errors.map(e => e.message)});
//     return;
//   }

//   try {
//     const result = await prismaClient.rating.create({
//       data:{...body.data}
//     });

    
//   } catch (e) {
    
//   }

// }

export default handler;