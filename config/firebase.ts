import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  VITE_REACT_FIREBASE_API_KEY,
  VITE_REACT_FIREBASE_APP_ID,
  VITE_REACT_FIREBASE_AUTH_DOMAIN,
  VITE_REACT_FIREBASE_MESSAGE_SENDER_ID,
  VITE_REACT_FIREBASE_PROJECT_ID,
  VITE_REACT_FIREBASE_STORAGE_BUCKET,
} from "./env";

type fireConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const firebaseConfig: fireConfig = {
  apiKey: VITE_REACT_FIREBASE_API_KEY,
  authDomain: VITE_REACT_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_REACT_FIREBASE_PROJECT_ID,
  storageBucket: VITE_REACT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_REACT_FIREBASE_MESSAGE_SENDER_ID,
  appId: VITE_REACT_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
