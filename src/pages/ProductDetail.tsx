import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useAuth } from "../context/AuthContext";
import type { Product } from "../types";

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { profile } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (id) fetchProductById(id).then(setProduct);
  }, [id]);

  const handleAdd = async () => {
    if (!profile) return nav("/login");
    if (!product) return;
    await addToCart({
      user_id: profile.user_id,
      product_id: product.product_id,
      quantity: qty,
      price: product.price,
      status: "pending",
    });
    nav("/cart");
  };

  if (!product) return <div className="p-20 text-center text-gray-400">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
      <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50">
        <img src={product.product_image} alt={product.product_name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold tracking-tight">{product.product_name}</h1>
        <p className="text-gray-500 mt-4 leading-relaxed">{product.description}</p>
        <div className="text-3xl font-bold mt-8">${product.price}</div>
        <p className="text-sm text-gray-400 mt-1">{product.stock} in stock • {product.sold_count} sold</p>

        <div className="flex items-center gap-4 mt-10">
          <div className="flex items-center border border-gray-200 rounded-full">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-gray-50 rounded-l-full">−</button>
            <span className="px-4 font-medium">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-gray-50 rounded-r-full">+</button>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 bg-primary text-white py-4 rounded-full font-medium hover:bg-accent transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}