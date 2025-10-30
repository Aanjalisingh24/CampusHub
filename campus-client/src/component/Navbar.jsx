import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-blue-950 text-white shadow-lg p-4 flex justify-between items-center sticky top-0 z-50">
    
      <div
        className="font-extrabold text-xl tracking-wide cursor-pointer hover:text-yellow-300 transition-colors duration-300"
        onClick={() => navigate("/")}
      >
        CampusHub
      </div>

      <button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

  
      <div className="hidden md:flex gap-4 text-white items-center">
        {token ? (
          <>
            {user && (
              <Link
                to="/profile"
                className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Profile
              </Link>
            )}
            <Link
              to="/dashboard"
              className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Dashboard
            </Link>
            {role === "admin" && (
              <span className="px-2 py-1 text-yellow-300 font-semibold rounded border border-yellow-300">
                Admin
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md font-medium shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-950 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-950 transition-colors duration-300 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-950 transition-colors duration-300 font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-950 flex flex-col items-center gap-4 py-4 md:hidden">
          {token ? (
            <>
              {user && (
                <Link
                  to="/profile"
                  className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              )}
              <Link
                to="/dashboard"
                className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              {role === "admin" && (
                <span className="px-2 py-1 text-yellow-300 font-semibold rounded border border-yellow-300">
                  Admin
                </span>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md font-medium shadow-md transition-all duration-200 transform hover:-translate-y-1"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-950 transition-colors duration-300 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/login"
                className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-950 transition-colors duration-300 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded-md hover:bg-white hover:text-blue-950 transition-colors duration-300 font-medium"
                onClick={() => setMenuOpen(false)}
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

export default Navbar;
