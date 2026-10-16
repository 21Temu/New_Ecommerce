import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserCart, removeCartItem } from "../services/cartService";
import { createPayment, createOrder } from "../services/orderService";
import type { CartItem } from "../types";

export default function Checkout() {
  const { profile } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: "", address: "", phone_number: "", payment_image: "" });

  useEffect(() => {
    if (profile) getUserCart(profile.user_id).then(setItems);
  }, [profile]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    for (const item of items) {
      const paymentId = await createPayment({
        user_id: profile.user_id,
        product_id: item.product_id,
        product_name: `Product ${item.product_id.slice(0, 6)}`,
        product_image: "",
        name: form.name,
        payment_image: form.payment_image,
        amount: item.price * item.quantity,
        quantity: item.quantity,
        address: form.address,
        phone_number: form.phone_number,
        status: "pending",
      });

      await createOrder({
        product_name: `Product ${item.product_id.slice(0, 6)}`,
        product_image: "",
        name: form.name,
        amount: item.price * item.quantity,
        quantity: item.quantity,
        address: form.address,
        phone_number: form.phone_number,
        payment_image: form.payment_image,
        status: "pending",
        order_number: `ORD-${Date.now()}`,
        payment_id: paymentId,
        user_id: profile.user_id,
        product_id: item.product_id,
      });

      await removeCartItem(item.cart_id);
    }
    nav("/orders");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-12">Checkout</h1>

      <form onSubmit={submit} className="space-y-4">
        <input required placeholder="Full name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-accent" />
        <input required placeholder="Phone number" value={form.phone_number}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-accent" />
        <textarea required placeholder="Delivery address" value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-accent h-28" />
        <input required placeholder="Payment screenshot URL" value={form.payment_image}
          onChange={(e) => setForm({ ...form, payment_image: e.target.value })}
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-accent" />

        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold text-xl">${total}</span>
        </div>

        <button className="w-full bg-primary text-white py-4 rounded-full font-medium hover:bg-accent transition-colors">
          Place Order
        </button>
      </form>
    </div>
  );
}