import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProtectedRouteProps {
  children: any;
  requiredRole?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // try {
      //   const res = await axios.get(
      //     `${import.meta.env.VITE_BACKEND_API_URL}/auth`,
      //     {
      //       withCredentials: true,
      //     }
      //   );
      //   setRole(res?.data?.user?.role);
      // } catch (error: any) {
      //   if (error.response?.status === 401) {
      //     setRole(null);
      //   }
      // } finally {
      //   setLoading(false);
      // }
      setRole("Teacher");
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role === null) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
