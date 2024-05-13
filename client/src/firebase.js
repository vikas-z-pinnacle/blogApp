// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: "blogapp-23bd2.firebaseapp.com",
    projectId: "blogapp-23bd2",
    storageBucket: "blogapp-23bd2.appspot.com",
    messagingSenderId: "827064190405",
    appId: "1:827064190405:web:37dff9a92d45d2411d77ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);