
import admin from "firebase-admin";
import dotenv from 'dotenv';
dotenv.config();
const serviceAccount = process.env.FIREBASE_KEY_PATH;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_PROJECT_STORAGE_BUCKET, 
});

const bucket = admin.storage().bucket();

module.exports = bucket;
  