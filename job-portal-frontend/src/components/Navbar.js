
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const navLink = ({ isActive }) =>
    `relative text-2xl font-semibold transition duration-300 ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition duration-300">
              <FaBriefcase size={20} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">
                Job<span className="text-blue-600">Portal</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Find Your Dream Career
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLink}>Home</NavLink>

            <NavLink to="/jobs" className={navLink}>
              Find Jobs
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLink}>
                  Dashboard
                </NavLink>

                <NavLink to="/resume" className={navLink}>
                  Upload Resume
                </NavLink>
              </>
            )}

          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-10">

            {isAuthenticated ? (
              <>
                <FaUserCircle
  onClick={() => navigate("/dashboard")}
  className="text-4xl text-blue-600 cursor-pointer hover:text-indigo-600 transition"
/>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-lg font-semibold rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-300 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-5 py-2 text-lg font-semibold rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium transition"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-5 py-2 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
                >
                  Register
                </NavLink>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-3xl text-blue-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}

        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <div className="rounded-2xl bg-white shadow-lg border">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 hover:bg-blue-50"
            >
              Find Jobs
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 hover:bg-blue-50"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/resume"
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 hover:bg-blue-50"
                >
                  Upload Resume
                </NavLink>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 hover:bg-blue-50"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 hover:bg-blue-50"
                >
                  Register
                </NavLink>
              </>
            )}

          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;