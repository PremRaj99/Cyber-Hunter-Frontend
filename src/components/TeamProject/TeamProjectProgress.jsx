import { useContext } from "react";
import { TeamProjectContext } from "../../pages/AddTeamProject";

const TeamProjectProgress = () => {
  const { currentStep } = useContext(TeamProjectContext);

  return (
    <div className="mt-6 text-center text-sm text-gray-400">
      Step {currentStep} of 4
    </div>
  );
};

export default TeamProjectProgress;
