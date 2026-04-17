import { NextFunction, Request, Response } from "express";

export const requestContextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = String(req.id);
  const correlationId = req.correlationId || requestId;

  res.setHeader("X-Correlation-Id", correlationId);

  req.log = req.log.child({
    requestId,
    correlationId,
  });

  next();
};
