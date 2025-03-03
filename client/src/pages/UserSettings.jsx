import { useState } from "react";

const UserSettings = () => {
  const [user, setUser] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "emailis@private.com",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Changes saved successfully!"); // Replace with actual save function
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">First name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Last name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
            />
          </div>
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
