import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const storedImage = localStorage.getItem(`profileImage_${parsedUser._id}`);
      if (storedImage) setImage(storedImage);
    }
  }, []);

  if (!user)
    return (
      <div className="text-white text-center mt-20 text-lg animate-pulse">
        Loading your profile...
      </div>
    );

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : "?";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem(`profileImage_${user._id}`, reader.result);
      alert("Profile picture updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    localStorage.removeItem(`profileImage_${user._id}`);
    alert("Profile picture removed!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-white/20">
        <div className="flex flex-col items-center">
          {/* Profile Image Section */}
          <div className="relative mb-5">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="bg-white text-indigo-800 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold rounded-full shadow-md border-4 border-white">
                {initials}
              </div>
            )}

            <label
              htmlFor="profileUpload"
              className="absolute bottom-1 right-1 sm:bottom-0 sm:right-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 text-xs sm:text-sm cursor-pointer shadow-md transition-transform transform hover:scale-110"
            >
              📷
            </label>
            <input
              id="profileUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2">
            Hello, {user.name} 👋
          </h2>

          <div className="bg-white/20 rounded-xl p-4 sm:p-5 md:p-6 text-left space-y-3 sm:space-y-4 w-full shadow-inner text-white">
            <div className="text-sm sm:text-base">
              <span className="font-semibold">👤 Name:</span> {user.name}
            </div>
            <div className="text-sm sm:text-base break-all">
              <span className="font-semibold">📧 Email:</span> {user.email}
            </div>
            <div className="text-sm sm:text-base">
              <span className="font-semibold">🛡️ Role:</span>{" "}
              <span className="capitalize">{user.role}</span>
            </div>
          </div>

          {/* Remove Image Button */}
          {image && (
            <button
              onClick={handleRemoveImage}
              className="mt-5 text-sm sm:text-base text-red-300 hover:text-red-400 underline transition"
            >
              Remove Profile Picture
            </button>
          )}

          {/* Footer Info */}
          <p className="text-indigo-300 text-xs sm:text-sm mt-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
