import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Redirect after signup
import { motion } from 'framer-motion'; // Animations
import { FaUser } from 'react-icons/fa';

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

      // Save user token and info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to the calendar page
      navigate("/calendar");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* User Icon Section */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 rounded-full p-5">
            <FaUser className="text-gray-500 text-4xl" />
          </div>
        </div>

        
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Animated Sign Up Form */}
        <motion.form
          onSubmit={handleSignupSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleSignupChange}
            placeholder="Full Name"
            required
            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            placeholder="Email"
            required
            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
            placeholder="Password"
            required
            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="block w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default GetStarted;

