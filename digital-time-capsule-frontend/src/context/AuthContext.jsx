

// import { createContext, useContext, useEffect, useState } from "react";
// import { loginUser, registerUser } from "@/services/authService";
// import { isTokenExpired } from "@/utils/tokenUtils";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// export const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   /* =========================
//      CHECK TOKEN ON APP LOAD
//   ========================= */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       if (!isTokenExpired(token)) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         logout(false);
//       }
//     }
//   }, []);

//   /* =========================
//      AUTO LOGOUT ON TOKEN EXPIRY
//   ========================= */
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) return;

//     const interval = setInterval(() => {
//       if (isTokenExpired(token)) {
//         logout();
//       }
//     }, 60000); // check every 1 min

//     return () => clearInterval(interval);
//   }, []);

//   const register = async (data) => {
//     const res = await registerUser(data);

//     localStorage.setItem("token", res.token);
//     localStorage.setItem("user", JSON.stringify(res.user));

//     setUser(res.user);
//     navigate("/dashboard");
//   };

//   const login = async (data) => {
//     const res = await loginUser(data);

//     localStorage.setItem("token", res.token);
//     localStorage.setItem("user", JSON.stringify(res.user));

//     setUser(res.user);
//     navigate("/dashboard");
//   };

//   const logout = (redirect = true) => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);

//     if (redirect) {
//       navigate("/login");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "@/services/authService";
import { isTokenExpired } from "@/utils/tokenUtils";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  /* =========================
     CHECK TOKEN ON APP LOAD
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      if (!isTokenExpired(token)) {
        setUser(JSON.parse(storedUser));
      } else {
        logout(false);
      }
    }
  }, []);

  /* =========================
     AUTO LOGOUT ON TOKEN EXPIRY
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const register = async (data) => {
    const res = await registerUser(data);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    setUser(res.user);
    navigate("/dashboard");
  };

  const login = async (data) => {
    const res = await loginUser(data);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    setUser(res.user);
    navigate("/dashboard");
  };

  const logout = (redirect = true) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    if (redirect) {
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};