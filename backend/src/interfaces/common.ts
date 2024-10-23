import { Types } from "mongoose";

export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IJwtPayload = {
  id: Types.ObjectId | string;
  email: string;
};

export type ITokens = { accessToken: string; refreshToken: string };
