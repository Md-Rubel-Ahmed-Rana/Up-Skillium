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
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY as string,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID as string,
    appId: process.env.FIREBASE_APP_ID as string,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID as string,
  },
  firebaseServiceAccount: {
    type: process.env.FIREBASE_TYPE as string,
    project_id: process.env.FIREBASE_PROJECT_ID as string,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID as string,
    private_key: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
      /\\n/g,
      "\n"
    ),
    client_email: process.env.FIREBASE_CLIENT_EMAIL as string,
    client_id: process.env.FIREBASE_CLIENT_ID as string,
    auth_uri: process.env.FIREBASE_AUTH_URI as string,
    token_uri: process.env.FIREBASE_TOKEN_URI as string,
    auth_provider_x509_cert_url: process.env
      .FIREBASE_AUTH_PROVIDER_X509_CERT_URL as string,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL as string,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN as string,
  },
};

export default config;
