import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa"; 
import toast from "react-hot-toast";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => setComponent(value);
  const gotoHome = () => navigateTo("/");
  
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.data.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 cursor-pointer p-2 bg-gray-800 text-white shadow-lg rounded-full hover:bg-gray-700 transition duration-300"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl" />
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 h-full fixed top-0 left-0 bg-gray-900 shadow-xl 
        transition-transform duration-500 transform sm:translate-x-0 
        ${show ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button (Mobile) */}
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer text-gray-300 hover:text-gray-100 transition"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center py-6 border-b border-gray-700">
          {profile?.user?.photo?.url ? (
            <img
              className="w-20 h-20 rounded-full border-4 border-gray-700 shadow-lg"
              src={profile.user.photo.url}
              alt="Profile"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-gray-400" />
          )}
          <p className="mt-3 text-lg font-semibold text-white">{profile?.user?.name || "Guest"}</p>
          <p className="text-sm text-gray-400">{profile?.user?.email || "No email available"}</p>
        </div>

        {/* Navigation Menu */}
        <ul className="mt-6 px-4 space-y-3">
          <MenuItem label="📖 My Blogs" onClick={() => handleComponents("My Blogs")} color="bg-green-600" />
          <MenuItem label="✍️ Create Blog" onClick={() => handleComponents("Create Blog")} color="bg-blue-600" />
          <MenuItem label="👤 My Profile" onClick={() => handleComponents("My Profile")} color="bg-purple-600" />
          <MenuItem label="🏠 Home" onClick={gotoHome} color="bg-teal-600" />
          <MenuItem label="🚪 Logout" onClick={handleLogout} color="bg-red-600" />
        </ul>
      </div>
    </>
  );
}

const MenuItem = ({ label, onClick, color }) => (
  <button
    onClick={onClick}
    className={`${color} w-full px-4 py-2 rounded-lg shadow-md hover:bg-opacity-80 transition duration-300 text-lg font-medium text-white`}
  >
    {label}
  </button>
);

export default Sidebar;
