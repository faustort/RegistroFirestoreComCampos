// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFjfLgZztUHtVY1t7wu2HXI_OfCYkGhto",
    authDomain: "loginsignupfirebaseauth-1324a.firebaseapp.com",
    projectId: "loginsignupfirebaseauth-1324a",
    storageBucket: "loginsignupfirebaseauth-1324a.appspot.com",
    messagingSenderId: "876479156193",
    appId: "1:876479156193:web:f5798eb989e965e0884ca0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);