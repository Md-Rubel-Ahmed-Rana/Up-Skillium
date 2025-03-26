import { Application, NextFunction, Request, Response } from "express";

export const expressRouteNotFound = (app: Application) => {
  return app.use((req: Request, res: Response, next: NextFunction) => {
    return res.sendFile("notFound.html", { root: "public" });
  });
};
