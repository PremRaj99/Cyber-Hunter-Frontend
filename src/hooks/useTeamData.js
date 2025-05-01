import { useState, useEffect } from "react";
import axios from "../utils/Axios";
import { TeamService } from "../services/TeamService";
import { toast } from "react-toastify";

export const useTeamData = (paramTeamId, navigate) => {
  const [teamId, setTeamId] = useState(paramTeamId || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [userStatus, setUserStatus] = useState("loading");
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [formData, setFormData] = useState({
    teamName: "",
    description: "",
    teamImage: "",
    techStack: [],
    interests: [],
    achievements: [],
    projects: [],
    isHoveringImage: false,
  });

  // Enhanced processTeamData function to fetch detailed member data
  const processTeamData = async (team) => {
    // Update form data with team details
    setFormData({
      teamName: team.TeamName || "",
      description: team.TeamDescription || "",
      teamImage: team.TeamLogo || "",
      techStack: team.techStack || [],
      interests: team.interests || [],
      achievements: team.achievementId || [],
      projects: team.projectId || [],
      isHoveringImage: false,
    });

    // Try to fetch enhanced member data from members-detail endpoint
    try {
      const membersDetailResponse = await axios.get(
        `/api/v1/team/${team._id}/members-detail`
      );

      if (
        membersDetailResponse.data &&
        membersDetailResponse.data.success &&
        membersDetailResponse.data.data
      ) {
        console.log("Members detail response:", membersDetailResponse.data);

        // Process the enhanced member data
        const enhancedMembers = membersDetailResponse.data.data.TeamMembers.map(
          (member) => {
            return {
              id: member._id,
              userId: member.userId,
              name:
                member.userDetailData?.name ||
                (member.userData?.email
                  ? member.userData.email.split("@")[0]
                  : "Unknown User"),
              email: member.userData?.email || "",
              profilePicture: member.userData?.profilePicture || "",
              image:
                member.userData?.profilePicture ||
                `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                  member.userDetailData?.name ||
                    (member.userData?.email
                      ? member.userData.email.split("@")[0]
                      : "Unknown User")
                )}`,
              phoneNumber: member.phoneNumber || "",
              skills: member.skills || [],
              social: member.social || {},
              points: member.points || 0,
              role: member.role || "Member",
              status: member.status || "Active",
            };
          }
        );

        setTeamMembers(enhancedMembers);
        return; // Exit early if we successfully got member details
      }
    } catch (detailError) {
      console.error("Error fetching detailed team members:", detailError);
      // Don't show error to user, continue with fallback basic member info
    }

    // Fallback: Use basic team member data if members-detail fails
    if (team.TeamMembers && team.TeamMembers.length > 0) {
      const formattedMembers = team.TeamMembers.map((member) => {
        let name = "Unknown User";
        let image = null;

        if (typeof member.userId === "object") {
          // Try to get name from populated user object
          if (member.userId.name) {
            name = member.userId.name;
          } else if (member.userId.email) {
            name = member.userId.email;
          }

          // Try to get profile image
          image = member.userId.profilePicture || null;
        }

        return {
          id:
            typeof member.userId === "object"
              ? member.userId._id
              : member.userId,
          userId:
            typeof member.userId === "object"
              ? member.userId._id
              : member.userId,
          name,
          role: member.role || "Member",
          image:
            image ||
            `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
              name
            )}`,
          status: member.status || "Active",
          points: member.points || 0,
        };
      });

      setTeamMembers(formattedMembers);
    }
  };

  // Format and update team members
  const updateTeamData = async (team) => {
    // Update form data with team details
    setFormData({
      teamName: team.TeamName || "",
      description: team.TeamDescription || "",
      teamImage: team.TeamLogo || "",
      techStack: team.techStack || [],
      interests: team.interests || [],
      achievements: team.achievementId || [],
      projects: team.projectId || [],
      isHoveringImage: formData.isHoveringImage, // Keep the hover state
    });

    // Format team members
    if (team.TeamMembers && team.TeamMembers.length > 0) {
      const formattedMembers = team.TeamMembers.map((member) => {
        let name = "Unknown User";
        let image = null;

        if (typeof member.userId === "object") {
          // Try to get name from populated user object
          if (member.userId.name) {
            name = member.userId.name;
          } else if (member.userId.email) {
            name = member.userId.email;
          }

          // Try to get profile image
          image = member.userId.profilePicture || null;
        }

        return {
          id:
            typeof member.userId === "object"
              ? member.userId._id
              : member.userId,
          name,
          role: member.role || "Member",
          image:
            image ||
            `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
              name
            )}`,
          status: member.status || "Active",
          points: member.points || 0,
        };
      });

      setTeamMembers(formattedMembers);
    }
  };

  // Modified useEffect to call the async processTeamData
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsFetching(true);
        setError(null);

        // Check if we have a team ID from params
        if (paramTeamId) {
          try {
            const teamResponse = await TeamService.getTeamById(paramTeamId);

            if (teamResponse && teamResponse.data) {
              // Save team ID
              setTeamId(paramTeamId);

              // Get user data to check permissions
              const userResponse = await axios.get("/api/v1/user/me");

              if (userResponse.data && userResponse.data.data) {
                const currentUserId = userResponse.data.data._id;
                // Check if response has nested data structure
                const team = teamResponse.data.data || teamResponse.data;

                console.log("Team data received:", team);

                // Check if user is team leader
                const isLeader =
                  team.TeamCreaterId &&
                  currentUserId &&
                  (typeof team.TeamCreaterId === "object"
                    ? team.TeamCreaterId._id.toString() ===
                      currentUserId.toString()
                    : team.TeamCreaterId.toString() ===
                      currentUserId.toString());

                setIsTeamLeader(isLeader);
                console.log("User is team leader:", isLeader);

                // Check if user is part of the team
                const isMember =
                  team.TeamMembers &&
                  team.TeamMembers.some((member) => {
                    const memberId =
                      typeof member.userId === "object"
                        ? member.userId._id
                        : member.userId;
                    return memberId.toString() === currentUserId.toString();
                  });

                if (isLeader || isMember) {
                  // User has access to this team - use async processTeamData
                  await processTeamData(team);
                  setUserStatus("hasTeam");
                } else {
                  // User is not part of this team
                  setError(
                    "You don't have permission to access this team's settings"
                  );
                  setUserStatus("noPermission");
                }
              } else {
                throw new Error("Failed to get user data");
              }
            } else {
              console.error("Invalid team response format:", teamResponse);
              throw new Error("Team data not available");
            }
          } catch (error) {
            console.error("Error loading team:", error);

            if (error.isNotFound || error.status === 404) {
              setError("The team you're looking for doesn't exist");
              setUserStatus("teamNotFound");
            } else {
              setError("Failed to load team data. Please try again later.");
              setUserStatus("error");
            }
          }
        }
        // No team ID in params, check user's team
        else {
          const userResponse = await axios.get("/api/v1/user/me");

          if (userResponse.data && userResponse.data.data) {
            if (userResponse.data.data.teamId) {
              const userTeamId = userResponse.data.data.teamId;
              setTeamId(userTeamId);

              // Fetch team data
              try {
                // Try using direct axios request for consistency
                const teamResponse = await axios.get(
                  `/api/v1/team/${userTeamId}`
                );

                if (teamResponse.data && teamResponse.data.data) {
                  const team = teamResponse.data.data;

                  // Check if user is team leader
                  const isLeader =
                    team.TeamCreaterId &&
                    userResponse.data.data._id &&
                    team.TeamCreaterId.email === userResponse.data.data.email;
                  setIsTeamLeader(isLeader);

                  // Process team data - use async processTeamData
                  await processTeamData(team);
                  setUserStatus("hasTeam");
                } else {
                  console.error("Invalid team response format:", teamResponse);
                  throw new Error("Team data not available");
                }
              } catch (error) {
                console.error("Error loading user's team:", error);
                setError("Failed to load your team data");
                setUserStatus("error");
              }
            } else {
              // User doesn't have a team
              setUserStatus("noTeam");
              setError("You don't belong to any team");
            }
          } else {
            setError("Failed to load user data");
            setUserStatus("error");
          }
        }
      } catch (error) {
        console.error("Team settings error:", error);
        setError("Error loading team data");
        setUserStatus("error");
      } finally {
        setIsFetching(false);
      }
    };

    fetchTeamData();
  }, [paramTeamId, navigate]);

  // Submit team updates - extracted to be reusable
  const updateTeam = async (teamId, formData, imageFile) => {
    if (!teamId) {
      toast.error("No team ID available");
      return;
    }

    // Prevent non-leaders from updating
    if (!isTeamLeader) {
      toast.error("Only team leaders can update team settings");
      return;
    }

    setIsLoading(true);
    try {
      // Proceed with update
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("TeamName", formData.teamName);
      formDataToSubmit.append("TeamDescription", formData.description);

      // Add team logo if there's a new file
      if (imageFile) {
        formDataToSubmit.append("TeamLogo", imageFile);
      }

      // Add tech stack
      if (formData.techStack && formData.techStack.length > 0) {
        formData.techStack.forEach((tech, index) => {
          formDataToSubmit.append(`techStack[${index}]`, tech);
        });
      }

      // Add interests
      if (formData.interests && formData.interests.length > 0) {
        formData.interests.forEach((interest, index) => {
          formDataToSubmit.append(`interests[${index}]`, interest);
        });
      }

      // Use TeamService for the update
      const response = await TeamService.updateTeam(teamId, formDataToSubmit);

      if (response && response.success) {
        toast.success("Team updated successfully");

        // Refresh team data after successful update
        const refreshResponse = await TeamService.getTeamById(teamId);
        if (refreshResponse && refreshResponse.success) {
          const team = refreshResponse.data;
          await updateTeamData(team);
        }
      } else {
        toast.error(response?.message || "Failed to update team");
      }
    } catch (error) {
      console.error("Error updating team:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data?.message || "Failed to update team");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teamId,
    setTeamId,
    isLoading,
    setIsLoading,
    isFetching,
    error,
    userStatus,
    isTeamLeader,
    teamMembers,
    setTeamMembers,
    formData,
    setFormData,
    processTeamData,
    updateTeamData,
    updateTeam,
  };
};
