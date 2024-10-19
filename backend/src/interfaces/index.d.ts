import { JwtPayload } from "jsonwebtoken";
import { GetUser } from "./user.interface";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null | GetUser;
    }
  }
}
