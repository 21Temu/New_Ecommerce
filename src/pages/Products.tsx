import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((p) => { setProducts(p); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">All Products</h1>
      <p className="text-gray-500 mb-12">Discover our full collection</p>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.product_id} product={p} />)}
        </div>
      )}
    </div>
  );
}