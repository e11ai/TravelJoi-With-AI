// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBctKYVUJ-t_37etlRMFzY79utXfeuOM9M",
  authDomain: "ai-travel-d250c.firebaseapp.com",
  projectId: "ai-travel-d250c",
  storageBucket: "ai-travel-d250c.firebasestorage.app",
  messagingSenderId: "378092045207",
  appId: "1:378092045207:web:cb50d467da8e2b88a17ad2",
  measurementId: "G-TE46PTD339"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);