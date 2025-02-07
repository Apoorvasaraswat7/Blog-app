import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-extrabold text-center mb-4">📖 All Blogs</h1>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
        Explore a diverse collection of blogs across various topics and
        categories.
      </p>

      {/* Masonry Grid - Compact Spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog, index) => {
            const isLarge = index % 5 === 0; // Every 5th blog is larger

            return (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className={`relative overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isLarge ? "row-span-2 h-[400px]" : "h-[250px]"
                }`}
              >
                {/* Blog Image */}
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-500 hover:bg-opacity-60"></div>

                {/* Blog Details */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h2 className="text-lg font-semibold leading-tight">
                    {blog?.title}
                  </h2>
                  <p className="text-xs opacity-80">{blog?.category}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center text-gray-500 text-lg">No blogs found.</div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
