import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Redirect after signup
import { motion } from 'framer-motion'; // Animations
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

const GetStarted = () => {
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate(); // Used for redirecting

  // Handle input changes
  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  // Handle form submission
const handleSignupSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Reset previous errors

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");

    // Save user token and info if they're in the response
    if (data.token) localStorage.setItem("token", data.token);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to the calendar page
      navigate("/calendar");
    } catch (err) {
      setError(err.message);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({ 
      opacity: 1, 
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Centered Form */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 z-10 border border-gray-100"
      >
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex justify-center mb-6"
        >
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-full p-5 shadow-md">
            <FaUser className="text-white text-4xl" />
          </div>
        </motion.div>

        <motion.h2 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-3xl font-bold text-center mb-2"
        >
          Create Account
        </motion.h2>
        
        <motion.p 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-gray-600 text-center mb-8"
        >
          Fill in your details to get started
        </motion.p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center text-sm border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSignupSubmit}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={handleSignupChange}
              placeholder="Full Name"
              required
              className="block w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              placeholder="Email"
              required
              className="block w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
              placeholder="Password"
              required
              className="block w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            Create Account <FaArrowRight className="ml-2" />
          </motion.button>
        </motion.form>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-6 text-center text-gray-600"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
            Sign In
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GetStarted;

