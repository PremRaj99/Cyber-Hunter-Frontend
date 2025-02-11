// import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram, FaLinkedin, FaSquareGithub } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TechStackItem from "../Common/TechStackItem";
import TechStack from "../Common/TechStackItem";
import ProfileDiscription from "./ProfileDiscription";


export default function ProfileDash() {
  // const [userDetails, setUserDetails] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  const [userInterests, setUserInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tech, setTech] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const userDetails = user
    ? {
      name: user.name,
      qId: user.qId,
      course: user.course,
      branch: user.branch,
      session: user.session,
      gender: user.gender,
      points: user.points,
    }
    : {};

  const dispatch = useDispatch();



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // console.log(user.name);
  useEffect(() => {
    document.title = "Profile";
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/user`, user?.userId)
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, user?.userId]);

  // fetch TechStack
  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        if (projects.length === 0) return;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/techstack/me/${projects[0]?.userId}`,
        );
        setTech(response.data);
        console.log('Fetched tech stack:', response.data);
      } catch (error) {
        console.error('Error fetching tech stack:', error);
      }
    };
    fetchTechStack();
  }, [
    projects[0]?.userId,
  ]);

  // Update the fetchUserInterests useEffect
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // Update userInterests with populated data
        if (response.data && response.data.interestId) {
          setUserInterests(response.data.interestId);
        }

        // Update projects if they exist in response
        if (response.data && response.data.projects) {
          setProjects(response.data.projects);
        }

        // Debug log
        console.log('Fetched user details:', response.data);

      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id) {
      fetchUserDetails();
    }
  }, [user?._id]);

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaSquareGithub />,
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
    },
    {
      name: "Twitter",
      icon: <FaTwitterSquare />,
    }

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="max-h-[calc(100vh-8rem)] p-4 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 md:gap-4">
        {/* Left Column - Project Cards */}
        <motion.div className="flex flex-col-reverse lg:col-span-4 lg:flex-col space-y-6 gap-4 md:gap-0" variants={itemVariants}>
          <motion.div
            className="h-[450px] md:h-[525px] rounded-2xl overflow-y-auto pr-2 "
            variants={itemVariants}
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                className="bg-gray-800 rounded-xl p-4 shadow-lg mb-4 last:mb-0"
              >
                <div className="flex gap-4 hover:cursor-pointer" onClick={() => navigate(`/dashboard/project/${project._id}`)}>
                  <div className="w-24 h-35 bg-navy-900 rounded-lg flex items-center justify-center text-sm">
                    <img
                      src={project.projectThumbnail || "default-thumbnail-url"}
                      alt={project.projectName}
                      className="w-full h-full object-cover rounded-lg"
                      draggable="false"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-cyan-400 text-lg font-semibold">
                      {project.projectName.toUpperCase()}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {/* points : {item === 1 ? "50" : "60"} */}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      {project.gitHubLink && (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <a href={project.gitHubLink} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        </div>
                      )}
                      {project.liveLink && (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            Live
                          </a>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      {project.projectDescription.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Field of Excellence */}
          <motion.div
            className="flex w-full bg-gray-800/60 rounded-xl p-4 gap-4 border border-gray-700/50 backdrop-blur-sm"
            variants={itemVariants}
          >
            <ProfileDiscription />
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div className="lg:col-span-8 space-y-6" variants={itemVariants}>
          {/* Badges Section */}
          <motion.div
            className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="flex flex-wrap justify-start gap-4">
              {["gold", "green", "purple", "silver", "orange", "cyan"].map(
                (color, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-full border-2 ${color === "gold"
                      ? "border-yellow-400 bg-yellow-400/20"
                      : color === "green"
                        ? "border-green-400 bg-green-400/20"
                        : color === "purple"
                          ? "border-purple-500 bg-purple-500/20"
                          : color === "silver"
                            ? "border-gray-400 bg-gray-400/20"
                            : color === "orange"
                              ? "border-orange-400 bg-orange-400/20"
                              : "border-cyan-400 bg-cyan-400/20"
                      } flex items-center justify-center`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-700/50"></div>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Profile and Tech Stack Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Section */}
            <motion.div
              className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
              variants={itemVariants}
            >
              <div className="flex flex-col justify-center items-center gap-4 mb-6">
                <div className="w-32 h-32 rounded-full bg-blue-900 flex items-center justify-center">
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                    draggable="false"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{userDetails.name}</h2>
                  <div className="text-cyan-400">{userDetails.points}</div>
                </div>
              </div>

              <div className="space-y-2">
                {Object.entries(userDetails).map(
                  ([key, value]) =>
                    key !== "points" && (
                      <div
                        key={key}
                        className="grid grid-cols-2 bg-gray-700/30 p-2 rounded-lg"
                      >
                        <span className="text-gray-400 capitalize">{key}</span>
                        <span className="text-right">{value}</span>
                      </div>
                    )
                )}
              </div>


              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={`#${link.name}`}
                    className=" hover:text-brandPrimary hover:scale-110  text-2xl bg-white/10 rounded-full p-2 hover:bg-white/20 duration-500 transition ease-in"
                  >
                    <span>{link.icon}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="max-h-[595px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-cyan-400"
              variants={itemVariants}
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                </div>
              ) : tech && tech.length > 0 ? (
                <motion.div
                  className="flex flex-wrap items-start gap-4"
                  variants={containerVariants}
                >
                  <TechStack techstack={tech} />
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center h-[200px] bg-gray-800/60 rounded-xl border border-gray-700/50 backdrop-blur-sm"
                  variants={itemVariants}
                >
                  <svg
                    className="w-12 h-12 text-gray-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                  <p className="text-gray-400 text-center mb-2">No technologies found</p>
                  <p className="text-gray-500 text-sm text-center">
                    Add some technologies to showcase your skills
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Categories (Intrests)*/}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6"
        variants={itemVariants}
      >
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          </div>
        ) : userInterests && userInterests.length > 0 ? (
          userInterests.map((interest) => (
            <motion.button
              key={interest._id}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg py-2 px-4 transition-colors border border-cyan-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {interest.content}
            </motion.button>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No interests found
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
