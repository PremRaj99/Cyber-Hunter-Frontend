import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import banner1 from "../../assets/banner1.png";
import googleIcon from "../../assets/google_icon.png";
import githubIcon from "../../assets/github_icon.png";
import xIcon from "../../assets/x_icon.png";
import eyeIcon from "../../assets/eye_icon.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/User/userSlice";
import axios from "../../utils/Axios";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Scroll animation hooks
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Login and Signup handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      toast.error("Please fill out all the fields.");
      return dispatch(signInFailure("Please fill out all the fields."));
    }
    try {
      dispatch(signInStart());
      setLoading(true);
      const { data } = await axios.post("/api/v1/auth/login", {
        email: formdata.email,
        password: formdata.password,
      });

      if (data.success) {
        dispatch(signInSuccess(data.data));
        navigate("/profile");
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        setLoading(false);
        return toast.success(data.message);
      } else {
        setLoading(false);
        dispatch(signInFailure(data.message));
        return toast.error(data.message);
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
      formdata.confirmPassword !== formdata.password
    ) {
      const errorMsg =
        formdata.confirmPassword !== formdata.password
          ? "Passwords do not match!"
          : "Please fill out all the fields.";
      toast.error(errorMsg);
      return dispatch(signInFailure(errorMsg));
    }
    try {
      dispatch(signInStart());
      setLoading(true);
      const { data } = await axios.post("/api/v1/auth/signin", {
        email: formdata.email,
        password: formdata.password,
        confirmPassword: formdata.confirmPassword,
      });
      setLoading(false);
      if (data.success) {
        dispatch(signInSuccess(data.data));
        navigate("/profile");
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        return toast.success(data.message);
      }
      setLoading(false);
      dispatch(signInFailure(data.message));
      return toast.error(data.message);
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
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="w-full h-full flex justify-center items-center"
        >
          <motion.div
            variants={itemVariants}
            className="md:w-4/5 w-full h-fit md:my-28 my-10 flex flex-col md:flex-row rounded-2xl items-center justify-between bg-white bg-opacity-10 backdrop-blur-lg"
          >
            <motion.div
              variants={itemVariants}
              className="flex-1 md:block hidden"
            >
              <img
                src={banner1}
                alt="banner-img"
                className="w-fit md:h-full object-cover hover:-translate-y-3 transition-all duration-700"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex-1 flex justify-center flex-col md:px-16 px-8 py-10 w-full items-center rounded-2xl h-full bg-opacity-10 backdrop-blur-lg"
            >
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-96 mb-4"
              >
                <div className="flex justify-between items-center border-2 py-2 border-black rounded-full relative overflow-hidden">
                  <label
                    htmlFor="login"
                    onClick={() => setIsSignup(false)}
                    className={`w-1/2 text-center text-lg cursor-pointer transition-all duration-700 z-10 ${
                      !isSignup ? "text-black font-bold" : "text-white"
                    }`}
                  >
                    Login
                  </label>
                  <label
                    htmlFor="signup"
                    onClick={() => setIsSignup(true)}
                    className={`w-1/2 text-center text-lg cursor-pointer transition-all duration-700 z-10 ${
                      isSignup ? "text-black font-bold" : "text-white"
                    }`}
                  >
                    Signup
                  </label>
                  <div
                    className={`absolute top-0 h-full w-1/2 bg-brandPrimary rounded-full transition-all duration-700 ${
                      isSignup ? "transform translate-x-full" : ""
                    }`}
                  ></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
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
                      className="min-w-72 md:w-96 w-full py-2 text-black font-bold bg-brandPrimary rounded-lg hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
