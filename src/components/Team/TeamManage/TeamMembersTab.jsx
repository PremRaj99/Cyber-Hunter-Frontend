import { motion } from 'framer-motion';
import { useContext } from 'react';
import { TeamContext } from '../../../context/TeamContext';
import AddTeamMember from '../AddTeamMember';

const TeamMembersTab = () => {
  const {
    teamId,
    teamMembers,
    setTeamMembers,
    isTeamLeader
  } = useContext(TeamContext);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      className="lg:grid-cols-3 gap-6"
    >
      <AddTeamMember
        teamId={teamId}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        isTeamLeader={isTeamLeader}
      />
    </motion.div>
  );
};

export default TeamMembersTab;
