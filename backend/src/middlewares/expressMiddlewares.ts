import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiRateLimiter from "../config/apiRateLimiter";
import cookieParser from "cookie-parser";

export const expressMiddlewares = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(apiRateLimiter.limitAPIRequest());
  app.use(cookieParser());

  app.use(morgan("dev"));
};
