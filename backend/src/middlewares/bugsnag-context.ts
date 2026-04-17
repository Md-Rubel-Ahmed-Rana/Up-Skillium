import { BugsnagConfig } from "@/config/bugsnag";
import { NextFunction, Request, Response } from "express";

export const bugsnagContextMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const requestId = String(req.id);
  const correlationId = req.correlationId || requestId;

  BugsnagConfig.addMetadata("requestContext", {
    requestId,
    correlationId,
    method: req.method,
    path: req.originalUrl,
  });

  if (req.user) {
    BugsnagConfig.setUser(
      String(req.user.id),
      req.user.email || undefined,
      req.user.name || undefined,
    );

    BugsnagConfig.addMetadata("auth", {
      userId: req?.user?.id || req?.id,
      email: req?.user?.email || req?.email,
      role: req?.user?.role || req?.role || "Role was not set on access token",
    });
  }

  next();
};
