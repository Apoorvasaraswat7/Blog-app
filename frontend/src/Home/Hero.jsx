import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const { blogs } = useAuth();

  return (
    <div className="relative container mx-auto my-10 p-6">
      {/* Hero Title & Tagline */}
      <div className="text-center mb-8">
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-red-600">View</span> <span className="text-blue-600">Point</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-600 mt-2 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          "Bringing perspectives to life, one story at a time. Explore insightful articles, diverse opinions, and engaging narratives curated for a thoughtful audience."
        </motion.p>
      </div>

      {/* Blog Cards Grid (Design Unchanged) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element, index) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className={`relative bg-white shadow-lg overflow-hidden transform transition-all duration-500 group hover:scale-105 hover:shadow-2xl 
              ${index === 0 ? "sm:col-span-2 sm:row-span-2 h-[400px] sm:h-[600px]" : "h-[250px] sm:h-[300px]"}
              w-full`}
            >
              {/* Blog Image */}
              <div className="relative w-full h-full">
                <img
                  src={element.blogImage.url}
                  alt="blog"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-90"></div>

                {/* Blog Title & Author */}
                <div className="absolute bottom-6 left-4 right-4 transition-all duration-700 group-hover:translate-y-[-10px]">
                  <h1 className="text-white text-xl sm:text-2xl font-extrabold leading-tight drop-shadow-xl transition-all duration-500 group-hover:text-blue-400 group-hover:scale-105">
                    {element.title}
                  </h1>
                  <div className="flex items-center mt-3">
                    <img
                      src={element.adminPhoto}
                      alt="Author"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md transition-transform duration-500 group-hover:scale-110"
                    />
                    <p className="ml-3 text-gray-300 text-sm tracking-wide transition-colors duration-500 group-hover:text-gray-100">
                      {element.adminName}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg col-span-full">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
