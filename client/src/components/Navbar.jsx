import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import TempCalendarButton from "./TempCalendarButton"; // adjust the path if needed
import favicon from "../assets/favicon.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 w-full backdrop-blur-lg z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-lg" : "bg-white/70"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo with Animation */}
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img 
            src={favicon} 
            alt="Logo" 
            className="w-8 h-8"
            animate={{ rotate: scrolled ? 0 : [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }} 
          />
          <motion.h1 
            className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            plan.it
          </motion.h1>
        </motion.div>

        {/* Desktop Navigation Links with Hover Effects */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          {["features", "contact"].map((item, i) => (
            <motion.li key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (i + 1) }}
            >
              <a 
                href={`#${item}`} 
                className="relative group py-2"
              >
                <span className="group-hover:text-blue-500 transition-colors">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Login/Sign Up Buttons with Hover Effects */}
        <div className="hidden md:flex space-x-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/login"
              className="px-5 py-2 text-gray-600 hover:text-black relative group"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/get-started"
              className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Sign Up
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <TempCalendarButton />
          </motion.div>
        </div>

        {/* Mobile Menu Toggle with Animation */}
        <motion.button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            className={`w-6 h-0.5 bg-gray-700 block transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1' : ''}`}
          ></motion.span>
          <motion.span 
            className={`w-6 h-0.5 bg-gray-700 block mt-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
          ></motion.span>
          <motion.span 
            className={`w-6 h-0.5 bg-gray-700 block mt-1 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`}
          ></motion.span>
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg py-4 px-6 overflow-hidden"
          >
            {["features", "contact"].map((item, i) => (
              <motion.a 
                key={i}
                href={`#${item}`} 
                className="block py-3 text-gray-700 border-b border-gray-100 hover:text-blue-500 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
            
            <motion.div 
              className="mt-4 pt-2 space-y-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/login"
                className="w-full block py-2 text-center border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/get-started"
                className="w-full block py-2 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
