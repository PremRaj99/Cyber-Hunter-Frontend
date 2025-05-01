/* eslint-disable no-unused-vars */
import { useState, useEffect, createContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Hooks and context
import { useTeamData } from '../hooks/useTeamData';
import { TeamContext } from '../context/TeamContext';

// Component imports
import TeamHeader from "../components/Team/TeamManage/TeamHeader";
import TeamTabs from '../components/Team/TeamManage/TeamTabs';
import TeamOverviewTab from '../components/Team/TeamManage/TeamOverviewTab';
import TeamMembersTab from '../components/Team/TeamManage/TeamMembersTab';
import TeamTechStackTab from '../components/Team/TeamManage/TeamTechStackTab';
import TeamContentWrapper from './TeamManage/TeamContentWrapper';
import {
  TeamLoadingState,
  TeamErrorState,
  TeamNoTeamState,
  TeamNoPermissionState
} from '../components/Team/TeamManage/TeamStates';

// Utilities
import { handleImageOperations } from '../utils/teamImageUtils';

const TeamSettings = () => {
  const navigate = useNavigate();
  const { teamId: paramTeamId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Use the custom hook to fetch and manage team data
  const {
    teamId,
    formData,
    setFormData,
    teamMembers,
    setTeamMembers,
    isTeamLeader,
    isLoading,
    setIsLoading,
    isFetching,
    error,
    userStatus,
    updateTeam
  } = useTeamData(paramTeamId, navigate);

  // Image handlers from utility function
  const { handleImageChange, handleImageEnter, handleImageLeave, removeImage } =
    handleImageOperations(setImageFile, setImagePreview, setFormData, formData);

  // Handle form submission
  const handleSubmit = async () => {
    await updateTeam(teamId, formData, imageFile);
  };

  // Render different states based on loading/error status
  if (isFetching) {
    return <TeamLoadingState />;
  }

  if (error) {
    return <TeamErrorState error={error} navigate={navigate} />;
  }

  if (userStatus === 'noTeam') {
    return <TeamNoTeamState navigate={navigate} />;
  }

  if (userStatus === 'noPermission' || userStatus === 'teamNotFound') {
    return (
      <TeamNoPermissionState
        userStatus={userStatus}
        navigate={navigate}
      />
    );
  }

  // Shared context values for child components
  const contextValue = {
    activeTab,
    setActiveTab,
    isLoading,
    teamId,
    formData,
    setFormData,
    teamMembers,
    setTeamMembers,
    isTeamLeader,
    handleSubmit,
    imageFile,
    imagePreview,
    handleImageChange,
    handleImageEnter,
    handleImageLeave,
    removeImage,
    navigate
  };

  return (
    <TeamContext.Provider value={contextValue}>
      <TeamHeader
        teamId={teamId}
        formData={formData}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        setActiveTab={setActiveTab}
        setFormData={setFormData} 
        imageFile={imageFile}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        handleImageEnter={handleImageEnter}
        handleImageLeave={handleImageLeave}
        removeImage={removeImage}
      />
      <TeamContentWrapper>
        <TeamTabs />

        {/* Render the active tab content */}
        {activeTab === 'overview' && <TeamOverviewTab />}
        {activeTab === 'members' && <TeamMembersTab />}
        {activeTab === 'tech' && <TeamTechStackTab />}
        {/* Add other tab components here as needed */}
      </TeamContentWrapper>
    </TeamContext.Provider>
  );
};

export default TeamSettings;