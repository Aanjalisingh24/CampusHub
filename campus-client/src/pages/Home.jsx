import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

    useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white text-center px-6 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 sm:w-56 sm:h-56 bg-blue-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-72 sm:h-72 bg-purple-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>

      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg tracking-tight leading-tight"
      >
        Welcome to <span className="text-yellow-300">CampusHub</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-100 px-2 sm:px-6"
      >
        CampusHub is your all-in-one campus management system connecting{" "}
        <span className="font-semibold text-yellow-200">students</span>,{" "}
        <span className="font-semibold text-yellow-200">teachers</span>, and{" "}
        <span className="font-semibold text-yellow-200">admins</span> in one
        smart platform. Access courses, assignments, and campus updates effortlessly.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10"
      >
        <button
          onClick={handleGetStarted}
          className="bg-yellow-300 text-indigo-900 font-bold px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
        >
          Get Started
        </button>
      </motion.div>

      {/* Decorative Gradient Border (for larger screens) */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600"></div>
    </section>
  );
}

export default Home;
