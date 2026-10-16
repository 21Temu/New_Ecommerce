import { Link } from "react-router-dom";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.product_id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.product_image}
          alt={product.product_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg truncate">{product.product_name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">${product.price}</span>
          <span className="text-xs text-gray-400">{product.sold_count} sold</span>
        </div>
      </div>
    </Link>
  );
}