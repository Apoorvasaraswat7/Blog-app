import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const blogData = blogs ? blogs : [];

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setLoading(false); // Set loading to false when data is available
    }
  }, [blogs]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
        🔥 Trending Blogs
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-lg font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
          {blogData.length > 0 ? (
            blogData.slice(0, 6).map((element) => (
              <div
                key={element._id}
                className="group relative rounded-lg shadow-xl bg-white overflow-hidden mx-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <Link to={`/blog/${element._id}`}>
                  {/* Image Section */}
                  <div className="relative w-full h-80">
                    <img
                      src={element.blogImage?.url || "/default-image.jpg"}
                      alt="blog"
                      className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  </div>

                  {/* Blog Info */}
                  <div className="p-4">
                    <h2 className="text-sm text-gray-500 mt-2 group-hover:text-gray-800 transition-all duration-300">
                      {element.category}
                    </h2>
                    <h1 className="text-xl font-semibold text-blue-600 group-hover:text-blue-500 transition-all duration-300">
                      {element.title}
                    </h1>
                  </div>

                </Link>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-64 text-lg font-semibold text-gray-600">
              No blogs available.
            </div>
          )}
        </Carousel>
      )}
    </div>
  );
}

export default Trending;
