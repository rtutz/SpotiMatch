// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzEqHNR6U6WqYiOXypZJFIGELj0zOYIas",
  authDomain: "spotimatch-54d3e.firebaseapp.com",
  projectId: "spotimatch-54d3e",
  storageBucket: "spotimatch-54d3e.appspot.com",
  messagingSenderId: "741568505905",
  appId: "1:741568505905:web:3081bebef7123186c14d10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);