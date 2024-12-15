// import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/User/userSlice";


export default function ProfileDash() {
  // const [userDetails, setUserDetails] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  // https://api.cloudinary.com/v1_1/dkvrajw28/image/upload
  // CLOUDINARY_API_SECRET = lFeHYW98PypmkcX006UKWs4rHUE;
  // CLOUDINARY_CLOUD_NAME = dkvrajw28;
  // CLOUDINARY_API_KEY = 567986218168593;

  const userDetails = user
    ? {
        name: user.name,
        course: user.course,
        branch: user.branch,
        session: user.session,
        qId: user.qId,
        gender: user.gender,
        points: user.points,
      }
    : {};

  const dispatch = useDispatch();

  // console.log(user.name);
  useEffect(() => {
    document.title = "Profile";
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/user`, user?.userId)
      .then((res) => {
        dispatch(signInSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, user?.userId]);

  const techStack = [
    { name: "Java", color: "text-orange-400" },
    { name: "HTML5", color: "text-red-400" },
    { name: "JavaScript", color: "text-yellow-400" },
    { name: "React", color: "text-cyan-400" },
    { name: "Node.js", color: "text-green-400" },
    { name: "MongoDB", color: "text-green-500" },
    { name: "CSS", color: "text-blue-400" },
    { name: "Next.js", color: "text-white" },
    { name: "GraphQL", color: "text-pink-400" },
    { name: "Docker", color: "text-blue-400" },
    { name: "Git", color: "text-orange-500" },
    { name: "SQL", color: "text-blue-300" },
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
      className="min-h-screen p-4 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Project Cards */}
        <motion.div className="lg:col-span-4 space-y-6" variants={itemVariants}>
          {/* TeamSync Cards */}
          <motion.div
            className="h-[450px] md:h-[525px] p-2 rounded-2xl overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-cyan-400"
            variants={itemVariants}
          >
            {Array.from({ length: 5 }).map((item) => (
              <motion.div
                key={item}
                className="bg-gray-800 rounded-xl p-4 shadow-lg mb-4 last:mb-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-4">
                  <div className="w-24 h-35 bg-navy-900 rounded-lg flex items-center justify-center text-sm">
                    <img
                      src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Project"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-cyan-400 text-lg font-semibold">
                      TeamSync
                    </h3>
                    <p className="text-gray-400 text-sm">
                      points : {item === 1 ? "50" : "60"}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        GitHub
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        Live
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      TeamSync is an all-in-one project management and team
                      collaboration platform designed to streamline workflows.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Field of Excellence */}
          <motion.div
            className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm"
            variants={itemVariants}
          >
            <h3 className="text-cyan-400 text-lg font-semibold mb-3">
              Field of Excellence
            </h3>
            <p className="text-sm text-gray-300">
              TeamSync is designed to adapt to your workflow, making it easier
              to manage projects and collaborate with your team, no matter where
              they are. With a user-friendly interface and powerful features,
              TeamSync helps you stay organized, meet deadlines, and achieve
              your goals.
            </p>
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
                    className={`w-16 h-16 rounded-full border-2 ${
                      color === "gold"
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
              <div className="grid justify-center items-center gap-4 mb-6">
                <div className="w-32 h-32 rounded-full bg-blue-900 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
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
                {["GitHub", "Instagram", "LinkedIn", "Twitter"].map(
                  (social) => (
                    <div
                      key={social}
                      className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                    >
                      <span className="w-4 h-4 bg-gray-500 rounded-full"></span>
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* Tech Stack Grid */}
            <motion.div
              className="max-h-[595px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-cyan-400"
              variants={itemVariants}
            >
              <motion.div
                className="grid grid-cols-4 gap-4"
                variants={containerVariants}
              >
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="aspect-square bg-gray-800/60 rounded-xl border border-gray-700/50 backdrop-blur-sm flex items-center justify-center p-2"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`text-xs font-medium ${tech.color}`}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Categories */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6"
        variants={itemVariants}
      >
        {["Frontend", "Backend", "DBMS", "AI / ML", "Security", "DevOps"].map(
          (category) => (
            <motion.button
              key={category}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg py-2 px-4 transition-colors border border-cyan-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          )
        )}
      </motion.div>
    </motion.div>
  );
}
