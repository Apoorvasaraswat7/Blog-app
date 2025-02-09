import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);
  console.log(admin);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/admins`,
        { withCredentials: true }
      );
      console.log(data.admins);
      setAdmin(data.admins);
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
        Popular Creators
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => {
            return (
              <div key={element._id} className="flex flex-col items-center">
                {/* Centering Image */}
                <img
                  src={element.photo.url}
                  alt="blog"
                  className="w-32 h-32 md:w-56 md:h-56 object-cover border border-black rounded-full"
                />
                
                {/* Centering Text */}
                <div className="text-center mt-3">
                  <p className="font-semibold">{element.name}</p>
                  <p className="text-gray-600 text-sm">{element.role}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Creator;
