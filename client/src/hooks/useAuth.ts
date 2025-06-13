import { useState, useEffect } from "react";

export type User = {
  id: string;
  username: string;
  role: "user" | "landlord" | "admin";
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // You can add login/logout logic here
  return { user, loading, setUser };
}
