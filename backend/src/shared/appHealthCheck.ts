import { Application, Request, Response } from "express";

export const healthCheckRoute = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Up Skillium server is up and running",
      data: null,
    });
  });
};
