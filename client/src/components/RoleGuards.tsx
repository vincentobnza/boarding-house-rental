import { useAuth } from "../hooks/useAuth";
import { useRoleGuard } from "../hooks/useRoleGuard";
import type { ReactNode } from "react";

export function AdminGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  useRoleGuard(["admin"], user?.role);
  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}

export function LandlordGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  useRoleGuard(["landlord", "admin"], user?.role);
  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}

export function UserGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  useRoleGuard(["user", "admin"], user?.role);
  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
