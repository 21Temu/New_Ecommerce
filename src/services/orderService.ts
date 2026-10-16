import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Order, Payment } from "../types";

export const createPayment = async (payment: Omit<Payment, "payment_id">) => {
  const ref = await addDoc(collection(db, "payments"), payment);
  return ref.id;
};

export const createOrder = async (order: Omit<Order, "order_id">) => {
  const ref = await addDoc(collection(db, "orders"), order);
  return ref.id;
};

export const getUserOrders = async (user_id: string): Promise<Order[]> => {
  const q = query(collection(db, "orders"), where("user_id", "==", user_id));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...d.data(), order_id: d.id } as Order));
};