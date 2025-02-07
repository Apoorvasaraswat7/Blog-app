import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <h2 className="text-lg font-semibold mb-2">About Us</h2>
            <p className="text-gray-400 text-sm">
              Welcome to our blog platform where we share insightful articles on various topics.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
              <Link to="/creators" className="text-gray-400 hover:text-white">
                  Creators
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaInstagram />
              </a>  
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Your Blog Name. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
