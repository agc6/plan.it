import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarCheck, FaBell, FaSyncAlt, FaChartLine, FaClock, FaMobileAlt } from "react-icons/fa";

const features = [
  { 
    title: "Smart Scheduling", 
    desc: "Plan your day based on priority, and available time slots.", 
    icon: <FaCalendarCheck className="text-white text-2xl" />,
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600"
  },
  { 
    title: "Personalized Planning", 
    desc: "Create a custom dashboard with your choice of visualization styles.", 
    icon: <FaChartLine className="text-white text-2xl" />,
    bgColor: "bg-gradient-to-br from-green-400 to-green-600"
  },
  { 
    title: "Automatic Roll Over", 
    desc: "Unfinished tasks move to optimal time slots in upcoming days.", 
    icon: <FaSyncAlt className="text-white text-2xl" />,
    bgColor: "bg-gradient-to-br from-purple-400 to-purple-600"
  },
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="features" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-12 -left-24 w-80 h-80 bg-purple-100 rounded-full opacity-50"></div>
        <svg className="absolute left-0 right-0 w-full h-1" viewBox="0 0 1440 58" preserveAspectRatio="none" fill="none">
          <path d="M0 57L48 50.7C96 44.3 192 31.7 288 25.3C384 19 480 19 576 25.3C672 31.7 768 44.3 864 44.3C960 44.3 1056 31.7 1152 25.3C1248 19 1344 19 1392 19H1440V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V57Z" fill="#FFFFFF"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4"
          >
            POWERFUL FEATURES
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent"
          >
            Why Choose <span className="bg-blue-500 bg-clip-text text-transparent">plan.it?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={inView ? { opacity: 1 } : { opacity: 0 }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg"
          >
            Everything you need to stay organized, focused, and productive throughout your day.
          </motion.p>
        </div>

        {/* Features grid with hover effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }} 
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} 
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative group overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full opacity-10 bg-gray-800 group-hover:scale-150 transition-transform duration-500"></div>
              
              {/* Icon */}
              <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${feat.bgColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-bold text-gray-800 mt-5 group-hover:text-blue-600 transition-colors duration-300">{feat.title}</h3>
              <p className="text-gray-600 mt-3 leading-relaxed">{feat.desc}</p>
              
              {/* Learn More Link */}
              <div className="mt-5 flex items-center space-x-1 text-blue-500 group-hover:text-blue-600 transition-colors duration-300">
                <span className="font-medium text-sm">Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
