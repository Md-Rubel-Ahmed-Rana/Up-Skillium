import { JwtPayload } from "jsonwebtoken";
import { GetUser } from "../modules/user/interface";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null | GetUser;
      id: any;
      email: string;
      urls: string[];
      role: string;
    }
  }
}
