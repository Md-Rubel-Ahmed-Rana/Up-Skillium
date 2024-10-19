import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";

const checkAuthorization = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user || !user.role) {
        logger.info(`Unauthorized access attempt by ${user?.name}`);
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRole = user.role;

      if (!roles.includes(userRole)) {
        logger.info(
          `Unauthorized access for role: ${userRole} by ${user.name}`
        );
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      logger.error("Authorization Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export default checkAuthorization;
