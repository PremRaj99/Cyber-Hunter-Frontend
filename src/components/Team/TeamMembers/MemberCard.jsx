/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const MemberCard = ({ member, isTeamLeader, onRemove }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { ease: 'easeOut' } }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20"
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(member.name)}`;
          }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
        <p className="text-cyan-400 mb-4">{member.role}</p>

        {/* Only show delete button for team leaders */}
        {isTeamLeader && (
          <div className="flex justify-end mt-6">
            <button
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => onRemove(member.id, member.userId)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemberCard;
