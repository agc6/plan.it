import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TempCalendarButton from "./TempCalendarButton"; // adjust the path if needed its temporary just to check

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo, no image for now */}
        <h1 className="text-2xl font-bold text-black">plan.it</h1>

        {/* Menu, desktop ver. */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li><a href="#features" className="hover:text-blue-500">Features</a></li>
          <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
        </ul>

        {/* Login/sign up Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 text-gray-600 hover:text-black">Login</button>
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Sign Up
          </button>
          {/* Temporary Calendar Button */}
          <TempCalendarButton />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile menu dropdown, pretty responsive thus far */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg py-4 px-6"
          >
            <a href="#features" className="block py-2 text-gray-700">Features</a>
            <a href="#contact" className="block py-2 text-gray-700">Contact</a>
            <div className="mt-4 border-t pt-4">
              <button className="w-full py-2 text-gray-600 hover:text-black">Login</button>
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 mt-2">
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
