// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "../utils/Axios";
// import { toast } from "react-toastify";
import CreateTeamItem from "../components/Team/CreateTeamItem";

export default function CreateTeam() {
  // const [userHasTeam, setUserHasTeam] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  // // Check if the user already belongs to a team
  // useEffect(() => {
  //   const checkUserTeam = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get("/api/v1/user/me");

  //       if (response.data && response.data.data && response.data.data.teamId) {
  //         setUserHasTeam(true);
  //         // Optionally redirect to team dashboard if user already has a team
  //         toast.info("You already belong to a team");
  //         setTimeout(() => {
  //           navigate("/dashboard/team");
  //         }, 2000);
  //       } else {
  //         setUserHasTeam(false);
  //       }
  //     } catch (error) {
  //       console.error("Error checking user team:", error);
  //       toast.error("Failed to check team membership status");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkUserTeam();
  // }, [navigate]);

  // if (isLoading) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       className="flex items-center justify-center h-screen"
  //     >
  //       <div className="flex flex-col items-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
  //         <p className="text-gray-400 mt-4">Checking team status...</p>
  //       </div>
  //     </motion.div>
  //   );
  // }

  // if (userHasTeam) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       className="flex flex-col items-center justify-center h-screen p-4 text-center"
  //     >
  //       <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
  //         You already belong to a team
  //       </h2>
  //       <p className="text-gray-400 mb-6">
  //         You can't create or join another team while you're a member of an existing team.
  //       </p>
  //       <div className="space-x-4">
  //         <button
  //           onClick={() => navigate("/dashboard/team")}
  //           className="rounded-md bg-cyan-400 px-6 py-2 text-sm font-medium text-black hover:bg-cyan-500"
  //         >
  //           Go to Team Dashboard
  //         </button>
  //         <button
  //           onClick={() => navigate("/dashboard")}
  //           className="rounded-md bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
  //         >
  //           Back to Dashboard
  //         </button>
  //       </div>
  //     </motion.div>
  //   );
  // }

  return (
    <div className="min-h-screen">
      <CreateTeamItem />
    </div>
  );
}
