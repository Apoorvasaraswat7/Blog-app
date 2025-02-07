import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const Politics = () => {
  const { blogs } = useAuth()
  const politicsBlogs = blogs?.filter((blog) => blog.category === 'politics')
  console.log(politicsBlogs)

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6 animate-fadeIn">Politics</h1>
      <p className="text-center mb-8"></p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {politicsBlogs && politicsBlogs.length > 0 ? (
          politicsBlogs.map((blog, index) => {
            // Determine which cards should be larger
            const isLarge = index === 0
            const isSmall = index !== 0

            return (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className={`relative overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 ${
                  isLarge ? 'col-span-2 row-span-2 h-[600px]' : 'h-[300px]'
                }`}
              >
                <div className="relative h-full">
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-lg font-semibold">{blog.title}</h2>
                    <p className="text-sm">{blog.category}</p>
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="flex h-screen items-center justify-center text-lg font-semibold">
            Loading....
          </div>
        )}
      </div>
    </div>
  )
}

export default Politics
