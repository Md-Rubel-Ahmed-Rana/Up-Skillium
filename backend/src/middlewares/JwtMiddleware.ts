import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { GetUser, UserProjection } from "../interfaces/user.interface";
import { config } from "../config/envConfig";

class Jwt {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token missing" });
      }

      const decoded = jwt.verify(
        token,
        config.jwt.accessTokenSecret
      ) as JwtPayload;
      if (!decoded.userId || typeof decoded.userId !== "string") {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = (await User.findById(decoded.userId).select(
        UserProjection
      )) as GetUser;
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({ message: "Token expired" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}

export const JwtMiddleware = new Jwt();
