import { useContext } from "react";
import { ProjectContext } from "../../pages/Addproject";

const ProjectProgressIndicator = () => {
  const { currentStep } = useContext(ProjectContext);

  return (
    <div className="mt-6 text-center text-sm text-gray-400">
      Step {currentStep} of 4
    </div>
  );
};

export default ProjectProgressIndicator;
