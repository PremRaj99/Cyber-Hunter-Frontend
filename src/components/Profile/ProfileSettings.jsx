import React from "react";
import bgImage from "../../assets/bg-home.jpg"; // Background image
import pen from "../../assets/pen.png";

const ProfileSettings = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-white relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70">
        

      </div>

      {/* Profile Card */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-lg shadow-lg p-8 w-11/12 max-w-[900px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-600 pb-4">
          <h2 className="text-cyan-400 font-bold text-2xl">Profile Settings</h2>
          <span className="text-green-400 font-bold text-lg">600 pts</span>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mt-10">
          <div className="relative bg-cyan-300 p-8 mx-5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-black"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a5 5 0 100 10A5 5 0 0010 3zM3 18a7 7 0 0114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <img
              src={pen}
              alt="edit"
              className="h-8 w-8 absolute right-0 rounded-full p-1"
            />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <img
              src={pen}
              alt="edit"
              className="h-8 w-8 rounded-full p-1"
            />
              <span className="text-cyan-400 font-bold text-xl">Code Builder</span>

          </div>
        </div>

        {/* User Information */}
        <div className=" gap-4 mt-6 text-center text-sm">
          <p>
            <span className="font-semibold mr-24">User Name</span> Prem_2004
          </p>
          <p>
            <span className="font-semibold mr-36">Course</span> BTech
          </p>
          <p>
            <span className="font-semibold mr-36">Branch</span> CSE
          </p>
          <p>
            <span className="font-semibold mr-28">Session</span> 2022-2026
          </p>
          <p>
            <span className="font-semibold mr-36">Q-Id</span> 22030179
          </p>
          <p>
            <span className="font-semibold mr-36">Gender</span> Male
          </p>
        </div>

        {/* Social Media Icons */}
        <div className=" text-center relative flex justify-center">
        <div className="flex justify-center mt-6 space-x-6 rounded-2xl bg-cyan-300 pb-2 pt-2 w-80" >
          
        <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer rounded-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="" />
           <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/800px-Instagram_logo_2022.svg.png" alt="" />
           <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer bg-gray-300 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png" alt="" />
           <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer" src="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png" alt="" />

        </div>
        <button>
        <img
              src={pen}
              alt="edit"
              className="h-8 w-8 absolute rounded-full p-1"
            />
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProfileSettings;
