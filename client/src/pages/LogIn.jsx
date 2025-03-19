import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect after login
import { FaUser } from "react-icons/fa";

const LogIn = () => {
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate(); // Used for redirecting

  // Handle input changes
  const handleSigninChange = (e) =>
    setSigninData({ ...signinData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // Save user token and info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to the calendar page
      navigate("/calendar");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 rounded-full p-5">
            <FaUser className="text-gray-600 text-3xl" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSigninSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signinData.email}
            onChange={handleSigninChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signinData.password}
            onChange={handleSigninChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;