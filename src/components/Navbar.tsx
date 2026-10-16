import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

export default function Navbar() {
  const { profile } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Shop<span className="text-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/products" className="hover:text-primary transition">Products</Link>
          <Link to="/orders" className="hover:text-primary transition">Orders</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="p-2 hover:bg-gray-50 rounded-full transition">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          {profile ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden sm:block">{profile.full_name}</span>
              <button
                onClick={async () => { await logoutUser(); nav("/"); }}
                className="p-2 hover:bg-gray-50 rounded-full transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-2 hover:bg-gray-50 rounded-full transition">
              <User className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}