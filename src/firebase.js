// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTukXaTcCQMQe9LL16Pb4BohhZ_0bD5pw",
  authDomain: "task-a4b11.firebaseapp.com",
  projectId: "task-a4b11",
  storageBucket: "task-a4b11.appspot.com",
  messagingSenderId: "840073972576",
  appId: "1:840073972576:web:6181d220939a8b1672ac05",
  measurementId: "G-9627HYBFR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;