import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TeamProjectContext } from "../../pages/AddTeamProject";
import ProjectInfoStep from "./Steps/ProjectInfoStep";
import MediaUploadStep from "./Steps/MediaUploadStep";
import TechStackStep from "./Steps/TechStackStep";
import LinksStep from "./Steps/LinksStep";

const TeamProjectContent = () => {
  const { currentStep } = useContext(TeamProjectContext);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-xl"
      >
        {currentStep === 1 && <ProjectInfoStep />}
        {currentStep === 2 && <MediaUploadStep />}
        {currentStep === 3 && <TechStackStep />}
        {currentStep === 4 && <LinksStep />}
      </motion.div>
    </AnimatePresence>
  );
};

export default TeamProjectContent;
