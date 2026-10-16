import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "../lib/firebase";
import { getUserProfile } from "../services/authService";
import type { User } from "../types";

interface AuthCtx {
  fbUser: FirebaseUser | null;
  profile: User | null;
  loading: boolean;
}

const Ctx = createContext<AuthCtx>({ fbUser: null, profile: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setFbUser(u);
      if (u) setProfile(await getUserProfile(u.uid));
      else setProfile(null);
      setLoading(false);
    });
  }, []);

  return <Ctx.Provider value={{ fbUser, profile, loading }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);