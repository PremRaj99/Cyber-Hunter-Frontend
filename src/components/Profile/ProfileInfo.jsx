import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaSquareGithub, FaInstagram, FaLinkedin  } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
const ProfileInfo = () => {
  const user = useSelector((state) => state.user.currentUser);

  const userDetails = useMemo(() => user
    ? {
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
      Dob: new Date(user.DOB).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      qId: user.qId,
      course: user.course,
      branch: user.branch,
      session: user.session,
      gender: user.gender,
      points: user.points,
    }
    : {}, [user]);

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
    },
  ];

  return (
    <motion.div
      className="bg-gray-800/60 rounded-xl md:p-6 p-4 border border-gray-700/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col justify-center items-center gap-4 mb-6">
        <div className="w-32 h-32 rounded-full bg-blue-900 flex items-center justify-center">
          <img
            src={user?.profilePicture}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
            draggable="false"
            onError={(e) => {
              e.target.src = "https://avatar.iran.liara.run/username?username=User";
            }}
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{userDetails.name}</h2>
          <div className="text-cyan-400">{userDetails.points} pts</div>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(userDetails).map(
          ([key, value]) =>
            key !== "points" && key !== "name" && (
              <div
                key={key}
                className="grid grid-cols-2 bg-gray-700/30 p-2 rounded-lg overflow-x-hidden md:overflow-x-visible"
              >
                <span className="text-gray-400 capitalize">{key}</span>
                <span className="text-right">
                  {key === "email" ? value.substring(0, 13) + (value.length > 10 ? "..." : "") : value}
                </span>
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
            className="hover:text-brandPrimary hover:scale-110 text-2xl bg-white/10 rounded-full p-2 hover:bg-white/20 duration-500 transition ease-in"
          >
            <span>{link.icon}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileInfo;
