import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { corsConfig } from "../config/cors";

export const expressMiddlewares = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsConfig));
  app.use(helmet());
  // app.use(apiRateLimiter.limitAPIRequest());
  app.use(cookieParser());
  app.use(morgan("dev"));
};
