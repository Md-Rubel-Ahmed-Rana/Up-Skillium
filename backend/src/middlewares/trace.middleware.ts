import { Request, Response, NextFunction } from "express";
import { TraceService } from "../lib/trace";

export const traceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.traceId = TraceService.generateAPIRequestTraceId();
  next();
};
