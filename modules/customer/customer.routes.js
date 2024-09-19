import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, signin, signup, updateUser } from "./customer.controller.js";

const customerRouter = Router();

customerRouter.post("/signup", signup);
customerRouter.post("/signin", signin);
customerRouter.get("/:id", getUserById).put("/:id", updateUser).delete("/:id", deleteUser);
customerRouter.get("/", getAllUsers);

export default customerRouter;