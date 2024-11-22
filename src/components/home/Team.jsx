// import React from 'react';
import { Carousel } from "flowbite-react";
import namanPic from "../../assets/team/namanKumar.png";
import yashRana from "../../assets/team/yashRana.png";

import {
  FaGithubSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
export default function Team() {
  return (
    <div>
      <div className="mt-10 mb-9">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-4xl font-extrabold text-brandPrimary text-500 text-center  md:m-4  border-b-2 md:p-4 border-brandPrimary">
            Our Team
          </span>
          <div className="mt-8">
            <p className="text-sm sm:text-base text-white max-w-2xl mx-auto">
              Meet With our Team Members who are passionate about their work and
              dedicated to delivering exceptional results.
            </p>
          </div>
        </div>
        <div className=" lg:px-16 max-w-screen-2xl mx-auto h-[600px]  md:h-[500px] ">
          <Carousel indicators={false} className="w-full my-auto mb-[80px] ">
            <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl items-center  md:gap-10 bg-transparent border">
              {/* Member One */}
              <div className="w-full md:w-1/2 mx-2 p-2 relative">
                <h4 className=" text-3xl p-4 md:text-4xl font-semibold md:mx-5 text-white  relative z-10 transition-all duration-300">
                  Naman Kumar
                </h4>
                <p className=" text-gray-400 text-sm p-4 font- mb-2 md:my-2 md:mx-5 transition-all duration-700">
                  Cyberhunter is a platform by the Cyberhunter Club to empower
                  tech enthusiasts with hands-on learning in cybersecurity,
                  blockchain, Web3, and the MERN stack through workshops,
                  tutorials, and real-world projects.
                </p>
                <div className="w-full flex p-4 px-5 md:px-10 md:w-1/2 gap-4  transform  transition-all duration-700">
                  <FaLinkedin className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:-translate-y-1 hover:text-brandPrimary transition-all duration-700 hover:cursor-pointer" />
                  <FaGithubSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  <FaTwitterSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  <FaInstagramSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                </div>
                <div className="w-full  flex px-5 md:w-1/2">
                  <button
                    className="btn-primary font-bold hover:bg-black  hover:text-brandPrimary hover:border-2 hover:border-brandPrimary text-black transition-all duration-300"
                    href="/portfolio"
                  >
                    Portfolio
                  </button>
                </div>
              </div>
              {/* image */}
              <div className="w-1/2 z-10 overflow-hidden">
                <img
                  src={namanPic}
                  alt=""
                  className="w-[450px] h-3/4  z-10 object-cover hover:-translate-y-1 transition-all duration-700"
                />
              </div>
            </div>
            {/* ------------------------------Member One End  */}

            {/* Member Two */}
            <div className="w-3/4 flex flex-col-reverse md:flex-row rounded-2xl items-center  md:gap-10 bg-transparent border">
              <div className="w-full md:w-1/2 mx-2 p-2 relative">
                <h4 className=" text-3xl p-4 md:text-4xl font-semibold md:mx-5 text-white  relative z-10 transition-all duration-300">
                  Yash Rana
                </h4>
                <p className=" text-gray-400 text-sm p-4 font- mb-2 md:my-2 md:mx-5 transition-all duration-700">
                  Experienced full stack and blockchain developer specializing
                  in smart contract development and dApp creation. Expert in
                  Solidity,Rust with a strong focus on
                  security and performance optimization. Skilled in implementing
                  Web3 integrations and blockchain.
                </p>
                <div className="w-full flex p-4 px-5 md:px-10 md:w-1/2 gap-4  transform  transition-all duration-700">
                  <a href="">
                    <FaLinkedin className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:-translate-y-1 hover:text-brandPrimary transition-all duration-700 hover:cursor-pointer" />
                  </a>
                  <a href="github.com
                  ">
                    <FaGithubSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  </a>
                  <a href="">
                    <FaTwitterSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  </a>
                  <a href="">
                    <FaInstagramSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  </a>
                </div>
                <div className="w-full  flex px-5 md:w-1/2">
                  <a href="https://yashranaportfolio.netlify.app/">
                    <button
                      className="btn-primary font-bold hover:bg-black  hover:text-brandPrimary hover:border-2 hover:border-brandPrimary text-black transition-all duration-300"
                    >
                      Portfolio
                    </button>
                  </a>
                </div>
              </div>
              {/* image */}
              <div className="w-1/2 z-10 overflow-hidden">
                <img
                  src={yashRana}
                  alt=""
                  className="w-[200px] h-3/4  z-10 object-cover hover:-translate-y-1 transition-all duration-700"
                />
              </div>
            </div>
            {/* ------------------------------Member Two End */}

            {/* Member Three */}
            <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl items-center  md:gap-10 bg-transparent border">
              <div className="w-full md:w-1/2 mx-2 p-2 relative">
                <h4 className=" text-3xl p-4 md:text-4xl font-semibold md:mx-5 text-white  relative z-10 transition-all duration-300">
                  Naman Kumar
                </h4>
                <p className=" text-gray-400 text-sm p-4 font- mb-2 md:my-2 md:mx-5 transition-all duration-700">
                  Cyberhunter is a platform by the Cyberhunter Club to empower
                  tech enthusiasts with hands-on learning in cybersecurity,
                  blockchain, Web3, and the MERN stack through workshops,
                  tutorials, and real-world projects.
                </p>
                <div className="w-full flex p-4 px-5 md:px-10 md:w-1/2 gap-4  transform  transition-all duration-700">
                  <FaLinkedin className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:-translate-y-1 hover:text-brandPrimary transition-all duration-700 hover:cursor-pointer" />
                  <FaGithubSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  <FaTwitterSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  <FaInstagramSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                </div>
                <div className="w-full  flex px-5 md:w-1/2">
                  <button
                    className="btn-primary font-bold hover:bg-black  hover:text-brandPrimary hover:border-2 hover:border-brandPrimary text-black transition-all duration-300"
                    href="/portfolio"
                  >
                    Portfolio
                  </button>
                </div>
              </div>
              {/* image */}
              <div className="w-1/2 z-10 overflow-hidden">
                <img
                  src={namanPic}
                  alt=""
                  className="w-[450px] h-3/4  z-10 object-cover hover:-translate-y-1 transition-all duration-700"
                />
              </div>
            </div>
            {/* -----------------------------Member Three End */}

            {/* Member Four */}
            <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl items-center  md:gap-10 bg-transparent border">
              <div className="w-full md:w-1/2 mx-2 p-2 relative">
                <h4 className=" text-3xl p-4 md:text-4xl font-semibold md:mx-5 text-white  relative z-10 transition-all duration-300">
                  Naman Kumar
                </h4>
                <p className=" text-gray-400 text-sm p-4 font- mb-2 md:my-2 md:mx-5 transition-all duration-700">
                  Cyberhunter is a platform by the Cyberhunter Club to empower
                  tech enthusiasts with hands-on learning in cybersecurity,
                  blockchain, Web3, and the MERN stack through workshops,
                  tutorials, and real-world projects.
                </p>
                <div className="w-full flex p-4 px-5 md:px-10 md:w-1/2 gap-4  transform  transition-all duration-700">
                  <FaLinkedin className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:-translate-y-1 hover:text-brandPrimary transition-all duration-700 hover:cursor-pointer" />
                  <FaGithubSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  <FaTwitterSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                  <FaInstagramSquare className="w-7 h-7 sm:w-10 sm:h-10 text-white hover:text-brandPrimary hover:-translate-y-1  transition-all duration-700 hover:cursor-pointer" />
                </div>
                <div className="w-full  flex px-5 md:w-1/2">
                  <button
                    className="btn-primary font-bold hover:bg-black  hover:text-brandPrimary hover:border-2 hover:border-brandPrimary text-black transition-all duration-300"
                    href="/portfolio"
                  >
                    Portfolio
                  </button>
                </div>
              </div>
              {/* image */}
              <div className="w-1/2 z-10 overflow-hidden">
                <img
                  src={namanPic}
                  alt=""
                  className="w-[450px] h-3/4  z-10 object-cover hover:-translate-y-1 transition-all duration-700"
                />
              </div>
            </div>
            {/* -----------------------------Member Three End */}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
