import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });

    
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

      useEffect(() => {
  
  document.body.classList.add("no-scroll");

  
  return () => {
    document.body.classList.remove("no-scroll");
  };
}, []);

  return (
   <section className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white px-6">

  <div className="absolute top-10 left-10 w-40 h-40 sm:w-56 sm:h-56 bg-blue-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
  <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-72 sm:h-72 bg-purple-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>

 
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md 
             -mt-24 sm:mt-0"
  >
    <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 text-center mb-6 drop-shadow-sm">
      Login
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-300 text-indigo-900 font-bold py-3 sm:py-3.5 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
      >
        Login
      </button>
    </form>

    <p className="text-sm text-gray-600 text-center mt-5">
      Don’t have an account?{" "}
      <a
        href="/register"
        className="text-blue-950 font-semibold hover:underline underline-offset-4 decoration-yellow-300"
      >
        Register
      </a>
    </p>
  </motion.div>
</section>

  );
}

export default Login;
