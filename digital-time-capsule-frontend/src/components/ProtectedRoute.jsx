// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function ProtectedRoute() {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }

// export default ProtectedRoute;
//1st wed morning 
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

/// 2nd after installation 
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

// FRONTEND
// File: src/components/ProtectedRoute.jsx
