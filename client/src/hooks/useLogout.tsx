import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Logout = {
  redirectAfterLogoutUrl: string;
  delay?: number;
};

export const useLogout = ({ redirectAfterLogoutUrl, delay = 3000 }: Logout) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(redirectAfterLogoutUrl);
    }, delay);
  };

  return { loading, handleLogout };
};
