import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getUserCart, removeCartItem } from "../services/cartService";
import type { CartItem } from "../types";

export default function Cart() {
  const { profile } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  const load = async () => {
    if (profile) setItems(await getUserCart(profile.user_id));
  };
  useEffect(() => { load(); }, [profile]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-12">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">Your cart is empty</p>
          <Link to="/products" className="inline-block mt-6 text-accent font-medium hover:underline">
            Browse products →
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.cart_id} className="flex gap-4 p-4 rounded-2xl border border-gray-100">
                <div className="w-24 h-24 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                  <img src={item.product_id} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Product ID: {item.product_id.slice(0, 8)}...</p>
                  <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                  <p className="font-semibold mt-2">${item.price * item.quantity}</p>
                </div>
                <button
                  onClick={async () => { await removeCartItem(item.cart_id); load(); }}
                  className="p-2 hover:bg-red-50 rounded-full h-fit text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 h-fit bg-gray-50/50">
            <h2 className="font-semibold text-lg mb-6">Summary</h2>
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Subtotal</span><span>${total}</span></div>
            <div className="flex justify-between text-sm mb-6"><span className="text-gray-500">Shipping</span><span>Free</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-4"><span>Total</span><span>${total}</span></div>
            <Link
              to="/checkout"
              className="block mt-8 bg-primary text-white text-center py-4 rounded-full font-medium hover:bg-accent transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}