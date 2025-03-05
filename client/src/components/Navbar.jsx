import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import TempCalendarButton from "./TempCalendarButton"; // adjust the path if needed
import favicon from "../assets/favicon.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={favicon} alt="Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-black">plan.it</h1>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li>
            <a href="#features" className="hover:text-blue-500">
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-500">
              Contact
            </a>
          </li>
        </ul>

        {/* Desktop Login/Sign Up Buttons */}
        <div className="hidden md:flex space-x-3">
          <Link
            to="/login"
            className="px-5 py-2 text-gray-600 hover:text-black"
          >
            Login
          </Link>
          <Link
            to="/get-started"
            className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Sign Up
          </Link>
          <TempCalendarButton />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg py-4 px-6"
          >
            <a href="#features" className="block py-2 text-gray-700">
              Features
            </a>
            <a href="#contact" className="block py-2 text-gray-700">
              Contact
            </a>
            <div className="mt-4 border-t pt-4">
              <Link
                to="/login"
                className="w-full block py-2 text-gray-600 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/get-started"
                className="w-full block py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 mt-2"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
