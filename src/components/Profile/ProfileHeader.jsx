import { motion } from "framer-motion";

const ProfileHeader = () => {
  const badgeColors = ["gold", "green", "purple", "silver", "orange", "cyan"];

  return (
    <motion.div
      className="bg-gray-800/60 rounded-xl px-4 border border-gray-700/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold items-start text-cyan-400 p-2">
        Badges & Achievements
      </h2>
      <div
        className="flex flex-nowrap justify-start overflow-x-auto gap-2 custom-scrollbar"
        style={{
          paddingBottom: '10px',
        }}
      >
        {badgeColors.map((color, index) => (
          <div
            key={index}
            className={`p-2 rounded-full border-2 ${color === "gold"
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
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
