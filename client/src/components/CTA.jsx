import { useNavigate } from "react-router-dom";
const CTA = () => {

  const navigate = useNavigate();
    // Call to action stuff
    return (
      <section className="py-16 bg-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold">Start Planning Today!</h2>
        <p className="mt-2">Join thousands of users making their days more productive.</p>
        <button
          onClick={() => navigate("/get-started")}
          className="mt-4 px-6 py-3 bg-white text-blue-500 rounded-lg shadow-md hover:bg-gray-200"
        >
          Get Started
        </button>
      </section>
    );
  };
  
  export default CTA;
  