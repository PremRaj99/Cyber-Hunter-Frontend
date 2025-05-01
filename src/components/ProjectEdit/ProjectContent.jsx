import { useContext } from 'react';
import { motion } from 'framer-motion';
import MainSection from './Sections/MainSection';
import DetailsSection from './Sections/DescriptionSection';
import ImagesSection from './Sections/MediaSection';
import LinksSection from './Sections/LinksSection';
import { ProjectEditContext } from '../../pages/EditProject';
import { TeamProjectEditContext } from '../../pages/EditTeamProject';

// Component for project content with different sections based on activeSection
export default function ProjectContent() {
  // Try to get context from either ProjectEditContext or TeamProjectEditContext
  const projectContext = useContext(ProjectEditContext);
  const teamProjectContext = useContext(TeamProjectEditContext);

  // Use whichever context is available
  const context = projectContext || teamProjectContext;

  // If no context is available, show error
  if (!context) {
    return (
      <div className="col-span-9 bg-gray-900/50 rounded-xl p-6 border border-gray-700">
        <p className="text-red-400">Error: Context not available. Make sure this component is used within a ProjectEditContext provider.</p>
      </div>
    );
  }

  const { activeSection } = context;

  return (
    <div className="col-span-12 md:col-span-9 bg-gray-900/50 rounded-xl p-4 md:p-6 border border-gray-700">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeSection === "main" && <MainSection />}
        {activeSection === "details" && <DetailsSection />}
        {activeSection === "images" && <ImagesSection />}
        {activeSection === "links" && <LinksSection />}
      </motion.div>
    </div>
  );
}
