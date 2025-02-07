import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Devotional = () => {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "devotional");

  return (
    <div className="container mx-auto my-12 p-6">
      {/* Section Header */}
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6 animate-fadeIn">
        ✨ Devotional ✨
      </h1>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto animate-fadeIn delay-200">
        Devotional blogs inspire faith, share spiritual wisdom, explore religious teachings, and offer guidance through prayers, meditation, and uplifting reflections.
      </p>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          devotionalBlogs.map((blog, index) => (
            <Link
              to={`/blog/${blog._id}`}
              key={index}
              className="relative  overflow-hidden shadow-xl bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-fadeIn delay-300"
              style={{
                animationDelay: `${index * 100}ms`,
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
            >
              {/* Image & Overlay */}
              <div className="relative h-80 group">
                <img
                  src={blog.blogImage.url}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                {/* Floating Badge */}
                <p className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse group-hover:scale-110">
                  {blog.category}
                </p>
              </div>

              {/* Blog Title & Author */}
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-white text-2xl font-bold drop-shadow-lg transition-all duration-500 hover:text-yellow-400">
                  {blog.title}
                </h2>
                <div className="flex items-center mt-3">
                  <img
                    src={blog.adminPhoto}
                    alt="Author"
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md transform transition-all group-hover:scale-110"
                  />
                  <p className="ml-3 text-gray-300 text-sm group-hover:text-white transition-all duration-500">
                    {blog.adminName}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-500 text-lg">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Devotional;
