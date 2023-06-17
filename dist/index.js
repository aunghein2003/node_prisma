"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.all("*", (req, res) => {
    res.status(404).json({ success: false, msg: "Page not found" });
});
app.listen(process.env.PORT, () => console.log(`Server listens on PORT 5000`));
