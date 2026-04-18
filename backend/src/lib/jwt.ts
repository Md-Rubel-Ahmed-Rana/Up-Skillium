import ApiError from "@/shared/apiError";
import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { HttpStatusCode } from "./httpStatus";
import config from "@/config/envConfig";
import { cookieManager } from "@/shared/cookies";
import { IJwtPayload } from "@/interfaces/common";
import { IRoles } from "@/constants/roles";

class JWT {
  private readonly unauthorizedMessage =
    "Unauthenticated access. Please login to access resource(s)";
  private signToken = async (
    payload: IJwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> => {
    return jwt.sign(payload, secret, { expiresIn });
  };

  public generateAccessToken = async (
    payload: IJwtPayload,
  ): Promise<string> => {
    return this.signToken(
      payload,
      config.jwt.accessTokenSecret,
      config.jwt.accessTokenExpire,
    );
  };

  public generateRefreshToken = async (
    payload: IJwtPayload,
  ): Promise<string> => {
    return this.signToken(
      payload,
      config.jwt.refreshTokenSecret,
      config.jwt.refreshTokenExpire,
    );
  };

  authenticate(allowedRoles?: IRoles[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { access_token, refresh_token } = this.extractTokens(req, "cookie");

      if (!access_token && !refresh_token) {
        return next(
          new ApiError(HttpStatusCode.UNAUTHORIZED, this.unauthorizedMessage),
        );
      }

      try {
        if (!access_token) {
          return next(
            new ApiError(HttpStatusCode.UNAUTHORIZED, this.unauthorizedMessage),
          );
        }
        const payload = jwt.verify(
          access_token,
          config.jwt.accessTokenSecret,
        ) as unknown as IJwtPayload;

        console.log({ payload });

        if (!payload?.id) {
          return next(
            new ApiError(
              HttpStatusCode.UNAUTHORIZED,
              "Invalid authentication token",
            ),
          );
        }

        if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
          if (
            !allowedRoles.includes(
              payload?.role?.trim()?.toLowerCase() as IRoles,
            )
          ) {
            return next(
              new ApiError(
                HttpStatusCode.FORBIDDEN,
                "Forbidden: Access denied",
              ),
            );
          }
        }

        req.user = payload;
        next();
      } catch (error: any) {
        if (error instanceof TokenExpiredError) {
          if (!refresh_token) {
            return next(
              new ApiError(
                HttpStatusCode.UNAUTHORIZED,
                this.unauthorizedMessage,
              ),
            );
          }
          return this.handleExpiredAccessToken(refresh_token, req, res, next);
        }

        if (error?.statusCode === HttpStatusCode.FORBIDDEN) {
          return next(
            new ApiError(HttpStatusCode.FORBIDDEN, "Forbidden: Access denied"),
          );
        }
        return next(
          new ApiError(HttpStatusCode.UNAUTHORIZED, this.unauthorizedMessage),
        );
      }
    };
  }

  private extractTokens(
    req: Request,
    sourceType: "cookie" | "header",
  ): {
    access_token: string | undefined;
    refresh_token: string | undefined;
  } {
    let access_token = undefined;
    let refresh_token = undefined;

    if (sourceType === "cookie") {
      access_token = req.cookies[config.jwt.accessCookieName] || undefined;
      refresh_token = req.cookies[config.jwt.refreshCookieName] || undefined;
    } else if (sourceType === "header") {
      access_token = req.headers["authorization"] || undefined;
      refresh_token = req.headers["x-refresh-token"] || undefined;
    }

    console.log({ sourceType, access_token, refresh_token });

    // check if access_token starts with 'Bearer '
    if (access_token && access_token.startsWith("Bearer ")) {
      access_token = access_token.split(" ")[1];
    }

    if (refresh_token && refresh_token.startsWith("Bearer ")) {
      refresh_token = refresh_token.split(" ")[1];
    }

    return { access_token, refresh_token };
  }

  public verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const accessToken = req?.cookies?.upSkilliumAccessToken;
    const refreshToken = req?.cookies?.upSkilliumRefreshToken;

    if (!accessToken || !refreshToken) {
      return next(
        new ApiError(HttpStatusCode.UNAUTHORIZED, this.unauthorizedMessage),
      );
    }

    try {
      const user = jwt.verify(accessToken, config.jwt.accessTokenSecret) as {
        id: string;
        email: string;
      };
      req.user = user;
      req.id = user.id;
      req.email = user.email;
      return next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return this.handleExpiredAccessToken(refreshToken, req, res, next);
      }

      return next(
        new ApiError(HttpStatusCode.UNAUTHORIZED, this.unauthorizedMessage),
      );
    }
  };

  public verifyAuthTokenForPublicRoute = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const accessToken = req?.cookies?.upSkilliumAccessToken;
    const refreshToken = req?.cookies?.upSkilliumRefreshToken;

    if (!accessToken || !refreshToken) {
      return next();
    }

    try {
      const user = jwt.verify(accessToken, config.jwt.accessTokenSecret) as {
        id: string;
        email: string;
      };
      console.log({
        from: "[PUBLIC AUTH] Public auth middleware",
        user,
      });
      req.user = user;
      req.id = user.id;
      req.email = user.email;
      return next();
    } catch (error) {
      return next();
    }
  };

  private handleExpiredAccessToken = async (
    refreshToken: string,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = jwt.verify(
        refreshToken,
        config.jwt.refreshTokenSecret,
      ) as IJwtPayload;

      const payload = {
        id: result.id,
        email: result.email,
        role: result?.role,
      };
      const newAccessToken = await this.generateAccessToken(payload);
      const newRefreshToken = await this.generateRefreshToken(payload);
      cookieManager.setTokens(res, newAccessToken, newRefreshToken);

      req.user = payload;
      req.id = payload.id;
      req.email = payload.email;
      return next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return this.logoutUser(res);
      }

      return next(
        new ApiError(HttpStatusCode.UNAUTHORIZED, this.unauthorizedMessage),
      );
    }
  };

  private logoutUser = (res: Response) => {
    cookieManager.clearTokens(res);
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "You have logged out",
      data: null,
    });
  };

  public async generatePasswordResetToken(
    id: string,
    email: string,
    role: string,
  ): Promise<string> {
    const token = await this.signToken(
      { id, email, role },
      config.jwt.accessTokenSecret,
      "10m",
    );

    return token;
  }

  public verifyResetPasswordToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const resetToken = req?.query.token as string;

    if (!resetToken) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Reset token is required.",
      });
    }

    try {
      const decoded = jwt.verify(resetToken, config.jwt.accessTokenSecret) as {
        id: string;
        email: string;
        exp: number;
      };

      if (Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({
          statusCode: 401,
          success: false,
          message:
            "The reset link has expired. Please request a new password reset link.",
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message:
          "Invalid or expired reset token. Please request a new password reset link.",
      });
    }
  };
}

export const JwtInstance = new JWT();
