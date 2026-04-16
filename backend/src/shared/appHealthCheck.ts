import { HttpStatusCode } from "@/lib/httpStatus";
import { Application, Request, Response } from "express";

export const healthCheckRoute = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      success: true,
      traceId: req.traceId || null,
      message: "Up Skillium application is up and running",
      data: {
        uptime: `${process.uptime().toFixed(2)} seconds`,
        timestamp: new Date().toLocaleString(),
      },
    });
  });
};
