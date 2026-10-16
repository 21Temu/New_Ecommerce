import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Product, Category } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map((d) => ({ ...d.data(), product_id: d.id } as Product));
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const snap = await getDoc(doc(db, "products", id));
  return snap.exists() ? ({ ...snap.data(), product_id: snap.id } as Product) : null;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const snap = await getDocs(collection(db, "categories"));
  return snap.docs.map((d) => ({ ...d.data(), category_id: d.id } as Category));
};