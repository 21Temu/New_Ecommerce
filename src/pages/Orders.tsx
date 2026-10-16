import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserOrders } from "../services/orderService";
import type { Order } from "../types";

export default function Orders() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (profile) getUserOrders(profile.user_id).then(setOrders);
  }, [profile]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-12">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.order_id} className="p-6 rounded-2xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-semibold">{o.product_name}</p>
                <p className="text-sm text-gray-500 mt-1">Order #{o.order_number}</p>
                <p className="text-xs text-gray-400 mt-1">{o.address}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${o.amount}</p>
                <span className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
                  o.status === "delivered" ? "bg-green-50 text-green-600" :
                  o.status === "cancelled" ? "bg-red-50 text-red-600" :
                  "bg-amber-50 text-amber-600"
                }`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}