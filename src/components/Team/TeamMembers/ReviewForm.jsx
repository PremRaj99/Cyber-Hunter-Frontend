/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const ReviewForm = ({ newMember }) => {
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
      key="step3"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <h4 className="text-xl text-white font-medium mb-4">Review & Confirm</h4>

      <div className="bg-gray-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={newMember.image}
              alt={newMember.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h5 className="text-white text-lg">{newMember.name}</h5>
            <p className="text-cyan-400">{newMember.role}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-400">
        Please review the information above. Once confirmed, the new team member will be added to your team.
      </p>
    </motion.div>
  );
};

export default ReviewForm;
