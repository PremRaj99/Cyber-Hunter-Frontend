import { useContext } from "react";
import { motion } from "framer-motion";
import { Rocket, Camera, Code2, Globe } from "lucide-react";
import { TeamProjectContext } from "../../pages/AddTeamProject";

const TeamProjectSteps = () => {
  const { currentStep, setCurrentStep } = useContext(TeamProjectContext);

  const steps = [
    { title: "Project Info", icon: <Rocket className="w-6 h-6" /> },
    { title: "Media Upload", icon: <Camera className="w-6 h-6" /> },
    { title: "Tech Stack", icon: <Code2 className="w-6 h-6" /> },
    { title: "Links", icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="flex justify-between mb-12 relative">
      {steps.map((step, index) => (
        <motion.button
          key={index}
          initial={{ scale: 0.8 }}
          animate={{ scale: currentStep === index + 1 ? 1.1 : 1 }}
          className={`flex flex-col items-center space-y-2 ${currentStep === index + 1
              ? "text-cyan-400"
              : currentStep > index + 1
                ? "text-green-400"
                : "text-gray-500"
            }`}
          onClick={() => setCurrentStep(index + 1)}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep === index + 1
              ? "bg-brandPrimary/20 ring-2 ring-cyan-400"
              : currentStep > index + 1
                ? "bg-green-500/20 ring-2 ring-green-400"
                : "bg-gray-800"
            }`}>
            {step.icon}
          </div>
          <span className="text-sm font-medium hidden md:block">{step.title}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default TeamProjectSteps;
