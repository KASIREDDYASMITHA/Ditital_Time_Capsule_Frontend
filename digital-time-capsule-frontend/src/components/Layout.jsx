import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Moon, Sun, Clock } from "lucide-react";

function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#070716] transition-colors duration-300">
      {/* NAVBAR */}

      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-[#070716] relative">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center shadow-md">
            <Clock size={18} className="text-white" />
          </div>

          {/* Brighter logo text */}
          <span className="text-gray-900 dark:text-white tracking-wide">
            TimeCapsule
          </span>
        </Link>

        {/* RIGHT SIDE */}

        <div className="hidden md:flex items-center gap-5">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-700" />
            )}
          </button>

          {/* 🔥 GRADIENT LOGIN TEXT */}
          <Link
            to="/login"
            // className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition"
            className="
             px-5 py-2 rounded-xl font-medium
             border border-gray-300
             text-gray-800
              hover:bg-gray-100
               transition
              dark:border-white
               dark:text-white
               dark:hover:bg-white/10
             "
          >
            Log in
          </Link>

          {/* GET STARTED */}
          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-medium hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
        {/* MOBILE HAMBURGER */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700"
          >
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white"></span>
              <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white"></span>
              <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white"></span>
            </div>
          </button>
        </div>
        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-[#070716] shadow-md md:hidden flex flex-col items-center gap-4 py-6 z-50">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
            >
              {darkMode ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-gray-700" />
              )}
            </button>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 dark:text-white"
            >
              Log in
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
