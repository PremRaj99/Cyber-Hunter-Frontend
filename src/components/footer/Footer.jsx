import React from "react";
import logo2 from "../../assets/logo2.png";
import googleIcon from "../../assets/google_icon.png";
import githubIcon from "../../assets/github_icon.png";
import xIcon from "../../assets/x_icon.png";
import linkIcon from "../../assets/linkedin_icon.png";
import emailLogo from '../../assets/email.png';

const Footer = () => {
  return (
    <footer className="flex flex-col h-auto w-full">
      <div className="flex flex-col lg:flex-row justify-evenly bg-[#49AAAD] shadow-md box-border w-full text-left font-bold text-lg">
        <div className="footer-left w-full lg:w-2/3 p-4  flex lg:flex-row  md:justify-evenly">
          <div className="flex w-full lg:w-1/2 flex-col lg:pr-0 pr-8 justify-center items-center border-black lg:border-r-2 ">
            <img src={logo2} alt="logo" className="w-20 h-20" />
            <p className="text-sm font-normal my-4 text-center">
              Let's Hack Together
            </p>
            <p className="social-container flex  lg:space-x-5 space-x-2 justify-center items-center">
              <a
                href="#"
                className="social transparent lg:h-10 h-8 lg:w-10 w-8 p-1 border-2 hover:bg-white rounded-full"
              >
                <img src={googleIcon} alt="Google" className="h-full w-full" />
              </a>
              <a
                href="#"
                className="social transparent lg:h-10 h-8 lg:w-10 w-8 p-1 border-2 hover:bg-white rounded-full"
              >
                <img src={githubIcon} alt="GitHub" className="h-full w-full" />
              </a>
              <a
                href="#"
                className="social transparent lg:h-10 h-8 lg:w-10 w-8 p-2 border-2 hover:bg-white rounded-full"
              >
                <img src={xIcon} alt="X" className="h-full w-full" />
              </a>
              <a
                href="#"
                className="social transparent lg:h-10 h-8 lg:w-10 w-8 p-1 border-2 hover:bg-white rounded-full"
              >
                <img src={linkIcon} alt="X" className="h-full w-full" />
              </a>
            </p>
          </div>
          <div className="flex flex-col mt-8 lg:mt-0 lg:px-20 justify-center items-center lg:items-start">
            <h3 className="font-medium text-center lg:text-left">
              Quick Links
            </h3>
            <p className="footer-links flex flex-col items-start font-light my-5 space-y-2">
              <li>
                <a href="#" className="mx-2 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="mx-2 hover:text-white">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="#" className="mx-2 hover:text-white">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="mx-2 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mx-2 hover:text-white">
                  Contact
                </a>
              </li>
            </p>
          </div>
        </div>

        <div className="footer-right w-full lg:w-1/2 flex flex-col justify-center ">
          <div className="flex-col flex justify-center items-center w-11/12 text-center  mx-auto lg:mb-0 mb-4">

          <img src={emailLogo} alt="" className="h-10 w-auto"/>
            <h3 className="font-medium text-2xl ">Contact Mail</h3>
            <p className="font-light text-sm py-4 text-gray-700">
              Get in touch to discover more about us! <br /> Contact us to know
              more about us...
            </p>
            <label htmlFor="email" className="flex font-md px-16  ">
              Email Address
            </label>
            <input
              type="text"
              placeholder="example@gmail.com"
              required
              className="w-full lg:w-10/12 px-2  border rounded-lg "
            />
          </div>
        </div>
      </div>
      <div className="h-auto w-full bg-black p-8 ">
        <div className="flex justify-evenly  text-white lg:text-lg text-xs">
          <p><span className='text-[#5CE1E6] '>&#169;</span> Copyrights 2024 | <span className='text-[#5CE1E6] '>CyberHunter</span> All rights reserved</p>
          <div className="space-x-4">
            <a href="#">Terms & Conditions</a>
            <a href="#">Policies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
