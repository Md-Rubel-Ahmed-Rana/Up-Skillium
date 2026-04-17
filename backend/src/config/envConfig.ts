import dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    port: Number(process.env.PORT),
    env: process.env.NODE_ENV as string,
    corsOrigins: process.env.CORS_ORIGINS as any,
    logo: process.env.APP_LOGO as string,
    name: (process.env.APP_NAME as string) || "Up Skillium",
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
  certificate: {
    ceoSignatureUrl: process.env.CEO_SIGNATURE_URL as string,
    caoSignatureUrl: process.env.CAO_SIGNATURE_URL as string,
    logoUrl: process.env.LOGO_URL as string,
    sloganUrl: process.env.SLOGAN_IMAGE_URL as string,
    badges: {
      level1: process.env.BADGE_1_URL as string,
      level2: process.env.BADGE_2_URL as string,
      level3: process.env.BADGE_3_URL as string,
      level4: process.env.BADGE_4_URL as string,
    },
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY as string,
    publicKey: process.env.STRIPE_PUBLISH_KEY as string,
    successUrl: process.env.SUCCESS_URL as string,
    cancelUrl: process.env.CANCEL_URL as string,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN as string,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN as string,
    appUser: process.env.APP_USER as string,
    appPass: process.env.APP_PASSWORD as string,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME as string,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    apiSecret: process.env.CLOUDINARY_API_SECRET as string,
  },
  bugsnag: {
    apiKey: process.env.BUGSNAG_API_KEY as string,
  },
};

export default config;
