import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./routes/user.routes.js";

import { globalErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use(globalErrorHandler);

export { app };
