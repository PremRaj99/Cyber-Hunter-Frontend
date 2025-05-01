import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ProjectEditContext } from '../../../pages/EditTeamProject';
import MultiSelectInput from '../../Input/MultiSelectInput';

const TechStackSection = () => {
  const {
    selectedTechStack,
    setSelectedTechStack,
    selectedLanguages,
    setSelectedLanguages
  } = useContext(ProjectEditContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Tech Stack & Languages</h2>

      {/* Tech Stack */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Technologies Used</h3>
        <MultiSelectInput
          fieldName="Technology"
          apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/techStack`}
          onTagsChange={(e) => setSelectedTechStack(e)}
          defaultValue={selectedTechStack}
        />
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Programming Languages</h3>
        <MultiSelectInput
          fieldName="Language"
          apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/language`}
          onTagsChange={(e) => setSelectedLanguages(e)}
          defaultValue={selectedLanguages}
        />
      </div>
    </motion.div>
  );
};

export default TechStackSection;
