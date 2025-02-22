// I wan tto chnage this somewhere else I dont want this to be the main get strated
//Goal is to a have a nice Loig in or sign up
//if sign up then itll be the code similar to this under here 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const steps = [
  { id: 1, question: "What's your first name and last name?", field: "name" },
  { id: 2, question: "What's your phone number?", field: "phone" },
  { id: 3, question: "What are you using this for? (School, work, teacher, etc.)", field: "usage" },
];

const GetStarted = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    usage: '',
  });

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      // Final submission logic here (e.g., API call)
      console.log("Form submitted:", formData);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">{currentStep.question}</h2>
          <input
            type="text"
            name={currentStep.field}
            value={formData[currentStep.field]}
            onChange={handleChange}
            placeholder="Enter here"
            className="w-full border border-gray-300 p-2 rounded mb-6"
          />
          <div className="flex justify-between items-center">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <FaArrowLeft className="mr-1" /> Back
              </button>
            ) : (
              <div /> // Placeholder to keep spacing consistent
            )}
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {step < steps.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GetStarted;
