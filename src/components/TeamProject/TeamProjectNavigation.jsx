import { useContext } from "react";
import { ChevronRight, Upload } from "lucide-react";
import { TeamProjectContext } from "../../pages/AddTeamProject";

const TeamProjectNavigation = () => {
  const {
    currentStep,
    setCurrentStep,
    loading,
    handleSubmit
  } = useContext(TeamProjectContext);

  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
        className="px-6 py-3 text-white hover:text-brandPrimary hover:border-brandPrimary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 rounded-lg border border-gray-700"
        disabled={currentStep === 1}
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        Back
      </button>

      {currentStep < 4 ? (
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          className="px-6 py-3 font-semibold bg-brandPrimary hover:bg-black hover:border hover:border-brandPrimary hover:text-brandPrimary text-black rounded-lg flex items-center gap-2 transition-colors"
        >
          Next Step
          <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 bg-brandPrimary text-black hover:text-brandPrimary hover:border hover:border-brandPrimary hover:bg-black font-semibold rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black hover:border-brandPrimary border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            <>
              Upload Project
              <Upload className="w-5 h-5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default TeamProjectNavigation;
