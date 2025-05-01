/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import MemberCard from './MemberCard';

const TeamMembersList = ({ teamMembers, isTeamLeader, onRemoveMember }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {teamMembers.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          isTeamLeader={isTeamLeader}
          onRemove={onRemoveMember}
        />
      ))}
    </motion.div>
  );
};

export default TeamMembersList;
