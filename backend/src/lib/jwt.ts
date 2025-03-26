import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Types } from "mongoose";
import config from "../config/envConfig";
import { cookieManager } from "../shared/cookies";
import { UserService } from "../modules/user/service";

class JWT {
  private signToken = async (
    payload: { id: Types.ObjectId | string; email: string },
    secret: string,
    expiresIn: number | string
  ): Promise<string> => {
    return jwt.sign(payload, secret, { expiresIn });
  };

  public generateAccessToken = async (payload: {
    id: Types.ObjectId | string;
    email: string;
  }): Promise<string> => {
    return this.signToken(
      payload,
      config.jwt.accessTokenSecret,
      config.jwt.accessTokenExpire
    );
  };

  public generateRefreshToken = async (payload: {
    id: Types.ObjectId | string;
    email: string;
  }): Promise<string> => {
    return this.signToken(
      payload,
      config.jwt.refreshTokenSecret,
      config.jwt.refreshTokenExpire
    );
  };

  public verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const accessToken = req?.cookies?.upSkilliumAccessToken;
    const refreshToken = req?.cookies?.upSkilliumRefreshToken;

    if (!accessToken || !refreshToken) {
      return res.sendFile("unauthenticated.html", { root: "public" });
    }

    try {
      const user = jwt.verify(accessToken, config.jwt.accessTokenSecret) as {
        id: string;
        email: string;
      };
      req.id = user.id;
      req.email = user.email;
      return next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return this.handleExpiredAccessToken(refreshToken, res, next);
      }

      return res.sendFile("unauthenticated.html", { root: "public" });
    }
  };

  private handleExpiredAccessToken = async (
    refreshToken: string,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = jwt.verify(
        refreshToken,
        config.jwt.refreshTokenSecret
      ) as {
        id: string;
        email: string;
      };

      const payload = { id: result.id, email: result.email };
      const newAccessToken = await this.generateAccessToken(payload);
      const newRefreshToken = await this.generateRefreshToken(payload);
      cookieManager.setTokens(res, newAccessToken, newRefreshToken);

      const user = await UserService.findUserById(payload.id);
      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Tokens rotated",
        data: user,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return this.logoutUser(res);
      }

      return res.sendFile("unauthenticated.html", { root: "public" });
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
    email: string
  ): Promise<string> {
    const token = await this.signToken(
      { id, email },
      config.jwt.accessTokenSecret,
      "10m"
    );

    return token;
  }

  public verifyResetPasswordToken = async (
    req: Request,
    res: Response,
    next: NextFunction
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

      console.log(decoded);

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
