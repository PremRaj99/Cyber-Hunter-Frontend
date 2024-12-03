import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import DTeam from "../components/dashboard/dTeam";
import DPersonal from "../components/dashboard/dPersonal";
import DContact from "../components/dashboard/dContact";
import DLeaderBoard from "../components/dashboard/dLeaderBorad";
import DNotification from "../components/dashboard/dNotification";
import DSetting from "../components/dashboard/dSetting";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("case");

  const renderContent = () => {
    switch (activeSection) {
      case "team":
        return <DTeam />;
      case "personal":
        return <DPersonal />;
      case "leaderboard":
        return <DLeaderBoard />;
      case "notification":
        return <DNotification />;
      case "contact":
        return <DContact />;
      case "settings":
        return <DSetting />;
      default:
        return () => {
          console.log("No active section");
        };
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="_dashboard">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        HOME {">"} DASHBOARD
      </motion.h2>
      <div className="dMainContainer">
        <Sidebar
          onSectionChange={setActiveSection}
          activeSection={activeSection}
        />

        <div className="ddivider"></div>
        <div className="dmain">
          <motion.div
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-brandPrimary w-72 h-72 rounded-full blur-3xl opacity-45 absolute bottom-1/4 left-150"
          ></motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
