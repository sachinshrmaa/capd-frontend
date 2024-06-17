// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export const ProtectedRoute = ({ children }: any) => {
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/v1/auth", {
//           withCredentials: true,
//         });
//         setRole(res?.data?.user?.role);
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           setRole(null); // Set role to null if not authenticated
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (role === null) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

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
      try {
        const res = await axios.get("http://localhost:3000/api/v1/auth", {
          withCredentials: true,
        });
        setRole(res?.data?.user?.role);
      } catch (error: any) {
        if (error.response?.status === 401) {
          setRole(null); // Set role to null if not authenticated
        }
      } finally {
        setLoading(false);
      }
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
