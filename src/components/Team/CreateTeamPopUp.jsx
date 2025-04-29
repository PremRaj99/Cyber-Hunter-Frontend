/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { X, Search, UserPlus } from 'lucide-react';
import axios from '../../utils/Axios';

export default function CreateTeamPopUp({
  newTeamName,
  setNewTeamName,
  teamDescription,
  setTeamDescription,
  setTeamLogo,
  setIsFormVisible,
  handleCreateTeam,
  isLoading
}) {
  const [fileName, setFileName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Handle file upload for team logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setTeamLogo(file);
    }
  };

  // Handle clicks outside the search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search users by name or email
  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        setIsSearching(true);
        const response = await axios.get(`/api/v1/user/search?q=${searchQuery}`);
        if (response.data.success) {
          // Filter out already selected members
          const filteredResults = response.data.data.filter(
            user => !selectedMembers.some(member => member._id === user._id)
          );
          setSearchResults(filteredResults);
        }
      } catch (error) {
        console.error("Error searching users:", error);
        // Fallback data for testing
        setSearchResults([
          { _id: '1', name: 'John Doe', email: 'john@example.com', profilePicture: 'https://i.pravatar.cc/150?img=1' },
          { _id: '2', name: 'Jane Smith', email: 'jane@example.com', profilePicture: 'https://i.pravatar.cc/150?img=2' },
          { _id: '3', name: 'Alex Johnson', email: 'alex@example.com', profilePicture: 'https://i.pravatar.cc/150?img=3' }
        ].filter(user => !selectedMembers.some(member => member._id === user._id)));
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(searchUsers, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, selectedMembers]);

  // Add member to selected members
  const addMember = (member) => {
    if (selectedMembers.length < 5) {
      setSelectedMembers(prev => [...prev, member]);
      setSearchQuery('');
      setSearchResults([]);
      // Keep focus on input after selecting to allow for adding more members
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // Remove member from selected members
  const removeMember = (memberId) => {
    setSelectedMembers(selectedMembers.filter(member => member._id !== memberId));
  };

  return (
    <div className="bg-gray-900 relative z-50 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Create New Team</h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Team Name */}
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-white mb-2">
            Team Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="teamName"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        {/* Team Description */}
        <div>
          <label htmlFor="teamDescription" className="block text-sm font-medium text-white mb-2">
            Team Description
          </label>
          <textarea
            id="teamDescription"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 h-24"
          />
        </div>

        {/* Team Members Section */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Team Members <span className="text-gray-400">(Max 5)</span>
          </label>

          {/* Selected Members Display */}
          {selectedMembers.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedMembers.map(member => (
                <div
                  key={member._id}
                  className="flex items-center bg-gray-700/50 rounded-full pl-1 pr-2 py-1"
                >
                  <img
                    src={member.profilePicture || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(member.name)}`}
                    alt={member.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-sm text-white">{member.name}</span>
                  <button
                    type="button"
                    onClick={() => removeMember(member._id)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* User Search Input */}
          {selectedMembers.length < 5 && (
            <div className="relative">
              <div className="flex items-center w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search users by name or email"
                  className="bg-transparent text-white w-full focus:outline-none"
                />
                {isSearching && (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-400"></div>
                )}
              </div>

              {/* Search Results Dropdown */}
              {searchFocused && searchResults.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
                >
                  {searchResults.map(user => (
                    <div
                      key={user._id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addMember(user);
                      }}
                      className="flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer group"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={user.profilePicture || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.name)}`}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email || user.qId}</p>
                      </div>
                      <button
                        type="button"
                        className="flex-shrink-0 p-1.5 rounded-full bg-cyan-500 text-black group-hover:bg-cyan-400"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addMember(user);
                        }}
                      >
                        <UserPlus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && searchFocused && searchResults.length === 0 && !isSearching && (
                <div className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg p-3">
                  <p className="text-gray-400 text-center">No users found</p>
                </div>
              )}
            </div>
          )}

          {/* Selected Members Count */}
          <div className="mt-2 text-xs text-gray-400">
            {selectedMembers.length}/5 members selected
          </div>
        </div>

        {/* Team Logo Upload */}
        <div>
          <label
            htmlFor="teamLogo"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Upload Team Logo <span className="text-gray-400">(Optional)</span>
            <div className="text-xs text-gray-400 mt-1">
              File type: .jpg, .png, .jpeg | Max size: 2MB
            </div>
          </label>
          <div className="relative group">
            <input
              type="file"
              id="teamLogo"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept="image/jpeg,image/png,image/jpg"
            />
            <div className="flex items-center justify-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white group-hover:bg-gray-700 group-hover:border-cyan-400 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 20H16M12 4v12" />
              </svg>
              <span className="text-sm truncate max-w-xs">{fileName || "Choose file"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 mt-8 border-t border-gray-700 pt-4">
        <button
          type="button"
          onClick={() => setIsFormVisible(false)}
          disabled={isLoading}
          className="px-6 py-2 text-sm text-white hover:bg-gray-700 focus:outline-none bg-gray-800 border border-gray-600 rounded-md font-semibold transition duration-300 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={(e) => handleCreateTeam(e, {
            TeamName: newTeamName,
            TeamDescription: teamDescription,
            TeamLogo: fileName,
            TeamMembers: selectedMembers.map(member => member._id)
          })}
          disabled={isLoading || !newTeamName.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400 transition-all duration-300 "
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            "Create Team"
          )}
        </button>         
      </div>
    </div>
  );
}
