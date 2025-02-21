// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {getFirestore} from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8AIgE4mTwDHDCJmJC61_P84K-QDDRo7k",
  authDomain: "ai-logo-b143b.firebaseapp.com",
  projectId: "ai-logo-b143b",
  storageBucket: "ai-logo-b143b.firebasestorage.app",
  messagingSenderId: "978714138704",
  appId: "1:978714138704:web:d68f156bf8ec9507c79955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);