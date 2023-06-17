"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const route = express_1.default.Router();
route.get("/", controllers_1.getUsers);
route.post("/", controllers_1.createUser);
route.patch("/:id", controllers_1.updateUser);
route.delete("/:id", controllers_1.deleteUser);
exports.default = route;
