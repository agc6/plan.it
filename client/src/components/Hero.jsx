import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroMockup from "../assets/mockup.png";

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({ 
      opacity: 1, 
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8 }
    })
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-evenly z-10 py-12">
      {/* Left Content */}
      <div className="max-w-lg">
          <motion.div 
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.span 
              variants={fadeInUp}
              custom={0}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4"
            >
              Smart Planning Made Simple
            </motion.span>            
        <motion.h1 
              variants={fadeInUp}
              custom={1}
          className="text-4xl md:text-6xl font-bold"
        >
          Plan Your Day, <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Effortlessly</span>
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          custom={2}
          className="text-gray-600 mt-6 text-lg"
        >
          A smart planner to organize your workflow and tasks, set priorities, and achieve your goals with ease.
        </motion.p>    
        <motion.div 
              variants={fadeInUp}
              custom={3}
              className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to="/calendar">
          <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
            Get Started For Free
                </motion.button>
              </Link>

              <a 
                href="https://www.youtube.com/watch?v=5wvedW2masE" 
                target="_blank" 
                rel="noopener noreferrer"
              >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
          >
                <span>Watch Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
          </motion.button>
              </a>
        </motion.div>          
        </motion.div>
      </div>

      {/* Right Side - Image + Floating Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-lg mt-10 md:mt-0"
        >
          {/* Animated Glowing Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-lg opacity-30 animate-pulse"></div>
          
          {/* Main App Preview */}
          <img 
            src={heroMockup} 
            alt="App Preview" 
            className="relative w-full drop-shadow-2xl rounded-xl"
          />

          {/* Floating Task Cards */}
          <motion.div 
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: -30, y: -30 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-0 left-0 bg-white p-4 shadow-xl rounded-lg flex items-center space-x-3 border-l-4 border-green-500"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Meeting Completed</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50, y: -20 }}
            animate={{ opacity: 1, x: 30, y: -20 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute top-1/3 right-0 bg-white p-4 shadow-xl rounded-lg border-l-4 border-blue-500"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Reminder</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Project deadline tomorrow</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -30, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 30 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-0 right-1/4 bg-white p-4 shadow-xl rounded-lg border-l-4 border-purple-500"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">Weekly Progress</span>
              <span className="text-green-500">+27%</span>
            </div>
            <div className="w-full h-2 mt-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '72%' }}></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
