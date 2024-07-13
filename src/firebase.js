import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDiNTcGBUtGng-ZIGKJ3H50G3jZ_Ur0WkY",
  authDomain: "stima-tracker.firebaseapp.com",
  projectId: "stima-tracker",
  storageBucket: "stima-tracker.appspot.com",
  messagingSenderId: "636642127217",
  appId: "1:636642127217:web:70afb055979ba1defe1ad0"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)