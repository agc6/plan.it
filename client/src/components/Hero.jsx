import { motion } from "framer-motion";
import heroMockup from "../assets/mockup.png";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 bg-gradient-to-b from-white to-gray-100">
      {/* Left Content */}
      <div className="max-w-lg">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-black"
        >
          Plan Your Day, <span className="text-blue-500">Effortlessly</span>
        </motion.h1>
        <p className="text-gray-600 mt-4 text-lg">
          A smart planner to organize tasks, and do stuff and more stuff yasss.
        </p>
        <div className="mt-6 flex space-x-4">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Get Started
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="px-6 py-3 bg-gray-100 text-black rounded-lg shadow-md hover:bg-gray-200"
          >
            Learn More
          </motion.button>
        </div>
      </div>

      {/* Right Side - Image + Floating Elements */}
      <div className="relative w-full max-w-md mt-10 md:mt-0">
      <img src={heroMockup} alt="App Preview" className="w-full drop-shadow-lg" />

        {/* Floating Task Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[-10%] left-[-10%] bg-white p-3 shadow-lg rounded-lg"
        >
          ✅ Meeting at 10 AM
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-[-10%] right-[-10%] bg-white p-3 shadow-lg rounded-lg"
        >
          📅 Grocery List Reminder
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
