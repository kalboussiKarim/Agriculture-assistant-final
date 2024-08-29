// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "*******************************",
  authDomain: "**********************************",
  projectId: "**********************************",
  storageBucket: "*********************************************************",
  messagingSenderId: "**********************************",
  appId: "**********************************",
  measurementId: "**********************************",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(
  FIREBASE_APP,
  "**********************************"
);
export {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  ref,
  set,
  onValue,
  doc,
  updateDoc,
  get,
};
