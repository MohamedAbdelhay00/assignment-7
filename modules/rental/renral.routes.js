import { Router } from "express";
import {
  createRental,
  updateRental,
  deleteRental,
  getAllRentals,
  getRentalById,
} from "./rental.controller.js";

const rentalRouter = Router();

rentalRouter.post("/", createRental);
rentalRouter.patch("/:id", updateRental);
rentalRouter.delete("/:id", deleteRental);
rentalRouter.get("/", getAllRentals);
rentalRouter.get("/:id", getRentalById);

export default rentalRouter;
