//my idea of the Get started unless ot be moved elsewhere 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For adding animations to components
import { FaUser } from 'react-icons/fa'; // Icon for user; can be replaced with an image if desired

// The GetStarted component renders a user authentication form that allows users to either sign in or sign up.
const GetStarted = () => {
  // State to manage which tab is active ("signin" or "signup")
  const [activeTab, setActiveTab] = useState("signin");

  // State to store input values for the sign-in form
  const [signinData, setSigninData] = useState({ login: "", password: "" });
  // State to store input values for the sign-up form
  const [signupData, setSignupData] = useState({ fullname: "", email: "", password: "" });

  // Handler for updating sign-in input fields (controlled input)
  const handleSigninChange = (e) =>
    setSigninData({ ...signinData, [e.target.name]: e.target.value });

  // Handler for updating sign-up input fields (controlled input)
  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  // Placeholder function for sign-in form submission
  const handleSigninSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", signinData);
  };

  // Placeholder function for sign-up form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", signupData);
  };

  return (
    // Container with a minimum full-screen height, centering its children
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Card container for the form with a white background, rounded corners, and shadow */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        {/* --- User Icon Section --- */}
        <div className="flex justify-center mb-4">
          {/* 
            User icon section: displays a round background with a user icon in the center.
            You can replace this with an image by swapping out the FaUser component.
          */}
          <div className="bg-gray-200 rounded-full p-5">
            <FaUser className="text-gray-500 text-4xl" />
          </div>
        </div>

        {/* --- Tab Headers (Switch between Sign In and Sign Up) --- */}
        <div className="flex justify-center space-x-8 mb-6">
          {/* Sign In Tab Header */}
          <div className="relative pb-2 cursor-pointer group">
            <h2
              onClick={() => setActiveTab("signin")}
              className={`text-lg font-semibold transition-colors ${
                activeTab === "signin" ? "text-black" : "text-gray-400 group-hover:text-gray-600"
              }`}
            >
              Sign In
            </h2>
            {/* Animated underline effect: visible when active or on hover */}
            <span
              className={`absolute left-0 bottom-0 h-[2px] bg-blue-500 transition-all duration-300 
                ${activeTab === "signin" ? "w-full" : "w-0 group-hover:w-full"}
              `}
            ></span>
          </div>

          {/* Sign Up Tab Header */}
          <div className="relative pb-2 cursor-pointer group">
            <h2
              onClick={() => setActiveTab("signup")}
              className={`text-lg font-semibold transition-colors ${
                activeTab === "signup" ? "text-black" : "text-gray-400 group-hover:text-gray-600"
              }`}
            >
              Sign Up
            </h2>
            {/* Animated underline effect similar to Sign In */}
            <span
              className={`absolute left-0 bottom-0 h-[2px] bg-blue-500 transition-all duration-300 
                ${activeTab === "signup" ? "w-full" : "w-0 group-hover:w-full"}
              `}
            ></span>
          </div>
        </div>

        {/* --- Animated Form Section --- */}
        <AnimatePresence mode="wait">
          {activeTab === "signin" ? (
            // Sign In Form with framer-motion animations on enter/exit
            <motion.form
              key="signin"
              onSubmit={handleSigninSubmit}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Login input field */}
              <input
                type="text"
                name="login"
                value={signinData.login}
                onChange={handleSigninChange}
                placeholder="Login"
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-400"
              />
              {/* Password input field */}
              <input
                type="password"
                name="password"
                value={signinData.password}
                onChange={handleSigninChange}
                placeholder="Password"
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-400"
              />
              {/* Submit button for Sign In */}
              <button
                type="submit"
                className="block w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Log In
              </button>
              {/* Link for password recovery */}
              <div className="text-center mt-4">
                <a href="#" className="text-sm text-blue-500 hover:text-blue-700 underline">
                  Forgot Password?
                </a>
              </div>
            </motion.form>
          ) : (
            // Sign Up Form with similar animations as Sign In form
            <motion.form
              key="signup"
              onSubmit={handleSignupSubmit}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Full name input field */}
              <input
                type="text"
                name="fullname"
                value={signupData.fullname}
                onChange={handleSignupChange}
                placeholder="Full Name"
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-400"
              />
              {/* Email input field */}
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="Email"
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-400"
              />
              {/* Password input field */}
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                placeholder="Password"
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-400"
              />
              {/* Submit button for Sign Up */}
              <button
                type="submit"
                className="block w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GetStarted;

