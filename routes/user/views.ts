import express from "express";
import { createUser, deleteUser, getUsers, updateUser } from "./controllers";

const route = express.Router();

route.get("/", getUsers);
route.post("/", createUser);
route.patch("/:id", updateUser);
route.delete("/:id", deleteUser);
export default route;
