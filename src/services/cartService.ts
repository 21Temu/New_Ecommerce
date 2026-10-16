import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { CartItem } from "../types";

export const addToCart = async (item: Omit<CartItem, "cart_id">) => {
  const ref = await addDoc(collection(db, "cart"), item);
  return ref.id;
};

export const getUserCart = async (user_id: string): Promise<CartItem[]> => {
  const q = query(collection(db, "cart"), where("user_id", "==", user_id));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...d.data(), cart_id: d.id } as CartItem));
};

export const removeCartItem = (cart_id: string) =>
  deleteDoc(doc(db, "cart", cart_id));

export const updateCartQty = (cart_id: string, quantity: number) =>
  updateDoc(doc(db, "cart", cart_id), { quantity });