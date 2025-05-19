/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, Clock, Bell } from "lucide-react";
import axios from "../../utils/Axios";
import { toast } from "react-toastify";

const RequestBadge = ({ status }) => {
  const badgeStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    accepted: "bg-green-100 text-green-800 border-green-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
    invited: "bg-blue-100 text-blue-800 border-blue-300",
  };

  const icons = {
    pending: <Clock size={14} />,
    accepted: <CheckCircle size={14} />,
    rejected: <XCircle size={14} />,
    invited: <CheckCircle size={14} />,
  };

  const displayText = {
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    invited: "Invited",
  };

  return (
    <div
      className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 border ${
        badgeStyles[status] || badgeStyles.pending
      }`}
    >
      {icons[status]}
      <span>{displayText[status] || "Pending"}</span>
    </div>
  );
};

export default function TeamRequestsPopUp({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("invite");
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [receivedUserInvite, setReceivedUserInvite] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Format date to be more human-readable
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch user's teams and their associated requests
  useEffect(() => {
    if (!isOpen) return;

    const fetchUserTeamsAndRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get user's teams (assuming you're a team leader)
        const teamsResponse = await axios.get("/api/v1/team/");
        console.log("Teams response:", teamsResponse);

        if (teamsResponse.data && teamsResponse.data.success) {
          const teams = teamsResponse.data.data;
          setUserTeams(Array.isArray(teams) ? teams : [teams]);

          // If we have teams, select the first one by default
          if (Array.isArray(teams) && teams.length > 0) {
            const firstTeamId = teams[0]._id;
            setSelectedTeam(firstTeamId);
            console.log("Selected first team ID:", firstTeamId);

            // Get join requests for the first team
            if (firstTeamId) {
              try {
                const joinRequestsResponse = await axios.get(
                  `/api/v1/team/${firstTeamId}/join-requests`
                );
                console.log(
                  "Join requests response for first team:",
                  joinRequestsResponse
                );

                if (
                  joinRequestsResponse.data &&
                  joinRequestsResponse.data.data
                ) {
                  setReceivedRequests(joinRequestsResponse.data.data);
                } else {
                  console.log("No join requests data format found in response");
                  setReceivedRequests([]);
                }
              } catch (requestError) {
                console.error(
                  `Error fetching join requests for team ${firstTeamId}:`,
                  requestError
                );
                toast.error("Failed to load join requests for your team");
              }
            }
          }
        }

        // Get user's sent join requests
        const sentRequestsResponse = await axios.get(
          "/api/v1/team/my-join-requests"
        );
        console.log("Sent requests response:", sentRequestsResponse);

        if (sentRequestsResponse.data && sentRequestsResponse.data.data) {
          setSentRequests(sentRequestsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        setError("Failed to load team requests. Please try again later.");
        toast.error("Failed to load team requests");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTeamsAndRequests();
  }, [isOpen]);

  const fetchReceivedRequest = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const joinRequestsResponse = await axios.get(`/api/v1/user-invite`);
      console.log("Join requests response:", joinRequestsResponse.data.data);

      if (joinRequestsResponse.data && joinRequestsResponse.data.data) {
        setReceivedUserInvite(joinRequestsResponse.data.data);
      } else {
        setReceivedUserInvite([]);
      }
    } catch (error) {
      console.error("Error fetching team join requests:", error);
      toast.error("Failed to load join requests for this team");
      setReceivedUserInvite([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReceivedRequest();
  }, []);

  // Handle changing selected team
  const handleTeamChange = async (teamId) => {
    try {
      setSelectedTeam(teamId);
      setIsLoading(true);

      // This is the correct API endpoint path
      const joinRequestsResponse = await axios.get(
        `/api/v1/team/${teamId}/join-requests`
      );

      // const joinRequestsResponse = await axios.get(`/api/v1/user-invite/${teamId}/join-requests`);

      console.log(
        "Join requests response for team change:",
        joinRequestsResponse
      );

      if (joinRequestsResponse.data && joinRequestsResponse.data.data) {
        setReceivedRequests(joinRequestsResponse.data.data);
      } else {
        setReceivedRequests([]);
      }
    } catch (error) {
      console.error("Error fetching team join requests:", error);
      toast.error("Failed to load join requests for this team");
      setReceivedRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle accept/reject request
  const handleResponseToRequest = async (teamId, requestId, accept) => {
    try {
      setIsProcessingAction(true);

      // Fix the URL format to match what the backend expects
      const response = await axios.put(
        `/api/v1/team/${teamId}/join-request/${requestId}`,
        {
          status: accept ? "accepted" : "rejected",
        }
      );

      console.log("Response to join request:", response);

      // Update the local state to reflect the change
      setReceivedRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId
            ? { ...req, status: accept ? "accepted" : "rejected" }
            : req
        )
      );

      toast.success(
        accept ? "Request accepted successfully!" : "Request rejected"
      );
    } catch (error) {
      console.error("Error responding to request:", error);
      toast.error(
        `Failed to ${accept ? "accept" : "reject"} request: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsProcessingAction(false);
    }
  };

  // Handle cancel sent request
  const handleCancelRequest = async (teamId) => {
    try {
      setIsProcessingAction(true);
      await axios.delete(`/api/v1/team/${teamId}/join-request`);

      // Remove the cancelled request from the state
      setSentRequests((prevRequests) =>
        prevRequests.filter((req) => req.teamId !== teamId)
      );

      toast.success("Join request cancelled successfully");
    } catch (error) {
      console.error("Error cancelling request:", error);
      toast.error(`Failed to cancel request: ${error.message}`);
    } finally {
      setIsProcessingAction(false);
    }
  };

  const StatusIcon = ({ status }) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="text-yellow-500" size={18} />;
      case "accepted":
        return <Check className="text-green-500" size={18} />;
      case "rejected":
        return <X className="text-red-500" size={18} />;
      default:
        return <Clock className="text-gray-500" size={18} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                Team Join Requests
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab("invite")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "invite"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Received Invites
              </button>
              <button
                onClick={() => setActiveTab("received")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "received"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Received Requests
              </button>
              <button
                onClick={() => setActiveTab("sent")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "sent"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Your Requests
              </button>
            </div>

            {/* Content */}
            <div
              className="p-6 overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 130px)" }}
            >
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="w-10 h-10 border-t-transparent border-4 border-cyan-400 rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white"
                  >
                    Retry
                  </button>
                </div>
              ) : activeTab === "invite" ? (
                <>
                  {/* Team selection dropdown for received requests */}
                  {receivedUserInvite.length > 0 &&
                    receivedUserInvite.map((receivedUserInvite) => (
                      <div
                        key={receivedUserInvite._id}
                        className="p-4 hover:bg-gray-900 transition-colors"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="bg-cyan-500 rounded-full flex-shrink-0">
                            <img
                              src={
                                receivedUserInvite.teamId?.TeamLogo ||
                                `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                                  receivedUserInvite.teamId?.TeamName
                                )}`
                              }
                              alt={receivedUserInvite.teamId?.TeamName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-white">
                                {receivedUserInvite.teamId?.TeamName ||
                                  "Unknown"}
                              </p>
                              <StatusIcon status={receivedUserInvite.status} />
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-400">
                                  From:{" "}
                                  {receivedUserInvite.teamId?.TeamCreaterId
                                    ?.email || "Unknown"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDate(receivedUserInvite.createdAt)}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-3 py-1 rounded-md text-sm font-medium transition-colors">
                                  Accept
                                </button>
                                <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              ) : activeTab === "received" ? (
                <>
                  {/* Team selection dropdown for received requests */}
                  {userTeams.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Select Team
                      </label>
                      <select
                        value={selectedTeam || ""}
                        onChange={(e) => handleTeamChange(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        {userTeams.map((team) => (
                          <option key={team._id} value={team._id}>
                            {team.TeamName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Received requests list */}
                  {receivedRequests.length > 0 ? (
                    <div className="space-y-4">
                      {receivedRequests.map((request) => (
                        <div
                          key={request._id}
                          className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4"
                        >
                          <div className="flex items-center flex-grow">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-900">
                              <img
                                src={
                                  request.userData.profilePicture ||
                                  `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                                    request.userData.name ||
                                      request.userData.email
                                  )}`
                                }
                                alt={request.userData.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-white font-medium">
                                {request.userData.name ||
                                  request.userData.email}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                {request.message || "No introduction message"}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Requested: {formatDate(request.requestedAt)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 md:flex-col">
                            <RequestBadge status={request.status} />

                            <div className="flex gap-2 mt-2">
                              {request.status === "pending" && (
                                <div className="flex gap-2 items-end justify-end">
                                  <button
                                    onClick={() =>
                                      handleResponseToRequest(
                                        selectedTeam,
                                        request._id,
                                        true
                                      )
                                    }
                                    disabled={isProcessingAction}
                                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-xs font-medium disabled:opacity-50"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleResponseToRequest(
                                        selectedTeam,
                                        request._id,
                                        false
                                      )
                                    }
                                    disabled={isProcessingAction}
                                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs font-medium disabled:opacity-50"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-400">
                        {selectedTeam
                          ? "No join requests found for this team"
                          : "Select a team to view join requests"}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                // Sent requests (Your Requests tab)
                <>
                  {sentRequests.length > 0 ? (
                    <div className="space-y-4">
                      {sentRequests.map((request) => (
                        <div
                          key={request.requestId || request.teamId}
                          className="bg-gray-900 rounded-lg p-4 border border-cyan-400/20  md:items-center gap-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                                <img
                                  src={
                                    request.teamLogo ||
                                    `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                                      request.teamName
                                    )}`
                                  }
                                  alt={request.teamName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-white font-medium">
                                  {request.teamName || "Team"}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  Sent: {formatDate(request.requestedAt)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <RequestBadge status={request.status} />

                              {request.status === "pending" && (
                                <button
                                  onClick={() =>
                                    handleCancelRequest(request.teamId)
                                  }
                                  disabled={isProcessingAction}
                                  className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-500 text-xs font-medium disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>

                          {request.message && (
                            <div className="mt-3 pt-3 border-t border-gray-600">
                              <p className="text-sm text-gray-300">
                                <span className="font-medium text-gray-400">
                                  Your message:
                                </span>{" "}
                                {request.message}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-400">
                        You haven&apos;t sent any join requests yet.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
