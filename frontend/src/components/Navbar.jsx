import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          CampusSphere
        </Link>

        <div className="flex gap-6">

          <Link
            to="/"
            className="hover:text-gray-200"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/profile"
                className="hover:text-gray-200"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-gray-200"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}