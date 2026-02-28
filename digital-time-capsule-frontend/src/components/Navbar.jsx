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

    if (path === "/dashboard" || path === "/create" || path === "/settings") {
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
            color: "#111827",
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
