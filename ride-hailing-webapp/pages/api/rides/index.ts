import { NextApiHandler } from "next";
import { ride } from "@prisma/client";
import { prismaClient } from "../../../libs/prisma";
import { z } from "zod";
import {
  RideGetQuery,
  RidePostBody,
  RidePutBody,
} from "../../../types/api/rides/RideZodSchema";

interface ErrorRespone {
  error: string;
}

interface RidesGetRespone {
  data: ride[];
  limit_per_page: number;
}

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
  if (req.method == "PUT") {
    PUT(req, res);
    return;
  }
  if (req.method == "DELETE") {
    DELETE(req, res);
    return;
  }

  res.status(405).json({ error: "Invalid method" });
};

const GET: NextApiHandler<RidesGetRespone | ErrorRespone> = async function (
  req,
  res
) {
  const query = RideGetQuery.safeParse(req.query);
  if (query.success == false) {
    res.status(400).json({
      error: query.error.name,
    });
    return;
  }

  const userIdQuery = !query.data.userId ? {} : { user_id: query.data.userId };
  const driverIdQuery = !query.data.driverId
    ? {}
    : { driver_id: query.data.driverId };

  try {
    const queryResult = await prismaClient.ride.findMany({
      where: {
        ...userIdQuery,
        ...driverIdQuery,
      },
      skip: query.data.page * query_limit,
      take: query_limit,
    });

    res.status(200).json({
      data: queryResult,
      limit_per_page: query_limit,
    });
    return;
  } catch (e: any) {
    res.status(500).json({ error: "Query error" });
  }
};

const POST: NextApiHandler<ErrorRespone | { data: ride }> = async function name(
  req,
  res
) {
  const body = RidePostBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({
      error: body.error.message,
    });
    return;
  }

  try {
    const result = await prismaClient.ride.create({
      data: {
        ...body.data,
        status: "BOOKED",
      },
    });
    res.status(201).json({ data: result });
    return;
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "some error occured" });
  }
};

const PUT: NextApiHandler<ErrorRespone | { data: ride }> = async function name(
  req,
  res
) {
  const body = RidePutBody.safeParse(req.body);
  if (!body.success) {
    res.json({ error: body.error.message });
    return;
  }

  try {
    const result = await prismaClient.ride.update({
      where: { id: body.data.rideId },
      data: {
        ...body.data,
      },
    });
    res.status(200).json({ data: result });
    return;
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Some error" });
  }
};

const DELETE: NextApiHandler<ErrorRespone | { data: ride }> = async function (
  req,
  res
) {
  const body = RidePutBody.safeParse(req.body);
  if (!body.success) {
    res.json({ error: body.error.message });
    return;
  }
  try {
    const result = await prismaClient.ride.delete({
      where: { id: body.data.rideId },
    });
    res.status(200).json({ data: result });
    return;
  } catch (e: any) {
    res.status(500).json({ error: e.message || "some error occured" });
  }
};

export default handler;
