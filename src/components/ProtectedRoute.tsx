import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { profile, loading } = useAuth();
  if (loading) return <div className="p-20 text-center text-gray-400">Loading...</div>;
  if (!profile) return <Navigate to="/login" replace />;
  return children;
}