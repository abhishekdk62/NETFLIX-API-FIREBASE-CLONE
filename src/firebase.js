// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { setUserSession, clearUserSession } from "./utils/session";

// ✅ No need to use dotenv in React/Vite projects
// ❌ Remove: import dotenv from 'dotenv'
// ❌ Remove: dotenv.config()

// ✅ Firebase config using import.meta.env and VITE_ prefix
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    try {
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });

      setUserSession(user);
      return true;
    } catch (firestoreError) {
      console.log("Firestore Error:", firestoreError);
      await user.delete();
      toast.error("Failed to complete signup. Please try again.");
      return false;
    }
  } catch (error) {
    console.log("Auth Error:", error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    return false;
  }
};

const login = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUserSession(result.user);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
  clearUserSession();
};

export { auth, db, login, signup, logout };
