
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <nav className="w-full px-8 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200">

//       <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
//         <span className="text-2xl">⏳</span>
//         <span>TimeCapsule</span>
//       </Link>

//       <div className="flex items-center gap-8">
//         {!user ? (
//           <>
//             <Link to="/login" className="text-gray-700 hover:text-black transition">
//               Log in
//             </Link>
//             <Link
//               to="/register"
//               className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-md hover:opacity-90 transition"
//             >
//               Get Started
//             </Link>
//           </>
//         ) : (
//           <>
//             <div className="flex items-center gap-6">
//               <Link
//                 to="/dashboard"
//                 className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium"
//               >
//                 Dashboard
//               </Link>

//               <Link
//                 to="/create"
//                 className="hover:text-gray-700 transition"
//               >
//                 New Capsule
//               </Link>

//               <Link
//                 to="/settings"
//                 className="hover:text-gray-700 transition"
//               >
//                 Settings
//               </Link>
//             </div>

//             <span className="text-gray-600 text-sm">
//               Hi, {user?.name}
//             </span>

//             <button
//               onClick={handleLogout}
//               className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition duration-300"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   return (
//     <nav className="flex justify-between items-center px-10 py-5 bg-card shadow">
//       <h2 className="text-xl font-bold">⏳ TimeCapsule</h2>

//       <div className="flex items-center gap-6">

//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/create">New Capsule</Link>
//         <Link to="/settings">Settings</Link>

//         {/* DARK MODE TOGGLE */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="px-3 py-1 rounded-full bg-muted"
//         >
//           {darkMode ? "🌙" : "☀️"}
//         </button>

//         <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Clock } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav className="w-full px-8 py-4 flex justify-between items-center bg-white shadow-sm">

//       {/* LOGO - EXACT SAME AS YOUR SCREENSHOT */}
//       <Link to="/" className="flex items-center gap-3">
//         <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md">
//           <Clock size={22} className="text-white" />
//         </div>

//         <h1 className="text-2xl font-semibold text-black tracking-wide">
//           TimeCapsule
//         </h1>
//       </Link>

//       {/* RIGHT SIDE */}
//       <div className="flex items-center gap-6">

//         {isLoggedIn ? (
//           <>
//             <Link to="/dashboard" className="hover:text-purple-600">
//               Dashboard
//             </Link>

//             <Link to="/create" className="hover:text-purple-600">
//               New Capsule
//             </Link>

//             <Link to="/settings" className="hover:text-purple-600">
//               Settings
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="px-6 py-2 rounded-full border border-gray-300"
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             >
//               Get Started
//             </Link>
//           </>
//         )}

//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Clock } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav className="w-full px-8 py-4 flex justify-between items-center bg-white shadow-sm">
      
//       {/* LOGO - LOCKED SIZE */}
//       <Link to="/" className="flex items-center gap-3">
        
//         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md">
//           <Clock size={18} className="text-white" strokeWidth={2.5} />
//         </div>

//         <span
//           style={{
//             fontFamily: "'Poppins', sans-serif",
//             fontWeight: 600,
//             fontSize: "20px",
//             letterSpacing: "0.3px",
//             color: "#111827"
//           }}
//         >
//           TimeCapsule
//         </span>

//       </Link>

//       <div className="flex items-center gap-6">

//         {isLoggedIn ? (
//           <>
//             <Link to="/dashboard" className="hover:text-purple-600">
//               Dashboard
//             </Link>

//             <Link to="/create" className="hover:text-purple-600">
//               New Capsule
//             </Link>

//             <Link to="/settings" className="hover:text-purple-600">
//               Settings
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="px-6 py-2 rounded-full border border-gray-300"
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             >
//               Get Started
//             </Link>
//           </>
//         )}

//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Clock } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav className="w-full px-8 py-4 flex justify-between items-center bg-white shadow-sm">
      
//       {/* STATIC LOGO (NOT LINK) */}
//       <div
//         onClick={() => navigate("/")}
//         className="flex items-center gap-3 cursor-pointer"
//       >
//         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md">
//           <Clock size={18} className="text-white" strokeWidth={2.5} />
//         </div>

//         <span
//           style={{
//             fontFamily: "'Poppins', sans-serif",
//             fontWeight: 600,
//             fontSize: "20px",
//             letterSpacing: "0.3px",
//             color: "#111827"
//           }}
//         >
//           TimeCapsule
//         </span>
//       </div>

//       <div className="flex items-center gap-6">
//         {isLoggedIn ? (
//           <>
//             <Link to="/dashboard" className="hover:text-purple-600">
//               Dashboard
//             </Link>

//             <Link to="/create" className="hover:text-purple-600">
//               New Capsule
//             </Link>

//             <Link to="/settings" className="hover:text-purple-600">
//               Settings
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="px-6 py-2 rounded-full border border-gray-300"
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             >
//               Get Started
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


















// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Clock } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//     window.location.reload();
//   };

//   const handleLogoClick = () => {
//     const path = location.pathname;

//     // If on homepage → refresh
//     if (path === "/") {
//       window.location.reload();
//       return;
//     }

//     // If on login or register → go to homepage
//     if (path === "/login" || path === "/register") {
//       navigate("/");
//       return;
//     }

//     // If on dashboard, create, settings → do nothing
//     if (
//       path === "/dashboard" ||
//       path === "/create" ||
//       path === "/settings"
//     ) {
//       return;
//     }
//   };

//   return (
//     <nav className="w-full px-8 py-4 flex justify-between items-center bg-white shadow-sm">
      
//       {/* LOGO - NO STYLE CHANGES */}
//       <div
//         onClick={handleLogoClick}
//         className="flex items-center gap-3 cursor-pointer"
//       >
//         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md">
//           <Clock size={18} className="text-white" strokeWidth={2.5} />
//         </div>

//         <span
//           style={{
//             fontFamily: "'Poppins', sans-serif",
//             fontWeight: 600,
//             fontSize: "20px",
//             letterSpacing: "0.3px",
//             color: "#111827"
//           }}
//         >
//           TimeCapsule
//         </span>
//       </div>

//       <div className="flex items-center gap-6">
//         {isLoggedIn ? (
//           <>
//             <Link to="/dashboard" className="hover:text-purple-600">
//               Dashboard
//             </Link>

//             <Link to="/create" className="hover:text-purple-600">
//               New Capsule
//             </Link>

//             <Link to="/settings" className="hover:text-purple-600">
//               Settings
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="px-6 py-2 rounded-full border border-gray-300"
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             >
//               Get Started
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





































import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ HAMBURGER STATE (for mobile menu toggle)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleLogoClick = () => {
    const path = location.pathname;

    if (path === "/") {
      window.location.reload();
      return;
    }

    if (path === "/login" || path === "/register") {
      navigate("/");
      return;
    }

    if (
      path === "/dashboard" ||
      path === "/create" ||
      path === "/settings"
    ) {
      return;
    }
  };

  return (
    <nav className="w-full px-6 md:px-10 py-4 flex justify-between items-center bg-white shadow-sm relative">

      {/* LOGO */}
      <div
        onClick={handleLogoClick}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md">
          <Clock size={18} className="text-white" strokeWidth={2.5} />
        </div>

        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            letterSpacing: "0.3px",
            color: "#111827"
          }}
        >
          TimeCapsule
        </span>
      </div>

      {/* ============================= */}
      {/* DESKTOP MENU (Responsive) */}
      {/* ============================= */}
      <div className="hidden md:flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-purple-600">
              Dashboard
            </Link>

            <Link to="/create" className="hover:text-purple-600">
              New Capsule
            </Link>

            <Link to="/settings" className="hover:text-purple-600">
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-2 rounded-full border border-gray-300"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* ============================= */}
      {/* HAMBURGER BUTTON (Mobile) */}
      {/* ============================= */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ============================= */}
      {/* MOBILE MENU (Responsive + Hamburger) */}
      {/* ============================= */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center gap-6 py-6 z-50">

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-600"
              >
                Dashboard
              </Link>

              <Link
                to="/create"
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-600"
              >
                New Capsule
              </Link>

              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-600"
              >
                Settings
              </Link>

              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-full border border-gray-300"
              >
                Log in
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;