"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app: {
        port: Number(process.env.PORT),
        env: process.env.NODE_ENV,
        corsOrigins: process.env.CORS_ORIGINS,
        logo: process.env.APP_LOGO,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
        accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE,
        refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    },
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    firebaseServiceAccount: {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env
            .FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    },
    certificate: {
        ceoSignatureUrl: process.env.CEO_SIGNATURE_URL,
        caoSignatureUrl: process.env.CAO_SIGNATURE_URL,
        logoUrl: process.env.LOGO_URL,
        sloganUrl: process.env.SLOGAN_IMAGE_URL,
        badges: {
            level1: process.env.BADGE_1_URL,
            level2: process.env.BADGE_2_URL,
            level3: process.env.BADGE_3_URL,
            level4: process.env.BADGE_4_URL,
        },
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publicKey: process.env.STRIPE_PUBLISH_KEY,
        successUrl: process.env.SUCCESS_URL,
        cancelUrl: process.env.CANCEL_URL,
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        appUser: process.env.APP_USER,
        appPass: process.env.APP_PASSWORD,
    },
};
exports.default = config;
