/**
 * Emergency workaround utility for team joining functionality
 * This can be called from the console as a last resort
 */
import axios from "./Axios";

// Function to join a team with multiple fallback methods
export const emergencyJoinTeam = async (teamId) => {
  if (!teamId) {
    console.error("Team ID required");
    return { success: false, message: "Team ID required" };
  }

  console.log(`Emergency join attempt for team: ${teamId}`);

  try {
    // Try all possible approaches
    const methods = [
      // Method 1: Standard axios JSON
      () =>
        axios.post(
          `/api/v1/team/${teamId}/join-request`,
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        ),

      // Method 2: Empty request body
      () => axios.post(`/api/v1/team/${teamId}/join-request`),

      // Method 3: URL parameters
      () => axios.post(`/api/v1/team/${teamId}/join-request?_=${Date.now()}`),

      // Method 4: Plain text
      () =>
        axios.post(`/api/v1/team/${teamId}/join-request`, "empty", {
          headers: { "Content-Type": "text/plain" },
        }),

      // Method 5: Direct fetch API
      async () => {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `${axios.defaults.baseURL}/api/v1/team/${teamId}/join-request`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return await response.json();
      },
    ];

    // Try each method until one succeeds
    for (let i = 0; i < methods.length; i++) {
      try {
        console.log(`Trying method ${i + 1}...`);
        const result = await methods[i]();
        if (result.data?.success || result.success) {
          console.log(`Method ${i + 1} succeeded!`);
          return {
            success: true,
            message: "Join request successful",
            data: result.data || result,
            method: i + 1,
          };
        }
      } catch (err) {
        console.log(`Method ${i + 1} failed:`, err);
      }
    }

    return { success: false, message: "All join methods failed" };
  } catch (error) {
    console.error("Emergency join failed:", error);
    return { success: false, message: error.message };
  }
};

// For console access
window.emergencyJoinTeam = emergencyJoinTeam;

// Example: Call from console with: window.emergencyJoinTeam("68111438ae98cf007f7f1b9c")
