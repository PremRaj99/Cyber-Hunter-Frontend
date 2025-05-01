import { motion } from 'framer-motion';
import { useContext } from 'react';
import { TeamContext } from '../../../context/TeamContext';
import TeamTechStack from '../TeamTechStack';

const TeamTechStackTab = () => {
  const {
    formData,
    setFormData,
    teamId,
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
    <motion.div variants={containerVariants} className="space-y-6">
      <TeamTechStack
        formData={formData}
        setFormData={setFormData}
        teamId={teamId}
        isTeamLeader={isTeamLeader}
      />
    </motion.div>
  );
};

export default TeamTechStackTab;
