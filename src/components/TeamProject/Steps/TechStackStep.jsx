import { useContext } from "react";
import { TeamProjectContext } from "../../../pages/AddTeamProject";
import MultiSelectInput from "../../Input/MultiSelectInput";

const TechStackStep = () => {
  const { project, setProject } = useContext(TeamProjectContext);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-4">Technologies</label>
        <div className="flex flex-wrap gap-2">
          <MultiSelectInput
            placeholder="Search and select Tech Stack"
            fieldName="techStack"
            apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/techStack`}
            onTagsChange={(tags) => setProject({ ...project, techStack: tags })}
            value={project.techStack}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-4">Languages</label>
        <div className="flex flex-wrap gap-2">
          <MultiSelectInput
            placeholder="Search and select Languages"
            fieldName="language"
            apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/language`}
            onTagsChange={(tags) => setProject({ ...project, language: tags })}
            value={project.language}
          />
        </div>
      </div>
    </div>
  );
};

export default TechStackStep;
