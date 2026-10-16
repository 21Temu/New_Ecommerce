export interface User {
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  status: "active" | "inactive";
  role?: "admin" | "customer";
}

export interface Category {
  category_id: string;
  name: string;
  description: string;
}

export interface Tag {
  tag_id: string;
  name: string;
  description: string;
}

export interface ProductTag {
  id: string;
  product_id: string;
  tag_id: string;
}

export interface Product {
  product_id: string;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  product_image: string;
  status: "available" | "out_of_stock";
  sold_count: number;
  category_id: string;
}

export interface CartItem {
  cart_id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  price: number;
  status: "pending" | "ordered";
}

export interface Payment {
  payment_id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  name: string;
  payment_image: string;
  amount: number;
  quantity: number;
  address: string;
  phone_number: string;
  status: "pending" | "approved" | "rejected";
}

export interface Order {
  order_id: string;
  product_name: string;
  product_image: string;
  name: string;
  amount: number;
  quantity: number;
  address: string;
  phone_number: string;
  payment_image: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  cancellation_reason?: string;
  order_number: string;
  payment_id: string;
  user_id: string;
  product_id: string;
}

export interface Bank {
  id: string;
  bank_name: string;
  account_number: string;
}

export interface Message {
  message_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  is_read: boolean;
}