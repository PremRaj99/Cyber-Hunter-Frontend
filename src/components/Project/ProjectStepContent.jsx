import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectContext } from "../../pages/Addproject";
import ProjectInfoStep from "./steps/ProjectInfoStep";
import ProjectMediaStep from "./steps/ProjectMediaStep";
import ProjectTechStackStep from "./steps/ProjectTechStackStep";
import ProjectLinksStep from "./steps/ProjectLinksStep";

const ProjectStepContent = () => {
  const { currentStep } = useContext(ProjectContext);

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
        {currentStep === 2 && <ProjectMediaStep />}
        {currentStep === 3 && <ProjectTechStackStep />}
        {currentStep === 4 && <ProjectLinksStep />}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectStepContent;
