/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const BadgesSection = ({ itemVariants }) => {
  const badgeColors = ["gold", "green", "purple", "silver", "orange", "cyan"];

  return (
    <motion.div
      className="bg-gray-800/60 rounded-xl px-4 border border-gray-700/50 backdrop-blur-sm"
      variants={itemVariants}
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
          <BadgeItem key={index} color={color} />
        ))}
      </div>
    </motion.div>
  );
};

const BadgeItem = ({ color }) => {
  const getBorderColor = () => {
    switch (color) {
      case "gold": return "border-yellow-400 bg-yellow-400/20";
      case "green": return "border-green-400 bg-green-400/20";
      case "purple": return "border-purple-500 bg-purple-500/20";
      case "silver": return "border-gray-400 bg-gray-400/20";
      case "orange": return "border-orange-400 bg-orange-400/20";
      case "cyan": return "border-cyan-400 bg-cyan-400/20";
      default: return "border-gray-400 bg-gray-400/20";
    }
  };

  return (
    <div
      className={`p-2 rounded-full border-2 ${getBorderColor()} flex items-center justify-center`}
    >
      <div className="w-12 h-12 rounded-full bg-gray-700/50"></div>
    </div>
  );
};

export default BadgesSection;
