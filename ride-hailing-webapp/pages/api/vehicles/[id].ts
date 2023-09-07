import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import VehicleRepository from "./repository/vehicles.repository";

const vehicleRepository = new VehicleRepository();

const vehicleSchema = z.object({
  driver_id: z.string().uuid().optional(),
  plate_number: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  type: z.string().optional(),
});

const driverIdSchema = z.string().uuid();
const vehicleIdSchema = z.string().uuid();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const driverId = req.query.id;
        const vehicleId = driverIdSchema.parse(driverId);
        const vehicle = await vehicleRepository.findVehicleById(vehicleId);

        if (!vehicle) {
          return res.status(404).json({ error: "Vehicle not found" });
        }

        res.status(200).json(vehicle);
      } catch (message) {
        res.status(500).json({ error: "Failed to get Vehicle:", message });
      }
      break;

      case "PUT":
        try {
          const updatedData = vehicleSchema.parse(req.body);
          const driverId = req.query.id; 
          const id = driverIdSchema.parse(driverId)
          const vehicle = await vehicleRepository.findVehicleByDriverId(id);
      
          if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
          }
      
          const updatedVehicle = await vehicleRepository.updateVehicle(
            vehicle.id, 
            updatedData
          );
      
          res.status(200).json(updatedVehicle);
        } catch (error) {
          console.error(error);
          res.status(400).json({ error: "Invalid request payload" });
        }
        break;

    case "DELETE":
      try {
        const vehicleId = req.query.id;
        const id = vehicleIdSchema.parse(vehicleId);
        await vehicleRepository.deleteVehicle(id);
        res.status(200).json({ message: "Vehicle deleted successfully" });
      } catch (message) {
        res.status(500).json({ error: message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}
