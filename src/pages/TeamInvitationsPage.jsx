import { motion } from 'framer-motion';
import TeamInvitations from '../components/Team/TeamInvitations';

const TeamInvitationsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto max-w-4xl px-4 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-cyan-400">Team</span> Invitations
        </h1>
        <button
          onClick={() => window.history.back()}
          className="text-gray-400 hover:text-white flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
      </div>

      <TeamInvitations />
    </motion.div>
  );
};

export default TeamInvitationsPage;
