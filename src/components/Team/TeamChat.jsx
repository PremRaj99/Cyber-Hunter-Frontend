/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Smile, Paperclip, Search, Menu, Plus, Hash,
  Image, File, Loader, X, MoreHorizontal, MessageSquare, Bell
} from "lucide-react";
import axios from "../../utils/Axios";

const TeamChat = () => {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [allMessages, setAllMessages] = useState({});
  const [channels, setChannels] = useState([]);
  const [team, setTeam] = useState(null);
  const [teamId, setTeamId] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Fetch team data including channels and messages
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        // Get user's teams with populated member details
        const userTeamsResponse = await axios.get("/api/v1/team/user-teams");

        if (userTeamsResponse.data.success && userTeamsResponse.data.data?.length > 0) {
          const id = userTeamsResponse.data.data[0]._id; // Get first team
          setTeamId(id);

          // Get team details including channels and members
          const teamResponse = await axios.get(`/api/v1/team/${id}`);
          if (teamResponse.data.success) {
            const teamData = teamResponse.data.data;
            setTeam(teamData);

            // Extract channels
            if (teamData.channels && teamData.channels.length > 0) {
              setChannels(teamData.channels.map(channel => ({
                id: channel._id,
                name: channel.name,
                description: channel.description,
                unread: 0,
                isActive: channel.isActive
              })));
            } else {
              // Default channel if none exist
              setChannels([{ id: 1, name: "general", unread: 0, isActive: true }]);
            }

            // Get messages for the general channel
            await fetchMessages(id, "general");
          }
        } else {
          // No teams found
          setChannels([{ id: 1, name: "general", unread: 0, isActive: true }]);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Fetch messages for a channel
  const fetchMessages = async (teamId, channelName) => {
    if (!teamId) return;

    try {
      const response = await axios.get(`/api/v1/team/${teamId}/chat/${channelName}`);
      if (response.data.success) {
        setAllMessages(prev => ({
          ...prev,
          [channelName]: response.data.data || []
        }));
      }
    } catch (error) {
      console.error(`Error fetching messages for channel ${channelName}:`, error);
      setAllMessages(prev => ({
        ...prev,
        [channelName]: []
      }));
    }
  };

  // Send message to channel
  const sendMessage = async () => {
    if (!message.trim() || !teamId) return;

    try {
      const payload = {
        message: message.trim(),
        timestamp: new Date()
      };

      const response = await axios.post(
        `/api/v1/team/${teamId}/chat/${selectedChannel}`,
        payload
      );

      if (response.data.success) {
        // Add the new message to the UI
        const newMessage = response.data.data;
        setAllMessages(prev => ({
          ...prev,
          [selectedChannel]: [...(prev[selectedChannel] || []), newMessage]
        }));
      }

      // Clear input field
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle window resize and update sidebar state accordingly
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      // Auto close sidebar on mobile
      if (newWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state based on window width
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages[selectedChannel]]);

  // Auto close sidebar when selecting a channel on mobile
  const handleChannelSelect = (channelName) => {
    setSelectedChannel(channelName);
    if (windowWidth < 768) {
      setSidebarOpen(false);
    }

    // Check if we need to fetch messages for this channel
    if (!allMessages[channelName]) {
      fetchMessages(teamId, channelName);
    }
  };

  // Get messages for current channel
  const currentMessages = allMessages[selectedChannel] || [];

  // Fallback messages
  const fallbackMessages = [
    {
      id: 1,
      userId: { name: "Sarah Parker", profilePicture: "/api/placeholder/32/32" },
      message: "Hey team! I just pushed the latest design updates to Figma.",
      timestamp: new Date().toISOString(),
      status: "online",
      reactions: ["👍", "🎨"],
    },
    {
      id: 2,
      userId: { name: "Mike Johnson", profilePicture: "/api/placeholder/32/32" },
      message: "Great work! I'll review it right away. Anyone else available for a quick feedback session?",
      timestamp: new Date().toISOString(),
      status: "offline",
      reactions: [],
      hasAttachment: true,
      attachment: { type: "image", name: "design-preview.png" },
    }
  ];

  // Use fallback if no real messages
  const displayMessages = currentMessages.length > 0 ? currentMessages : fallbackMessages;

  return (
    <div className="flex h-full max-h-[calc(100vh-9rem)] bg-gray-900">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween" }}
            className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col h-full z-10 absolute md:relative"
          >
            {/* Team Selector */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-cyan-400">
                  {team?.TeamName || "Team Chat"}
                </h2>
                <button className="text-gray-400 hover:text-white md:hidden" onClick={() => setSidebarOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1 truncate">
                {team?.TeamDescription || "Collaborate and communicate with your team"}
              </p>
            </div>

            {/* Channel Search */}
            <div className="p-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search channels"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-1.5 px-3 pl-9 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
                <Search size={16} className="absolute left-3 top-2 text-gray-400" />
              </div>
            </div>

            {/* Channels List */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-400 text-sm uppercase font-medium">Channels</h3>
                  <button className="text-gray-400 hover:text-white p-1 rounded">
                    <Plus size={16} />
                  </button>
                </div>

                <div className="space-y-1">
                  {channels
                    .filter(channel => channel.name.includes(searchQuery.toLowerCase()))
                    .map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => handleChannelSelect(channel.name)}
                        className={`w-full flex items-center px-2 py-1.5 rounded-md text-sm ${selectedChannel === channel.name
                          ? "bg-gray-700 text-white"
                          : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                          }`}
                      >
                        <Hash size={16} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{channel.name}</span>
                        {channel.unread > 0 && (
                          <span className="ml-auto bg-cyan-500 text-gray-900 text-xs rounded-full px-1.5 py-0.5">
                            {channel.unread}
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="text-gray-400 hover:text-white mr-3 md:hidden"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="flex items-center">
                <Hash size={18} className="text-gray-400 mr-2" />
                <h2 className="text-white font-medium">{selectedChannel}</h2>
              </div>
              <p className="text-xs text-gray-400">
                {channels.find(c => c.name === selectedChannel)?.description ||
                  `This is the start of the #${selectedChannel} channel`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <Search size={18} />
            </button>
            <button className="text-gray-400 hover:text-white relative">
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-gray-900">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader size={24} className="animate-spin text-cyan-400" />
            </div>
          ) : displayMessages.length > 0 ? (
            displayMessages.map((msg, index) => (
              <div key={msg.id || index} className="flex items-start gap-3 group">
                <div className="flex-shrink-0 relative">
                  <img
                    src={msg.userId?.profilePicture || "https://avatar.iran.liara.run/username?username=Unknown+User"}
                    alt={msg.userId?.name || "Unknown User"}
                    className="w-8 h-8 rounded-full bg-gray-700"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-gray-900 ${msg.status === "online" ? "bg-green-500" : "bg-gray-500"
                      }`}
                  ></span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      {msg.userId?.name || "Unknown User"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <p className="text-gray-300 mt-1">{msg.message}</p>

                  {msg.hasAttachment && (
                    <div className="mt-2 inline-block bg-gray-800 border border-gray-700 rounded-md p-2 max-w-xs">
                      {msg.attachment?.type === "image" ? (
                        <div className="relative">
                          <img
                            src="https://placehold.co/200x150"
                            alt={msg.attachment.name}
                            className="rounded w-full max-h-32 object-cover"
                          />
                          <div className="absolute inset-0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <button className="bg-gray-900/80 text-white rounded-full p-1">
                              <Image size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <File size={20} className="text-gray-400" />
                          <span className="text-sm text-gray-300">{msg.attachment?.name || "Document"}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {msg.reactions.map((reaction, i) => (
                        <button
                          key={i}
                          className="inline-flex items-center px-2 py-0.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm"
                        >
                          <span className="mr-1">{reaction}</span>
                          <span className="text-xs text-gray-400">1</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageSquare size={48} className="mb-3 opacity-30" />
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Be the first to send a message in #{selectedChannel}</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-3 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center p-1 space-x-2 bg-gray-700 rounded-lg">
            <button
              className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-600"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={20} />
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => console.log("File selected:", e.target.files)}
              />
            </button>

            <input
              type="text"
              placeholder={`Message #${selectedChannel}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1 bg-transparent border-none outline-none p-2 text-white"
            />

            <button className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-600">
              <Smile size={20} />
            </button>

            <button
              className="p-2 text-white rounded-md bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50"
              disabled={!message.trim()}
              onClick={sendMessage}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;