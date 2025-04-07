// firebase.js
const admin = require("firebase-admin");
const config = require("scrumkits-env");

const serviceAccount = config.get("firebase:service_account");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const Firestore = admin.firestore();

module.exports = { FirebaseAdmin: admin, Firestore };
