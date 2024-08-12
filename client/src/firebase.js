// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reachinbox-5eb8a.firebaseapp.com",
  projectId: "reachinbox-5eb8a",
  storageBucket: "reachinbox-5eb8a.appspot.com",
  messagingSenderId: "1007925632960",
  appId: "1:1007925632960:web:547c9b82bff707e42e7225"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);