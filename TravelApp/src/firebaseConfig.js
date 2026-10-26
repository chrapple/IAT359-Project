// pasted from firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA67WTFK4TN885ABrfOlDpJfd_OR9Icp1M",
  authDomain: "iat359-travelapp.firebaseapp.com",
  projectId: "iat359-travelapp",
  storageBucket: "iat359-travelapp.firebasestorage.app",
  messagingSenderId: "899148447797",
  appId: "1:899148447797:web:45b1535303cd1fa8c3717c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
