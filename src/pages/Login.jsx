import React, { useState } from "react";
import banner1 from "../assets/banner1.png";
import googleIcon from "../assets/google_icon.png";
import githubIcon from "../assets/github_icon.png";
import xIcon from "../assets/x_icon.png";
import eyeIcon from "../assets/eye_icon.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // add state to show/hide password

  // fetch API

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      !formdata.email ||
      !formdata.password ||
      formdata.email === "" ||
      formdata.password === ""
    ) {
      toast.error("Plesase fill out all the fields.");
      return dispatch(signInFailure("Plesase fill out all the fields."));
    }
    try {
      dispatch(signInStart());
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return toast.error(data.message);
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/profile");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
      setLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !formdata.email ||
      !formdata.password ||
      !formdata.confirmPassword ||
      formdata.email === "" ||
      formdata.password === "" ||
      formdata.confirmPassword === ""
    ) {
      toast.error("Plesase fill out all the fields.");
      return dispatch(signInFailure("Plesase fill out all the fields."));
    }
    if (formdata.confirmPassword !== formdata.password) {
      toast.error("Password do not match!");
      return dispatch(signInFailure("Password do not match!"));
    }
    try {
      dispatch(signInStart());
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return toast.error(data.message);
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/profile");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] bg-black">
      <div className="circlePosition w-[250px] h-[200px] bg-brandPrimary rounded-[100%] absolute z-1 top-[25%] left-[15%] blur-[90px] transition-all duration-300"></div>
      <div className="px-4 max-w-screen-2xl mx-auto min-h-full h-full">
        <div className="w-full h-full flex justify-center items-center">
          <div className="md:w-4/5 w-full h-fit md:my-28 my-10 flex flex-col md:flex-row rounded-2xl items-center justify-between bg-gray-800 bg-opacity-40 backdrop-blur-lg ">
            <div className="flex-1 md:block hidden">
              <img
                src={banner1}
                alt="banner-img"
                className="w-fit md:h-full  object-cover hover:-translate-y-3 transition-all duration-700"
              />
            </div>
            {/* login page */}
            <div className="flex-1 flex justify-center flex-col md:px-16 px-8 py-10 w-full items-center rounded-2xl h-full bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-400">
              <div className="relative w-full max-w-96 mb-4">
                <div className="flex justify-between items-center border-2 border-gray-400 rounded-full relative overflow-hidden">
                  <label
                    onClick={() => setIsSignup(false)}
                    className={`w-1/2  text-center text-lg cursor-pointer transition-all duration-700 z-10 ${
                      !isSignup ? "text-black" : "text-white"
                    }`}
                  >
                    Login
                  </label>
                  <label
                    onClick={() => setIsSignup(true)}
                    className={`w-1/2 py-2 text-center text-lg cursor-pointer transition-all duration-700 z-10 ${
                      isSignup ? "text-black" : "text-white"
                    }`}
                  >
                    Signup
                  </label>
                  <div
                    className={`absolute  top-0 h-full w-1/2 bg-brandPrimary  rounded-full transition-all duration-700 ${
                      isSignup ? "transform translate-x-full" : ""
                    }`}
                  ></div>
                </div>
              </div>

              <div
                className="flex w-full md:px-8 transition-transform duration-700"
                style={{
                  transform: isSignup ? "translateX(0)" : "translateX(0)",
                }}
              >
                <form
                  className="w-full flex flex-col items-center justify-center"
                  onSubmit={(e) => {
                    isSignup ? handleSignup(e) : handleLogin(e);
                  }}
                >
                  <div className="mb-2">
                    <label htmlFor="email" className="flex text-gray-300">
                      <MdEmail className="h-6 mx-2" />
                      Email Address
                    </label>
                    <input
                      type="text"
                      placeholder="example@gmail.com"
                      value={formdata.email}
                      onChange={(e) => {
                        setFormdata({ ...formdata, email: e.target.value });
                      }}
                      required
                      className="min-w-72 md:w-96 w-full px-4 py-2 my-2 border bg-gray-300 rounded-lg"
                    />
                  </div>
                  <div className={`${isSignup ? "mb-4" : "mb-2"} relative`}>
                    <label htmlFor="password" className="flex text-gray-300">
                      <RiLockPasswordFill className="h-6 mx-2" />
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="✯✯✯✯✯✯"
                      value={formdata.password}
                      onChange={(e) => {
                        setFormdata({ ...formdata, password: e.target.value });
                      }}
                      required
                      className="min-w-72 md:w-96 w-full px-4 py-2 my-2 border bg-gray-300 rounded-lg"
                    />
                    <span className="absolute right-3 top-[65%] transform -translate-y-[50%]">
                      <img
                        src={eyeIcon}
                        alt="eye icon"
                        className="h-6 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </span>
                  </div>
                  {!isSignup && (
                    <div className="mb-2 text-right">
                      <a href="#" className="text-blue-500 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  {isSignup && (
                    <div className="mb-6 relative">
                      <label
                        htmlFor="confirmPassword"
                        className="flex text-gray-300"
                      >
                        <RiLockPasswordFill className="h-6 mx-2" />
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="✯✯✯✯✯✯"
                        value={formdata.confirmPassword}
                        onChange={(e) => {
                          setFormdata({
                            ...formdata,
                            confirmPassword: e.target.value,
                          });
                        }}
                        required
                        className="min-w-72 md:w-96 w-full px-4 py-2 my-2 border bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="absolute right-3 top-[65%] transform -translate-y-[50%]">
                        <img
                          src={eyeIcon}
                          alt="eye icon"
                          className="h-6 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </span>
                    </div>
                  )}

                  <div className="mb-4 ">
                    <button
                      type="submit"
                      className="min-w-72 md:w-96 w-full py-2 text-white bg-brandPrimary rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {isSignup ? "Signup" : "Login"}
                    </button>
                    <p className="flex justify-center mt-2 text-gray-300 py-1">
                      or
                    </p>
                  </div>
                  <div className="social-container flex m-2 space-x-5 justify-center">
                    <a
                      href="#"
                      className="social transparent p-2 bg-gray-300 hover:bg-brandPrimary border-2 h-12 w-12 rounded-full"
                    >
                      <img src={googleIcon} alt="" />
                    </a>
                    <a
                      href="#"
                      className="social transparent p-2 bg-gray-300  hover:bg-brandPrimary border-2 h-12 w-12 rounded-full"
                    >
                      <img src={githubIcon} alt="" />
                    </a>
                    <a
                      href="#"
                      className="social transparent p-2 bg-gray-300  hover:bg-brandPrimary border-2 h-12 w-12 rounded-full"
                    >
                      <img src={xIcon} alt="" />
                    </a>
                  </div>
                </form>
              </div>
              {!isSignup && (
                <div className="text-center text-sm my-2 text-gray-300">
                  <span>Not a member? </span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignup(true);
                    }}
                    className="text-brandPrimary hover:underline"
                  >
                    Signup now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
