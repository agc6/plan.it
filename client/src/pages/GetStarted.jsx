import { useState } from 'react';
import { motion } from 'framer-motion'; // For adding animations to the component
import { FaUser } from 'react-icons/fa'; // User icon

const GetStarted = () => {
  // State to store input values for the sign-up form
  const [signupData, setSignupData] = useState({ fullname: "", email: "", password: "" });

  // Handler for updating sign-up input fields (controlled input)
  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  // Placeholder function for sign-up form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", signupData);
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
            name="fullname"
            value={signupData.fullname}
            onChange={handleSignupChange}
            placeholder="Full Name"
            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            placeholder="Email"
            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
            placeholder="Password"
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
