import { Application, NextFunction, Request, Response } from "express";
import Bugsnag from "@bugsnag/js";

export const expressRouteNotFound = (app: Application) => {
  const message = "The route user hit was not found";
  return app.use((req: Request, res: Response, next: NextFunction) => {
    Bugsnag.notify(new Error(message), (event) => {
      event.addMetadata("404 not found", {
        statusCode: 404,
        success: false,
        message,
      });
    });
    return res.sendFile("notFound.html", { root: "public" });
  });
};
