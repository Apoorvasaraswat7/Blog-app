import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaTag } from "react-icons/fa";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blogs/my-blog`,
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to delete blog");
      });
  };

  return (
    <div className="flex">
      {/* Sidebar space */}
      <div className="w-64 hidden sm:block"></div>

      {/* Blog Cards Container */}
      <div className="flex-1 p-4 transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                className="bg-gray-900 shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-500"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage.url}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 text-white">
                <div className="flex items-center gap-2 text-sm">
                    <FaTag className="text-yellow-300" />
                    <span>{element.category}</span>
                  </div>

                  <h4 className="text-2xl font-semibold mt-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                       className="flex items-center gap-2 text-white bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      <FaEdit />
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="flex items-center gap-2 text-white bg-red-700 px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                       <FaTrash />
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
