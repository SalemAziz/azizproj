// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_Key,
  authDomain: "myfootplat.firebaseapp.com",
  projectId: "myfootplat",
  storageBucket: "myfootplat.appspot.com",
  messagingSenderId: "685049503290",
  appId: "1:685049503290:web:a0d6fec6e44c21c1059f03"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);