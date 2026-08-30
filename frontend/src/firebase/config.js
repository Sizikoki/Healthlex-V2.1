import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAWPxRKgb6v0U90dCkudzmVCY8eliQE1GA",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "healthlexmed.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "healthlexmed",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "healthlexmed.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "494749993763",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:494749993763:web:a3979b80df608b91779a96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
export default app;


