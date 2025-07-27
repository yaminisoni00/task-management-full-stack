import admin from "firebase-admin";

import { getApps, initializeApp, cert } from "firebase-admin/app";

// Use service account JSON from Firebase Console
const serviceAccount = require('../../serviceKey.json');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export default admin;
