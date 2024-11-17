// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTSqsNUsz5RyFCnyJ1ZLCzkjmKf4mGPkQ",
  authDomain: "crm-auth-d67c3.firebaseapp.com",
  projectId: "crm-auth-d67c3",
  storageBucket: "crm-auth-d67c3.appspot.com",
  messagingSenderId: "273406403853",
  appId: "1:273406403853:web:d180f08dd9ac8018da3c44",
  measurementId: "G-GBQNCDY751",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
