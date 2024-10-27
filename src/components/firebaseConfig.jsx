// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGsQV7zVPkIQNesFAlJyjx2d8Kr-P4qoo",
  authDomain: "ecommerce-b752a.firebaseapp.com",
  projectId: "ecommerce-b752a",
  storageBucket: "ecommerce-b752a.appspot.com",
  messagingSenderId: "391022065332",
  appId: "1:391022065332:web:22c2600dda7c09784189e1",
  measurementId: "G-9617T6MQQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };