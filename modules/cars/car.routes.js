import { Router } from "express";
import {
  addCar,
  deleteCar,
  getAllCars,
  getAvailableCarsByModel,
  getAvailableOrRentedCarsByModel,
  getCarById,
  getCarsByModel,
  getRentedOrSpecificModelCars,
  updateCar,
} from "./car.controller.js";

const carRouter = Router();

carRouter.get("/model", getCarsByModel);
carRouter.get("/available", getAvailableCarsByModel);
carRouter.get("/rented", getRentedOrSpecificModelCars);
carRouter.get("/rented/model", getAvailableOrRentedCarsByModel);

carRouter.get("/", getAllCars);
carRouter.post("/", addCar);
carRouter.get("/:id", getCarById);
carRouter.put("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;
