import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileInterests from "../components/Profile/ProfileInterests";
import ProfileProjectsSection from "../components/Profile/ProfileProjectsSection";
import ProfileDetailsSection from "../components/Profile/ProfileDetailsSection";

export default function Profile() {
  const user = useSelector((state) => state.user.currentUser);

  // useeffect for document title
  useEffect(() => {
    if (user?.name) {
      document.title = `${user.name}'s Profile`;
    } else {
      document.title = "User Profile";
    }
  }, [user?.name]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="max-h-[calc(100vh-8rem)] p-4 text-stone-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 md:gap-4">
        {/* Left Column - Projects and Description */}
        <ProfileProjectsSection />

        {/* Right Column - Profile Details and Tech Stack */}
        <ProfileDetailsSection />
      </div>

      {/* Bottom Categories (Interests) */}
      <ProfileInterests />
    </motion.div>
  );
}
