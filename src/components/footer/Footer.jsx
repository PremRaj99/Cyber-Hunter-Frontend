import React from "react";
import logo2 from "../../assets/logo2.png";
import googleIcon from "../../assets/google_icon.png";
import githubIcon from "../../assets/github_icon.png";
import xIcon from "../../assets/x_icon.png";
import linkIcon from "../../assets/linkedin_icon.png";
import emailLogo from "../../assets/email.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col h-auto w-full">
      <div className="flex flex-col lg:flex-row justify-evenly bg-brandPrimary shadow-md box-border w-full text-left md:px-20">
        <div className="flex-[2] w-full lg:w-2/3 p-4  flex lg:flex-row  md:justify-evenly">
          <div className="flex-1 flex w-full lg:w-1/2 flex-col lg:pr-0 pr-8 justify-center items-center border-black lg:border-r ">
            <img src={logo2} alt="logo" className="w-40 h-40" />
            <p className="text-sm my-4 text-center">
              Let's Hack Together
            </p>
            <p className="flex lg:space-x-5 space-x-2 justify-center items-center">
              <a
                href="#"
                target="_blank"
                className="lg:h-10 h-8 lg:w-10 w-8 p-1 border border-black hover:scale-110 duration-300 rounded-full"
              >
                <img src={googleIcon} alt="Google" title="Google" className="h-full w-full" />
              </a>
              <a
                href="#"
                target="_blank"
                className="lg:h-10 h-8 lg:w-10 w-8 p-1 border border-black hover:scale-110 duration-300 rounded-full"
              >
                <img src={githubIcon} alt="GitHub" title="GitHub" className="h-full w-full" />
              </a>
              <a
                href="#"
                target="_blank"
                className="lg:h-10 h-8 lg:w-10 w-8 p-2 border border-black hover:scale-110 duration-300 rounded-full"
              >
                <img src={xIcon} alt="X" title="X" className="h-full w-full" />
              </a>
              <a
                href="#"
                target="_blank"
                className="lg:h-10 h-8 lg:w-10 w-8 p-1 border border-black hover:scale-110 duration-300 rounded-full"
              >
                <img src={linkIcon} alt="LinkedIn" title="LinkedIn" className="h-full w-full" />
              </a>
            </p>
          </div>
          <div className="flex-1 flex flex-col mt-8 lg:mt-0 lg:px-20 justify-center items-center lg:items-start">
            <h3 className="font-semibold uppercase text-center lg:text-left">
              Quick Links
            </h3>
            <ul className="list-['\00BB'] flex flex-col items-start gap-2 my-2">
              <li>
                <Link to="/" className="px-2 hover:text-gray-700 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="px-2 hover:text-gray-700 hover:underline">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/event" className="px-2 hover:text-gray-700 hover:underline">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/about" className="px-2 hover:text-gray-700 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="px-2 hover:text-gray-700 hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-center ">
          <div className="flex-col flex justify-center items-center w-11/12 text-center  mx-auto lg:mb-0 mb-4">
            <img src={emailLogo} alt="" className="h-10 w-auto" />
            <h3 className="font-medium text-2xl ">Contact Mail</h3>
            <p className="font-light text-sm py-4 text-gray-700">
              Get in touch to discover more about us! <br /> Contact us to know
              more about us...
            </p>
            <label htmlFor="email" className="flex px-16 py-2 ">
              Email Address
            </label>
            <div className="flex justify-center w-full">

            <input
              type="email"
              placeholder="example@gmail.com"
              required
              className="w-full outline-none max-w-96 lg:w-10/12 px-2 rounded-l-lg "
            />
            <button className="bg-green-500 px-4 rounded-r-lg hover:bg-green-600 text-white">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full bg-black p-4 ">
        <div className="flex justify-center gap-8  text-gray-300 md:text-base text-xs">
          <p>
            <span className="text-brandPrimary ">&#169;</span> Copyrights 2024 |{" "}
            <span className="text-brandPrimary hover:underline cursor-pointer">Cyber Hunter</span>
          </p>
          <a href="#" className="hover:text-white">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-white">
            Policies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
