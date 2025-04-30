/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Users, Check, X, Clock } from 'lucide-react';
import { TeamService } from '../../services/TeamService';
import axios from 'axios';

const TeamInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Directly try to get the join requests without preliminary session check
      const response = await axios.get('/api/v1/team/my-join-requests');

      // Process the response data
      if (response.data && response.data.success) {
        // Filter only the invited ones
        const invitedRequests = response.data.data.filter(req => req.status === 'invited');
        setInvitations(invitedRequests);
      } else {
        // Handle empty or unexpected response format
        console.warn('Unexpected response format:', response);
        setInvitations([]);
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);

      // More specific error handling based on status codes
      if (error.response?.status === 401) {
        setError('Please login to view your invitations');
        toast.error('Authentication required');
      } else {
        setError('Failed to load team invitations');
        toast.error('Could not load invitations');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvitationResponse = async (teamId, requestId, accept) => {
    try {
      await axios.put(`/api/v1/team/${teamId}/join-request/${requestId}`, {
        status: accept ? 'accepted' : 'rejected'
      });

      // Update UI
      setInvitations(prevInvitations =>
        prevInvitations.filter(invite => invite.requestId !== requestId)
      );

      toast.success(accept ?
        'You have joined the team successfully!' :
        'Invitation was declined'
      );

      // Redirect if accepted
      if (accept) {
        setTimeout(() => {
          window.location.href = '/dashboard/team';
        }, 1500);
      }
    } catch (error) {
      console.error('Error responding to invitation:', error);
      toast.error('Failed to respond to invitation');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-center">
        <p className="text-red-400">{error}</p>
        <button
          onClick={fetchInvitations}
          className="mt-4 px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No invitations state
  if (invitations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 rounded-lg p-8 text-center"
      >
        <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <Users size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">No Team Invitations</h3>
        <p className="text-gray-400">You don&apos;t have any pending invitations to join teams.</p>
      </motion.div>
    );
  }

  // Invitations list
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-bold text-white mb-4">Team Invitations</h2>

      {invitations.map((invitation) => (
        <motion.div
          key={invitation.requestId}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700">
                <img
                  src={invitation.teamLogo || "https://via.placeholder.com/100"}
                  alt={invitation.teamName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-white font-semibold">{invitation.teamName}</h3>
                <div className="flex items-center text-gray-400 text-sm mt-1">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {new Date(invitation.requestedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Invitation message would go here if available */}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => handleInvitationResponse(invitation.teamId, invitation.requestId, false)}
                className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
              >
                <X size={16} className="mr-1" />
                <span>Decline</span>
              </button>
              <button
                onClick={() => handleInvitationResponse(invitation.teamId, invitation.requestId, true)}
                className="flex items-center px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black rounded-md transition"
              >
                <Check size={16} className="mr-1" />
                <span>Accept</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TeamInvitations;
