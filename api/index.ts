import express from "express";
import dotenv from "dotenv";
import { apiRouter } from "../server/apiRoutes";

dotenv.config();

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(apiRouter);

export default app;
