import { Application, NextFunction, Request, Response } from "express";

export const expressRouteNotFound = (app: Application) => {
  return app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });
};
