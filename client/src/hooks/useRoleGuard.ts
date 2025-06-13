import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "user" | "landlord" | "admin";

export function useRoleGuard(allowedRoles: UserRole[], userRole?: UserRole) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userRole || !allowedRoles.includes(userRole)) {
      navigate("/onboarding");
    }
  }, [userRole, allowedRoles, navigate]);
}
