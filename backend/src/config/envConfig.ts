import dotenv from "dotenv";
import { EnvironmentConfig } from "../interfaces/env.interface";

dotenv.config();

const defaultConfig = {
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    env: process.env.NODE_ENV || "development",
  },
  database: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/dev_database",
  },
  jwt: {
    accessTokenSecret:
      process.env.JWT_ACCESS_TOKEN_SECRET || "defaultAccessTokenSecret",
    refreshTokenSecret:
      process.env.JWT_REFRESH_TOKEN_SECRET || "defaultRefreshTokenSecret",
    accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE || "3d",
    refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE || "30d",
  },
};

const environmentConfigs: Record<string, EnvironmentConfig> = {
  production: {
    app: {
      port: process.env.PORT ? Number(process.env.PORT) : 80,
    },
    database: {
      uri: process.env.DB_URI || "mongodb://prod_db_uri",
    },
    jwt: {
      accessTokenSecret:
        process.env.JWT_ACCESS_TOKEN_SECRET || "prodAccessTokenSecret",
      refreshTokenSecret:
        process.env.JWT_REFRESH_TOKEN_SECRET || "prodRefreshTokenSecret",
      accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE || "1h",
      refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE || "30d",
    },
  },
  test: {
    app: {
      port: process.env.PORT ? Number(process.env.PORT) : 3001,
    },
    database: {
      uri: process.env.DB_URI || "mongodb://test_db_uri",
    },
    jwt: {
      accessTokenSecret:
        process.env.JWT_ACCESS_TOKEN_SECRET || "testAccessTokenSecret",
      refreshTokenSecret:
        process.env.JWT_REFRESH_TOKEN_SECRET || "testRefreshTokenSecret",
      accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE || "5m",
      refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE || "1d",
    },
  },
  stage: {
    app: {
      port: process.env.PORT ? Number(process.env.PORT) : 3002,
    },
    database: {
      uri: process.env.DB_URI || "mongodb://stage_db_uri",
    },
    jwt: {
      accessTokenSecret:
        process.env.JWT_ACCESS_TOKEN_SECRET || "stageAccessTokenSecret",
      refreshTokenSecret:
        process.env.JWT_REFRESH_TOKEN_SECRET || "stageRefreshTokenSecret",
      accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE || "30m",
      refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE || "14d",
    },
  },
};

const environment = process.env.NODE_ENV || "development";
const environmentConfig = environmentConfigs[environment] || {};

export const config = { ...defaultConfig, ...environmentConfig };
