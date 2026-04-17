import { Request, Response } from "express";
import pinoHttp from "pino-http";
import { randomUUID } from "node:crypto";
import { logger } from "./logger";

export const httpLogger = pinoHttp({
  logger,

  genReqId(req: Request, res: Response) {
    const incomingRequestId = (
      req.headers["x-request-id"] as string | undefined
    )?.trim();

    const requestId = incomingRequestId || randomUUID();

    res.setHeader("X-Request-Id", requestId);

    return requestId;
  },

  customAttributeKeys: {
    req: "request",
    res: "response",
    err: "error",
    responseTime: "durationMs",
  },

  customProps(req: Request, _res: Response) {
    const incomingCorrelationId = (
      req.headers["x-correlation-id"] as string | undefined
    )?.trim();

    const requestId = String(req.id);
    const correlationId = incomingCorrelationId || requestId;

    req.correlationId = correlationId;

    return {
      traceId: req.traceId,
      requestId,
      correlationId,
      method: req.method,
      path: req.originalUrl,
      userId: req?.user?.id || req?.id,
      email:
        req?.user?.email ||
        req?.email ||
        "User email was not set on access token",
      role: req?.user?.role || req?.role || "Role was not set on access token",
    };
  },

  customLogLevel(_req: Request, res: Response, err: unknown) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} completed with ${res.statusCode}`;
  },

  customErrorMessage(req, res, err) {
    return `${req.method} ${req.url} failed with ${res.statusCode}: ${err.message}`;
  },

  serializers: {
    req: () => undefined,
    res: () => undefined,
    err: (err) => ({
      type: err.name,
      message: err.message,
      stack: err.stack,
    }),
  },

  quietReqLogger: true,
});
