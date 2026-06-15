import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWPxRKgb6v0U90dCkudzmVCY8eliQE1GA",
  authDomain: "healthlexmed.firebaseapp.com",
  projectId: "healthlexmed",
  storageBucket: "healthlexmed.firebasestorage.app",
  messagingSenderId: "494749993763",
  appId: "1:494749993763:web:a3979b80df608b91779a96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
export default app;


