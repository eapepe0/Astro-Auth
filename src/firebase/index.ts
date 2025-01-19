// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx4QsIehkHJGtyDHhgBixzJrGQyRyxz68",
  authDomain: "astro-autenticacion-8240c.firebaseapp.com",
  projectId: "astro-autenticacion-8240c",
  storageBucket: "astro-autenticacion-8240c.firebasestorage.app",
  messagingSenderId: "680593162428",
  appId: "1:680593162428:web:da59ab71538199808c90b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export const firebase = {
    app,
    auth
}