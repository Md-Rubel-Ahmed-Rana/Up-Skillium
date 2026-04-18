import { IRoles } from "@/constants/roles";
import { HttpStatusCode } from "@/lib/httpStatus";
import ApiError from "@/shared/apiError";
import { NextFunction, Request, Response } from "express";

const checkAuthorization = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = req?.user?.role || req?.role;

      if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
        if (!allowedRoles.includes(role?.trim()?.toLowerCase() as IRoles)) {
          return next(
            new ApiError(HttpStatusCode.FORBIDDEN, "Forbidden: Access denied"),
          );
        }
      }

      next();
    } catch (error) {
      console.error("Authorization Error:", error);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };
};

export default checkAuthorization;
