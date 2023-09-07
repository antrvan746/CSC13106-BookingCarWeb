import { NextApiHandler } from "next";
import { ride } from "@prisma/client";
import { prismaClient } from "../../../libs/prisma";
import { z } from "zod";
import {
  RideGetQuery,
  RidePutBody,
} from "../../../types/api/rides/RideZodSchema";
import RideRepository from "./repository/rides.repository";

export const config = {
  api: {
    externalResolver: true,
  },
};

const rideRepository = new RideRepository();

const handler: NextApiHandler = async function (req, res) {
  if (req.method == "GET") {
    GET(req, res);
    return;
  }
  if (req.method == "PUT") {
    PUT(req, res);
    return;
  }
};

const GET: NextApiHandler = async function (req, res) {
  const query = RideGetQuery.safeParse(req.query);
  if (!query.success || !query.data.rideId) {
    res.status(404).json({ error: "Invalid ride id" });
    return;
  }
  const ride = await rideRepository.getRideById(query.data.rideId);
  if (!ride) {
    res.status(404).json({ error: "Ride not found" });
    return;
  }
  res.status(200).json({ data: ride });
};

const PUT: NextApiHandler = async function (req, res) {
  const query = RideGetQuery.safeParse(req.query);
  if (!query.success || !query.data.rideId) {
    res.status(404).json({ error: "Invalid ride id" });
    return;
  }

  const body = RidePutBody.safeParse({
    ...req.body,
    rideId: query.data.rideId,
  });
  if (!body.success) {
    res.status(404).json({ error: body.error.message });
    return;
  }

  try {
    const newRide = rideRepository.updateRide(query.data.rideId,body.data);
    res.status(200).json({ data: newRide  });
    return;
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Query error" });
  }
};

export default handler;
