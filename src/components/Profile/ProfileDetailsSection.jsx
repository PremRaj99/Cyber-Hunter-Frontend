import { motion } from "framer-motion";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileTechStack from "./ProfileTechStack";

const ProfileDetailsSection = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="lg:col-span-8 space-y-4"
      variants={itemVariants}
    >
      {/* Badges Section */}
      <ProfileHeader />

      {/* Profile and Tech Stack Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <ProfileInfo />

        {/* Tech Stack */}
        <ProfileTechStack />
      </div>
    </motion.div>
  );
};

export default ProfileDetailsSection;
