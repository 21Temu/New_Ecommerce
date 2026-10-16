import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMo7jomSaGqqgZ4IFpRiH8uPWZWyUMp5s",
  authDomain: "ecommerce-40306.firebaseapp.com",
  projectId: "ecommerce-40306", 
  storageBucket: "ecommerce-40306.firebasestorage.app",
  messagingSenderId: "439922647896",
  appId: "1:439922647896:web:b72cfb50a7f27ebb43bb2d", 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);