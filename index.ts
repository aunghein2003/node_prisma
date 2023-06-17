import express, { Express } from "express";
import dotenv from "dotenv";
import route from "./routes";

const app: Express = express();
dotenv.config();

app.use(express.json());

app.use("/api", route);

app.all("*", (req, res) => {
  res.status(404).json({ success: false, msg: "Page not found" });
});

app.listen(process.env.PORT, () => console.log(`Server listens on PORT 5000`));
