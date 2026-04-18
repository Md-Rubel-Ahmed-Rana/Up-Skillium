import { Types } from "mongoose";

export type IApiResponse<T> = {
  statusCode: number;
  traceId?: string | undefined;
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
  role: string;
};

export type ITokens = { accessToken: string; refreshToken: string };

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
