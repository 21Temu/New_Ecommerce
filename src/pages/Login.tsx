import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await loginUser(email, password);
      nav("/");
    } catch (e: any) {
      setErr(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
      <p className="text-gray-500 mt-2">Sign in to your account</p>

      <form onSubmit={submit} className="mt-10 space-y-4">
        <input
          type="email" placeholder="Email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-accent"
        />
        <input
          type="password" placeholder="Password" required value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-accent"
        />
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button className="w-full bg-primary text-white py-4 rounded-full font-medium hover:bg-accent transition-colors">
          Sign In
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500 text-center">
        No account? <Link to="/register" className="text-accent font-medium">Register</Link>
      </p>
    </div>
  );
}