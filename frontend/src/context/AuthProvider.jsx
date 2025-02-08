import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token"); // Get token from cookies
        if (!token) return; // If token doesn't exist, stop execution

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/my-profile`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched Profile Data:", data);
        setProfile(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/all-blogs`, {
          withCredentials: true,
        });

        console.log("Fetched Blogs:", data);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
