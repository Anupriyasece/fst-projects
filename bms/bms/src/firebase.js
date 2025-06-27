// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCiETVbkS06lUF51V-ERMBF019yhpm7Vk",
  authDomain: "finalbms-c7a42.firebaseapp.com",
  projectId: "finalbms-c7a42",
  databaseURL: "https://finalbms-c7a42-default-rtdb.firebaseio.com",
  storageBucket: "finalbms-c7a42.firebasestorage.app",
  messagingSenderId: "619992172473",
  appId: "1:619992172473:web:47e4719b8d448395911868",
  measurementId: "G-13QX5G8JKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);