import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzl2CszqjcYZpLDrJ87jZ5VO-v-15AEdk",
  authDomain: "habit-tracker-ac1f5.firebaseapp.com",
  projectId: "habit-tracker-ac1f5",
  storageBucket: "habit-tracker-ac1f5.firebasestorage.app",
  messagingSenderId: "282828362402",
  appId: "1:282828362402:web:1e9f1dd0b3c151ab21bdfb",
  measurementId: "G-D8QMJ2RBJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth, Providers and Firestore for our application to use
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
