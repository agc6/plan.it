import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarCheck, FaBell, FaSyncAlt } from "react-icons/fa";

const features = [
  { 
    title: "Smart Scheduling", 
    desc: "Blah Blah Blah Blah.", 
    icon: <FaCalendarCheck className="text-white text-3xl" />,
    bgColor: "bg-blue-500"
  },
  { 
    title: "Reminders & Alerts", 
    desc: "No not really LOL.", 
    icon: <FaBell className="text-white text-3xl" />,
    bgColor: "bg-green-500"
  },
  { 
    title: "Feature Number 3", 
    desc: "Blah Blah Blah Blah", 
    icon: <FaSyncAlt className="text-white text-3xl" />,
    bgColor: "bg-purple-500"
  }
];

const Features = () => {
  // Trigger animations when section is in view after refresh
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="features" className="py-20 bg-gray-50">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-black"
        >
          Why Choose <span className="text-blue-500">plan.it?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={inView ? { opacity: 1 } : { opacity: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-600 mt-3"
        >
          Everything you need to stay organized and productive.
        </motion.p>
      </div>

      {/* Features grid, potentially change to more horizonal in future?*/}
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {features.map((feat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }} 
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            className="bg-white shadow-lg rounded-lg p-6 flex items-start space-x-4 hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            {/* Icon */}
            <div className={`w-14 h-14 flex items-center justify-center rounded-full ${feat.bgColor}`}>
              {feat.icon}
            </div>

            {/* Feature Content */}
            <div>
              <h3 className="text-xl font-bold text-black">{feat.title}</h3>
              <p className="text-gray-600 mt-2">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
