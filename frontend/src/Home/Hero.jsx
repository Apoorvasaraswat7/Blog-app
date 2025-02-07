import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Hero = () => {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-10 p-6">
      {/* Symmetric Masonry Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element, index) => {
            // Determine which blogs should be large and which should be small
            const isLarge = index === 0;  // The first blog will be large
            const isSmall = index !== 0;  // Other blogs will be small

            return (
              <Link
                to={`/blog/${element._id}`}
                key={element._id}
                className={`relative bg-white shadow-lg overflow-hidden transform transition-all duration-500 group hover:scale-105 hover:shadow-2xl ${
                  isLarge ? "col-span-2 row-span-2 h-[600px]" : "h-[300px]"
                }`}
              >
                {/* Blog Image with 3D Hover Effect */}
                <div className="relative w-full h-full">
                  <img
                    src={element.blogImage.url}
                    alt="blog"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Floating Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-90"></div>

                  {/* Blog Title & Author Info */}
                  <div className="absolute bottom-6 left-4 right-4 transition-all duration-700 group-hover:translate-y-[-10px]">
                    <h1 className="text-white text-2xl font-extrabold leading-tight drop-shadow-xl transition-all duration-500 group-hover:text-blue-400 group-hover:scale-105">
                      {element.title}
                    </h1>
                    <div className="flex items-center mt-4">
                      <img
                        src={element.adminPhoto}
                        alt="Author"
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md transition-transform duration-500 group-hover:scale-110"
                      />
                      <p className="ml-3 text-gray-300 text-sm tracking-wide transition-colors duration-500 group-hover:text-gray-100">
                        {element.adminName}
                      </p>
                    </div>
                  </div>
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
};

export default Hero;
