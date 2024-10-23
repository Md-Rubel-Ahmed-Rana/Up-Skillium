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
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: "Missing authentication tokens",
      });
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

      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: "Unauthorized access",
      });
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

      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: "Invalid refresh token",
      });
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
}

export const JwtInstance = new JWT();
