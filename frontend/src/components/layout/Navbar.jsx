import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Home,
  Search,
  Bell,
  CirclePlus,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
            C
          </div>

          <div>
            <h1 className="font-bold text-xl text-gray-900">
              CampusSphere
            </h1>
            <p className="text-xs text-gray-500">
              Campus Community
            </p>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[340px]">
          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search campus..."
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <Home size={22} />
          </Link>

          {token ? (
            <>
              <button className="text-gray-600 hover:text-blue-600 transition">
                <CirclePlus size={22} />
              </button>

              <button className="text-gray-600 hover:text-blue-600 transition">
                <Bell size={22} />
              </button>

              <Link
                to="/profile"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <User size={22} />
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 transition"
              >
                <LogOut size={22} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}