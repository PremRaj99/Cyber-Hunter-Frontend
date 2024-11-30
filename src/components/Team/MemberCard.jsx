// import React from 'react';
import {
  FaGithubSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";


export default function MemberCard(memberData) {
  const { name, role, description, socialMedia, photo, portfolio } = memberData.memberData;
  
  return (
    <>
      <div className="w-full md:w-1/2 mx-2 p-2 relative">
        <h4 className=" text-2xl px-4 md:text-4xl font-semibold md:mx-5 text-white  relative z-10 transition-all duration-300">
          {name}
        </h4>
        <h2 className=" px-4 font-semibold md:mx-5 text-white  relative z-10 transition-all duration-300">
          {role}
        </h2>
        <p className=" text-gray-400 text-sm p-4 font- mb-2 md:my-2 md:mx-5 transition-all duration-700">
          {description}
        </p>
        <div className="w-full flex p-4 px-5 md:px-10 md:w-1/2 gap-4  transform  transition-all duration-700">
          <a href={socialMedia.linkedin}>
            <FaLinkedin className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:-translate-y-1 hover:text-brandPrimary transition-all duration-700 hover:cursor-pointer" />
          </a>
          <a href={socialMedia.github}>
            <FaGithubSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
          </a>
          <a href={socialMedia.twitter}>
            <FaTwitterSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
          </a>
          <a href={socialMedia.instagram}>
            <FaInstagramSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
          </a>
        </div>
        <div className="w-full  flex px-5 md:w-1/2">
            <button
              className="btn-primary font-bold hover:bg-black  hover:text-brandPrimary hover:border-2 hover:border-brandPrimary text-black transition-all duration-300" onClick={() => window.open(portfolio, "_blank")}
          >
            Portfolio
            </button>
        </div>
      </div>
      <div className="w-1/2 z-10 overflow-hidden">
        <img
          src={photo}
          alt=""
          className="w-[450px] h-3/4  z-10 object-cover hover:-translate-y-1 transition-all duration-700"
        />
      </div>
    </>
  );
}
