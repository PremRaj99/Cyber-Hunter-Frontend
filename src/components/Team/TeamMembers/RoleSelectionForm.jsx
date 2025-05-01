/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const RoleSelectionForm = ({ newMember, setNewMember }) => {
  const slideVariants = {
    enter: { x: '100%', opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: { x: '-100%', opacity: 0 }
  };

  return (
    <motion.div
      key="step2"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <h4 className="text-xl text-white font-medium mb-4">Confirm Role</h4>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={newMember.image}
            alt={newMember.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-medium">{newMember.name}</p>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm">Team Role</label>
          <select
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            className="w-full bg-gray-800 border-b-2 border-gray-700 focus:border-cyan-400 px-4 py-3 rounded text-white focus:outline-none transition-colors"
          >
            <option value="Member">Member</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="Project Manager">Project Manager</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default RoleSelectionForm;
