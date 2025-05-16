/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Import components
import TeamAchievements from "../components/Team/TeamAchievements";
import TeamProjects from "../components/Team/TeamProjects";
import TeamExcellence from "../components/Team/TeamExcellence";
import TeamProfileSection from "../components/Team/TeamProfileSection";
import TeamTechStack from "../components/Team/TeamTechStack";
import TeamCategories from "../components/Team/TeamCategories";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ErrorDisplay from "../components/Common/ErrorDisplay";
import NoTeamDisplay from "../components/Team/NoTeamDisplay";

export default function Team() {
  // States
  const [team, setTeam] = useState(null);
  const [teamProjects, setTeamProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [user, setUser] = useState(null);
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [userRole, setUserRole] = useState('Member');
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userRes = await axios.get("/api/v1/user/me");
        if (userRes.data && userRes.data.data) {
          setUser(userRes.data.data);
        } else {
          setError("Failed to load user data.");
        }
      } catch (error) {
        setError("Failed to load user data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      if (!user || !user.teamId || user.teamId === "undefined") {
        setTeam(null);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        // Get team data with populated member details
        const teamRes = await axios.get(`/api/v1/team/`);
        // Debug: log the response to see what you get
        console.log("Team API response:", teamRes.data);

        if (teamRes.data && teamRes.data.success && teamRes.data.data) {
          const teamData = Array.isArray(teamRes.data.data) ? teamRes.data.data[0] : teamRes.data.data;
          setTeam(teamData);

          // Check if current user is the team leader
          const isLeaderCheck = teamData.TeamCreaterId === user._id ||
            teamData.TeamCreaterId?._id === user._id;
          setIsTeamLeader(isLeaderCheck);

          // Get user role in the team
          const currentUserMember = teamData.TeamMembers.find(
            member => member.userId === user._id || member.userId?._id === user._id
          );
          setUserRole(currentUserMember?.role || "Member");

          // Properly format team members data
          const formattedMembers = (teamData.TeamMembers || []).map(member => {
            const memberData = typeof member.userId === 'object' ? member.userId : { _id: member.userId };
            return {
              userId: memberData,
              _id: member._id,
              role: member.role || "Member",
              status: member.status || "Active",
              points: member.points || 0,
              skills: member.skills || [],
              social: member.social || {}
            };
          });

          setTeamMembers(formattedMembers);

          // Projects
          setTeamProjects(
            Array.isArray(teamData.projectId)
              ? teamData.projectId
              : []
          );
        } else {
          setError("Failed to load team data.");
        }
      } catch (error) {
        setError("Failed to load team data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeamData();
  }, [user]);

  useEffect(() => {
    document.title = `Team - ${team?.TeamName || "Loading..."}`;
    return () => {
      document.title = "Team";
    };  
  }, [team]);

  // get team members details
  useEffect(() => {
    const fetchTeamMembersDetails = async () => {
      if (!team || !team._id) return;
      try {
        setIsLoading(true);
        setError(null);

        try {
          // Use the proper team members details route
          const membersRes = await axios.get(`/api/v1/team/${team._id}/members-detail`);

          if (membersRes.data && membersRes.data.success && membersRes.data.data) {
            console.log("Members detail response:", membersRes.data);

            // Process the enhanced member data
            const membersData = membersRes.data.data.TeamMembers.map(member => {
              return {
                _id: member._id,
                userId: member.userId,
                name: member.userDetailData?.name ||
                  (member.userData?.email ? member.userData.email.split('@')[0] : 'Unknown User'),
                email: member.userData?.email || '',
                profilePicture: member.userData?.profilePicture || '',
                phoneNumber: member.phoneNumber || '',
                skills: member.skills || [],
                social: member.social || {},
                points: member.points || 0,
                role: member.role || 'Member',
                status: member.status || 'Active',
                teamId: team._id,
              };
            });

            setTeamMembers(membersData);
          } else {
            // Fallback to existing team members if endpoint doesn't return enhanced data
            console.log("No enhanced member data available, using basic team data");
          }
        } catch (detailError) {
          console.error("Error fetching detailed team members:", detailError);
          // Don't show error to user, just log it - we already have basic team data
        }
      } catch (error) {
        console.error("Error fetching team members details:", error);
        // Don't set error state here since we already have the basic team information
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembersDetails();
  }, [team]);

  // List of technologies from team data or fallback
  const technologies = team?.techStack || [
    "React", "Node.js", "TypeScript", "MongoDB", "Express",
    "GraphQL", "Next.js", "TailwindCSS", "AWS", "Docker",
    "Redux", "Jest", "PostgreSQL", "Firebase"
  ];

  // Add a function to handle leaving the team
  const handleLeaveTeam = async () => {
    try {
      setIsLoading(true);
      if (isTeamLeader) {
        toast.error("Team leaders cannot leave. Transfer leadership or delete the team instead.");
        return;
      }

      // Only execute if user is a member, not the leader
      const response = await axios.delete(`/api/v1/team/${team._id}/members/${user._id}`);

      if (response.data.success) {
        toast.success("You have left the team");
        navigate("/dashboard/team/create");
      } else {
        toast.error(response.data.message || "Failed to leave team");
      }
    } catch (error) {
      console.error("Error leaving team:", error);
      toast.error(error.response?.data?.message || "Failed to leave team");
    } finally {
      setIsLoading(false);
    }
  };

  // Conditional rendering based on loading and error states
  if (isLoading && !team) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
  }

  if (!team) {
    return <NoTeamDisplay onCreateTeam={() => navigate("/dashboard/team/create")} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white p-4 md:p-2 bg-gradient-to-br"
    >
      {/* Mobile Achievements */}
      <div className="lg:hidden mb-6">
        <TeamAchievements isMobile={true} />
      </div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-2">
        {/* Left Column */}
        <div className="lg:col-span-4 p-2 space-y-4">
          {/* Project Cards */}
          <TeamProjects
            projects={teamProjects}
            containerVariants={containerVariants}
          />

          {/* Field of Excellence for desktop */}
          <div className="hidden lg:block">
            <TeamExcellence />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-4">
          {/* Achievements for desktop */}
          <div className="hidden lg:block">
            <TeamAchievements />
          </div>

          {/* Profile and Tech Stack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team profile section */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex-[5] rounded-xl bg-gray-800/40 shadow-lg backdrop-blur-sm border border-gray-700/50 h-[715px]"
            >
              <TeamProfileSection />
            </motion.div>

            {/* Tech Stack */}
            <TeamTechStack
              technologies={technologies}
              containerVariants={containerVariants}
            />
          </div>
        </div>
      </div>

      {/* Field of Excellence for mobile */}
      <div className="lg:hidden mt-6">
        <TeamExcellence />
      </div>

      {/* Bottom Categories */}
      <div className="mt-6">
        <TeamCategories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </motion.div>
  );
}