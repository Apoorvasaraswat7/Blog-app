import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 relative z-[-1] sm:z-auto"
    >
      {/* Profile card container */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="relative">
          {/* Profile image or default icon */}
          {profile?.photo?.url ? (
            <img
              src={profile?.photo?.url}
              alt="avatar"
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex justify-center items-center bg-gray-200">
              <FaUserCircle className="text-gray-500 text-6xl" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
            {/* Profile image in circle */}
            {profile?.photo?.url ? (
              <img
                src={profile?.photo?.url}
                alt="avatar"
                className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
              />
            ) : (
              <FaUserCircle className="text-gray-500 w-24 h-24 mx-auto" />
            )}
          </div>
        </div>
        <div className="px-6 py-8 mt-2">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            {profile?.user?.name || "User Name"}
          </h2>
          <p className="text-center text-gray-600 mt-2">
            {profile?.user?.email || "user@example.com"}
          </p>
          <p className="text-center text-gray-600 mt-2">
            {profile?.user?.phone || "N/A"}
          </p>
          <p className="text-center text-gray-600 mt-2">
            {profile?.user?.role || "User"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
