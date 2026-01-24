import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSE5YwQv8C0hgaAbi97PPJjBy8LnX8BY",
  authDomain: "market-80d5b.firebaseapp.com",
  projectId: "market-80d5b",
  storageBucket: "market-80d5b.firebasestorage.app",
  messagingSenderId: "23169726193",
  appId: "1:23169726193:web:716ec8319c2aa039f79b50"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
var admin = require("firebase-admin");

FileInputStream serviceAccount =
new FileInputStream("path/to/serviceAccountKey.json");

FirebaseOptions options = new FirebaseOptions.Builder()
  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
  .build();

FirebaseApp.initializeApp(options);
};
