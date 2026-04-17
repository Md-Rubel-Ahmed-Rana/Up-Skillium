import { JwtPayload } from "jsonwebtoken";
import type { Logger } from "pino";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | null | GetUser;
      id?: string;
      email?: string;
      role?: string;
      files?: {
        [fieldname: string]: Express.Multer.File[];
        image?: Express.Multer.File[];
        introductoryVideo?: Express.Multer.File[];
      };
      traceId: string | undefined;
      correlationId: string | undefined;
    }
    interface Response {
      log: Logger;
    }
  }
}
