import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            New Collection 2025
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Premium products,<br />delivered with care.
          </h1>
          <p className="text-lg text-gray-500 mt-6 max-w-xl">
            Curated essentials for modern living. Quality you can feel, prices you'll love.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-10 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-accent transition-colors"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">
        {[
          { t: "Free Shipping", d: "On orders over $50" },
          { t: "Secure Payment", d: "Bank transfer verified" },
          { t: "24/7 Support", d: "We're always here" },
        ].map((f) => (
          <div key={f.t} className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-lg">{f.t}</h3>
            <p className="text-gray-500 text-sm mt-1">{f.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}