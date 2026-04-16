import { TraceService } from "@/lib/trace";
import { Request, Response, NextFunction } from "express";

export const traceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.traceId = TraceService.generateAPIRequestTraceId();
  next();
};
