import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await API.post("/users/register", { name, email, password, role });
      alert("Registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <motion.div
    className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md -mt-24 sm:mt-0"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 text-center mb-6">
      Create Your Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition"
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-yellow-300 text-indigo-800 font-bold px-8 py-3 rounded-full shadow-md transition-all duration-200 ${
          loading
            ? 'opacity-70 cursor-not-allowed'
            : 'hover:bg-yellow-400 hover:scale-105'
        }`}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>

    <p className="text-sm text-gray-600 text-center mt-5">
      Already have an account?{' '}
      <a
        href="/login"
        className="text-blue-950 font-medium hover:underline transition"
      >
        Login
      </a>
    </p>
  </motion.div>
</div>

  );
}

export default Register;
