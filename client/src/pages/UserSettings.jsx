import { useState, useEffect } from "react";

const UserSettings = () => {
  // State for user data
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Load user data from localStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        name: storedUser.name || "",
        email: storedUser.email || "",
        password: "", // Do not load password for security reasons
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save Changes (Update User Info)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token"); // Get user token
      const response = await fetch("http://localhost:5000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");

      // Update localStorage with new user info
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Changes saved successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      {/* Profile Picture & Buttons */}
      <div className="flex flex-col items-center">
        <img
          src="https://via.placeholder.com/100" // Replace with actual profile picture URL
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm">
            Change picture
          </button>
          <button className="border border-gray-400 px-4 py-2 rounded-md text-sm">
            Delete picture
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="mt-6">
        <div className="mt-4">
          <label className="block text-gray-700 text-sm mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
          />
        </div>

        {/* Password Update */}
        <div className="mt-4">
          <label className="block text-gray-700 text-sm mb-1">New Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>

        {/* Account Actions */}
        <div className="mt-6 border-t pt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

