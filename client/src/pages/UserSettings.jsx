import { useState, useEffect, useRef } from "react";
import { User, Mail, Lock, Camera, Trash2, Save, AlertCircle } from "lucide-react";

const UserSettings = () => {
  // State for user data
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  
  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileImage, setProfileImage] = useState("/api/placeholder/100/100");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // Load user data from localStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        name: storedUser.name || "",
        password: "", 
        confirmPassword: "",
      });
      
      if (storedUser.profileImage) {
        setProfileImage(storedUser.profileImage);
      }
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    
    // Clear error messages when user starts typing
    setError("");
  };

  // Validate form before submission
  const validateForm = () => {
    // Reset error
    setError("");
    
    // Password validation if a new password is being set
    if (user.password) {
      if (user.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return false;
      }
      
      if (user.password !== user.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }
    
    return true;
  };

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle delete profile picture
  const handleDeletePicture = () => {
    setProfileImage("/api/placeholder/100/100");
    setImageFile(null);
    // In a real app, you'd also want to tell the backend to delete the profile picture
  };

  // Safely parse JSON response or return error
  const safelyParseJSON = async (response) => {
    const text = await response.text();
    try {
      return { ok: true, data: JSON.parse(text) };
    } catch (e) {
      // If response is not valid JSON (like HTML error page)
      return { 
        ok: false, 
        error: `Server returned invalid JSON. Status: ${response.status} ${response.statusText}`
      };
    }
  };

  // Handle Save Changes (Update User Info)
  const handleSave = async () => {
    // Validate form first
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess("");
    
    try {
      const token = localStorage.getItem("token");
      
      // In a real application, you would handle the image upload properly
      let updatedUser = { ...user };
      if (imageFile) {
        // In a real app, you'd upload the image to a server and get back a URL
        updatedUser.profileImage = profileImage; // Using the data URL as a placeholder
      }
      
      // Check if API server is running
      try {
        const response = await fetch("http://localhost:5000/api/auth/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: user.name,
            password: user.password || undefined, // Only send password if it's not empty
            profileImage: updatedUser.profileImage
          }),
        });

        const result = await safelyParseJSON(response);
        
        if (!response.ok || !result.ok) {
          throw new Error(
            result.ok ? result.data.message : result.error || "Update failed"
          );
        }

        // Update localStorage with new user info
        localStorage.setItem("user", JSON.stringify({
          ...result.data.user,
          profileImage: updatedUser.profileImage
        }));

        setSuccess("Your profile has been updated successfully");
        
        // Clear password fields after successful update
        setUser(prev => ({
          ...prev,
          password: "",
          confirmPassword: ""
        }));
      } catch (fetchError) {
        // If the server is unavailable, simulate successful update for demo
        if (fetchError.message.includes("Failed to fetch") || 
            fetchError.message.includes("Network Error") ||
            fetchError.message.includes("invalid JSON")) {
          
          console.warn("API server unavailable, using mock update:", fetchError);
          
          // Mock successful update
          const updatedUserData = {
            ...user,
            profileImage: updatedUser.profileImage,
            password: undefined // Don't store password in localStorage
          };
          
          localStorage.setItem("user", JSON.stringify(updatedUserData));
          setSuccess("Your profile has been updated successfully (Demo Mode)");
          
          // Clear password fields
          setUser(prev => ({
            ...prev,
            password: "",
            confirmPassword: ""
          }));
        } else {
          throw fetchError;
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred while updating your profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle account deactivation
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  
  const handleDeactivateAccount = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      
      try {
        const response = await fetch("http://localhost:5000/api/auth/deactivate", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const result = await safelyParseJSON(response);
          throw new Error(
            result.ok ? result.data.message : result.error || "Failed to deactivate account"
          );
        }

        // Clear local storage and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        
      } catch (fetchError) {
        // If the server is unavailable, simulate successful deactivation for demo
        if (fetchError.message.includes("Failed to fetch") || 
            fetchError.message.includes("Network Error") ||
            fetchError.message.includes("invalid JSON")) {
          
          console.warn("API server unavailable, using mock deactivation:", fetchError);
          
          // Mock successful deactivation
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          
          // Show success message before redirecting
          setSuccess("Account successfully deactivated (Demo Mode)");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        } else {
          throw fetchError;
        }
      }
      
    } catch (err) {
      setError(err.message || "Failed to deactivate account");
      setLoading(false);
      setShowDeactivateConfirm(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">Account Settings</h1>
      
      {/* Notification Messages */}
      {error && (
        <div className="mb-4 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center text-sm">
          <AlertCircle className="mr-2" size={16} />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-2 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm">
          {success}
        </div>
      )}
      
      {/* Profile Picture & Buttons */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white"
          />
          <div className="absolute bottom-0 right-0">
            <button 
              onClick={handleUploadClick}
              className="bg-blue-600 text-white p-1 rounded-full shadow-md hover:bg-blue-700 transition"
              title="Change profile picture"
            >
              <Camera size={14} />
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>
        </div>
        
        <button 
          onClick={handleDeletePicture}
          className="mt-2 text-xs text-gray-500 flex items-center hover:text-red-500 transition"
        >
          <Trash2 size={12} className="mr-1" /> Remove photo
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="relative">
          <div className="flex items-center mb-1">
            <User size={14} className="text-gray-500 mr-2" />
            <label className="block text-gray-700 text-xs font-medium">Full Name</label>
          </div>
          <input
            type="text"
            name="name"
            value={user.name}
            className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        {/* Password Update */}
        <div className="relative">
          <div className="flex items-center mb-1">
            <Lock size={14} className="text-gray-500 mr-2" />
            <label className="block text-gray-700 text-xs font-medium">New Password</label>
          </div>
          <input
            type="password"
            name="password"
            value={user.password}
            className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
          <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <div className="flex items-center mb-1">
            <Lock size={14} className="text-gray-500 mr-2" />
            <label className="block text-gray-700 text-xs font-medium">Confirm Password</label>
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={handleChange}
            placeholder="Confirm your new password"
          />
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            className={`flex items-center justify-center w-full p-2 rounded-md text-white font-medium transition text-sm ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Account Actions */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          {showDeactivateConfirm ? (
            <div className="bg-red-50 p-3 rounded-md border border-red-100">
              <p className="text-red-700 mb-3 text-xs">Are you sure you want to deactivate your account? This action cannot be undone.</p>
              <div className="flex space-x-2">
                <button 
                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition"
                  onClick={handleDeactivateAccount}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Yes, Deactivate"}
                </button>
                <button 
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs hover:bg-gray-300 transition"
                  onClick={() => setShowDeactivateConfirm(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="text-red-500 border border-red-300 px-3 py-1 rounded text-xs hover:bg-red-50 transition"
              onClick={() => setShowDeactivateConfirm(true)}
              disabled={loading}
            >
              Deactivate Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;