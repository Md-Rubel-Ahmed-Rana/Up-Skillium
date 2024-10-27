import dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    port: Number(process.env.PORT),
    env: process.env.NODE_ENV as string,
    corsOrigins: process.env.CORS_ORIGINS as any,
  },
  database: {
    url: process.env.DATABASE_URL as string,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE as string,
    refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE as string,
  },
};

export default config;
