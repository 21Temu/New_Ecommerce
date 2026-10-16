import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import type { User } from "../types";

export const registerUser = async (
  email: string,
  password: string,
  full_name: string,
  phone_number: string
) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user: User = {
    user_id: cred.user.uid,
    full_name,
    email,
    phone_number,
    status: "active",
    role: "customer",
  };
  await setDoc(doc(db, "users", cred.user.uid), user);
  return user;
};

export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const getUserProfile = async (uid: string) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as User) : null;
};