import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", phone_number: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await registerUser(form.email, form.password, form.full_name, form.phone_number);
      nav("/");
    } catch (e: any) { setErr(e.message); }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">Create account</h1>
      <p className="text-gray-500 mt-2">Start shopping in seconds</p>

      <form onSubmit={submit} className="mt-10 space-y-4">
        {[
          { k: "full_name", p: "Full name", t: "text" },
          { k: "email", p: "Email", t: "email" },
          { k: "phone_number", p: "Phone number", t: "tel" },
          { k: "password", p: "Password", t: "password" },
        ].map((f) => (
          <input
            key={f.k}
            type={f.t}
            placeholder={f.p}
            required
            value={(form as any)[f.k]}
            onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-accent"
          />
        ))}
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button className="w-full bg-primary text-white py-4 rounded-full font-medium hover:bg-accent transition-colors">
          Create Account
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500 text-center">
        Already have an account? <Link to="/login" className="text-accent font-medium">Sign in</Link>
      </p>
    </div>
  );
}