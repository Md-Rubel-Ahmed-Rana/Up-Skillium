import admin, { ServiceAccount } from "firebase-admin";
import config from "./envConfig";

export const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId,
};

const firebaseServiceAccount  = config.firebaseServiceAccount as ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(
    firebaseServiceAccount
  ),
  storageBucket: firebaseConfig.storageBucket,
});

export const firebaseBucket = admin.storage().bucket();
