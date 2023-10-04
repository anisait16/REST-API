import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import mongoose from "mongoose";

import router from "./router";

dotenv.config();

const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

const PORT = process.env.PORT || 3000;
const MONGO_URL = (process.env.MONGO_URL) as string;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on("error", (error: Error) => console.log(error));