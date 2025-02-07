import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from './../dashboard/MyProfile';
import MyBlogs from './../dashboard/MyBlogs';
import CreateBlog from './../dashboard/CreateBlog';
import UpdateBlog from './../dashboard/UpdateBlog';


const Dashboard = () => {
  const { profile, isAuthenticated } = useAuth();
  const [component , setComponent] = useState("My Blogs")

  console.log("Profile:", profile);
  console.log("Authenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Show loading until authentication is confirmed
  }

  return (
    <div >
      <div >
      <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
