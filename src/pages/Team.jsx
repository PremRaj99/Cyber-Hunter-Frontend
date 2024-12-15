import React from "react";

import DiscriptionSection from "../components/Profile/DiscriptionSection";
import ProjectSection from "../components/Profile/ProjectSection";
import BadgeSection from "../components/Profile/BadgeSection";
import TechStackSection from "../components/Profile/TechStackSection";
import TeamProfileSection from "../components/Team/TeamProfileSection";

export default function Team() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-10 py-2 bg-profile">
      <div className="flex h-full gap-2 flex-col w-full">
        <div className="flex-[5] flex md:flex-row flex-col-reverse gap-2">
          <div className="flex-1 rounded-md bg-gray-900 bg-opacity-80">
            <ProjectSection />
          </div>
          <div className="flex-[2] flex flex-col gap-2">
            <div className="flex-1 rounded-md overflow-hidden bg-gray-900 bg-opacity-80">
              <BadgeSection />
            </div>
            <div className="flex-[4] flex gap-2">
              <div className="flex-[5] rounded-md bg-gray-900 bg-opacity-80">
                <TeamProfileSection />
              </div>
              <div className="flex-[4] rounded-md bg-gray-900 bg-opacity-80">
                <TechStackSection />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-gray-900 bg-opacity-80">
          <DiscriptionSection />
        </div>
      </div>
    </div>
  );
}
