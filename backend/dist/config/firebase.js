"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseBucket = exports.firebaseConfig = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const envConfig_1 = __importDefault(require("./envConfig"));
exports.firebaseConfig = {
    apiKey: envConfig_1.default.firebase.apiKey,
    authDomain: envConfig_1.default.firebase.authDomain,
    projectId: envConfig_1.default.firebase.projectId,
    storageBucket: envConfig_1.default.firebase.storageBucket,
    messagingSenderId: envConfig_1.default.firebase.messagingSenderId,
    appId: envConfig_1.default.firebase.appId,
    measurementId: envConfig_1.default.firebase.measurementId,
};
const firebaseServiceAccount = envConfig_1.default.firebaseServiceAccount;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebaseServiceAccount),
    storageBucket: exports.firebaseConfig.storageBucket,
});
exports.firebaseBucket = firebase_admin_1.default.storage().bucket();
