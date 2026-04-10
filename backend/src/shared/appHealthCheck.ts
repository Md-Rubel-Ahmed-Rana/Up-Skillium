import { Application, Request, Response } from "express";

export const healthCheckRoute = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.sendFile("index.html");
  });
};
