import { NextFunction, Request, Response } from "express";

const checkAuthorization = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user || !user.role) {
        console.info(`Unauthorized access attempt by ${user?.name}`);
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRole = user.role;

      if (!roles.includes(userRole)) {
        console.info(
          `Unauthorized access for role: ${userRole} by ${user.name}`
        );
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error("Authorization Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export default checkAuthorization;
