import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoGFQi59cqIWqHfOrTnXGv0kjGnu-szBg",
  authDomain: "task-management-1ba0d.firebaseapp.com",
  projectId: "task-management-1ba0d",
  storageBucket: "task-management-1ba0d.firebasestorage.app",
  messagingSenderId: "909588210903",
  appId: "1:909588210903:web:a713b6a5652be1175afc92",
  measurementId: "G-5QW28ZG6BY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
