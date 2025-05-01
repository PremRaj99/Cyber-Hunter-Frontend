import { motion } from "framer-motion";

const TeamExcellence = () => {
  const excellenceFields = [
    { name: "Algorithm Design", progress: 90 },
    { name: "UI/UX Development", progress: 80 },
    { name: "Data Analysis", progress: 70 },
    { name: "ML Integration", progress: 60 }
  ];

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Field of Excellence</h2>
      </div>
      <div className="space-y-2">
        {excellenceFields.map((field, index) => (
          <div
            key={index}
            className="bg-gray-700/30 p-3 rounded-lg flex justify-between items-center"
          >
            <span>{field.name}</span>
            <div className="w-24 bg-gray-600 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full"
                style={{ width: `${field.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamExcellence;
