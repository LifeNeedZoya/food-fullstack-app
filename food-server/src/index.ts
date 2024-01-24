import express, { Application, Request, Response } from "express";
import color from "colors";
import cors from "cors";
import { connectDB } from "./config/db";
import UserRoutes from "./routes/user";

import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});
app.use("/auth", UserRoutes);

const MONGO_URL = process.env.MONGO_URL as string;

connectDB(MONGO_URL);

app.listen(8080, () => console.log(color.rainbow("Server is running")));
