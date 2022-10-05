// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc7ksAI9Epy7MLIV78s07VggT8mRlmvvA",
  authDomain: "junkyard-b5e1b.firebaseapp.com",
  projectId: "junkyard-b5e1b",
  storageBucket: "junkyard-b5e1b.appspot.com",
  messagingSenderId: "418155695325",
  appId: "1:418155695325:web:d70f18bf9c948e8a895f34",
  measurementId: "G-G9LZFBMLKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
