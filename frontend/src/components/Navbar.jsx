import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdDashboard } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { blogs } = useAuth();
  console.log(blogs);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  console.log(profile?.user);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will go to login page
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className='shadow-lg px-4 py-3 bg-white'>
        <div className='flex items-center justify-between container mx-auto'>
          <div>
            <span className='text-blue-800 font-bold text-lg'>VIEW</span>
            <span className="text-red-800 font-bold text-lg">POINT</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-black">
            <Link to="/" className='hover:text-red-500'>HOME</Link>
            <Link to="/blogs" className='hover:text-red-500'>BLOGS</Link>
            <Link to="/about" className='hover:text-red-500'>ABOUT</Link>
            <Link to="/creators" className='hover:text-red-500'>CREATORS</Link>
            <Link to="/contact" className='hover:text-red-500'>CONTACT</Link>
          </div>

          {/* Action Buttons */}
          <div className='hidden md:flex space-x-4'>
            {isAuthenticated && profile?.user?.role === "admin" && (
              <Link
                to="/dashboard"
                className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-cyan-600 hover: hover:shadow-xl"
              >
                <MdDashboard className="text-lg" />
                DASHBOARD
              </Link>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:from-green-600 hover:to-teal-600 hover: hover:shadow-xl"
              >
                <FiLogIn className="text-lg" />
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:from-red-600 hover:to-pink-600 hover:scale-110 hover:shadow-xl"
              >
                <FiLogOut className="text-lg" />
                LOGOUT
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-black">
            {isMobileMenuOpen ? (
              <IoCloseSharp
                className="text-2xl cursor-pointer"
                onClick={toggleMobileMenu}
              />
            ) : (
              <AiOutlineMenu
                className="text-2xl cursor-pointer"
                onClick={toggleMobileMenu}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 shadow-lg px-6 py-4 space-y-4 text-white">
            <Link to="/" className='block hover:text-red-500'>HOME</Link>
            <Link to="/blogs" className='block hover:text-red-500'>BLOGS</Link>
            <Link to="/about" className='block hover:text-red-500'>ABOUT</Link>
            <Link to="/creators" className='block hover:text-red-500'>CREATORS</Link>
            <Link to="/contact" className='block hover:text-red-500'>CONTACT</Link>

            <div className="space-y-2 mt-4">
              <Link
                to="/dashboard"
                className="block bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <MdDashboard className="text-lg inline-block" />
                Dashboard
              </Link>
              <Link
                to="/login"
                className="block bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <FiLogIn className="text-lg inline-block" />
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
