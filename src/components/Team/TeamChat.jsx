import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle, Send, Smile, Paperclip, Search, Menu, Plus, Hash,
  Image, File, Loader, X, MoreHorizontal, MessageSquare, Bell
} from "lucide-react";

const TeamChat = () => {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Enhanced sample data
  const channels = [
    { id: 1, name: "general", unread: 3, isActive: true },
    { id: 2, name: "design-team", unread: 0, isActive: false },
    { id: 3, name: "development", unread: 5, isActive: true },
    { id: 4, name: "marketing", unread: 0, isActive: false },
  ];

  const messages = [
    {
      id: 1,
      user: "Sarah Parker",
      avatar: "/api/placeholder/32/32",
      message: "Hey team! I just pushed the latest design updates to Figma.",
      time: "10:30 AM",
      status: "online",
      reactions: ["👍", "🎨"],
      hasAttachment: false,
    },
    {
      id: 2,
      user: "Mike Johnson",
      avatar: "/api/placeholder/32/32",
      message: "Great work! I'll review it right away. Anyone else available for a quick feedback session?",
      time: "10:32 AM",
      status: "offline",
      reactions: [],
      hasAttachment: true,
      attachment: { type: "image", name: "design-preview.png" },
    },
    {
      id: 3,
      user: "Emily Chen",
      avatar: "/api/placeholder/32/32",
      message: "I'd be happy to join! Are we meeting in the usual Zoom room?",
      time: "10:35 AM",
      status: "online",
      reactions: ["👍"],
      hasAttachment: false,
    },
    {
      id: 4,
      user: "David Kim",
      avatar: "/api/placeholder/32/32",
      message: "Just wrapped up my current task. I can provide feedback in about 15 minutes if that works?",
      time: "10:40 AM",
      status: "online",
      reactions: [],
      hasAttachment: false,
    }
  ];

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
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto close sidebar when selecting a channel on mobile
  const handleChannelSelect = (channelName) => {
    setSelectedChannel(channelName);
    if (windowWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const sidebarVariants = {
    open: { width: "16rem", opacity: 1 },
    closed: { width: "0", opacity: 0 },
  };

  const messageVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message handling logic here
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Added emoji picker component
  const EmojiPicker = () => {
    const emojis = ["😊", "👍", "🎉", "❤️", "🔥", "😂", "🙌", "👏", "🤔", "👀"];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute bottom-16 right-16 bg-gray-700 p-2 rounded-lg shadow-lg grid grid-cols-5 gap-2"
      >
        {emojis.map((emoji, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-xl p-2 hover:bg-gray-600 rounded"
            onClick={() => {
              setMessage(prev => prev + emoji);
              setShowEmojiPicker(false);
            }}
          >
            {emoji}
          </motion.button>
        ))}
      </motion.div>
    );
  };

  // Added notifications component
  const Notifications = () => {
    const notificationData = [
      { id: 1, user: "Sarah Parker", action: "mentioned you", time: "5m ago", read: false },
      { id: 2, user: "Emily Chen", action: "shared a file", time: "30m ago", read: false },
      { id: 3, user: "Design Team", action: "meeting reminder", time: "1h ago", read: true },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute top-16 right-4 bg-gray-700 p-2 rounded-lg shadow-lg w-64"
      >
        <h3 className="text-white font-medium p-2 border-b border-gray-600">Notifications</h3>
        <div className="max-h-64 overflow-y-auto">
          {notificationData.map(notification => (
            <motion.div
              key={notification.id}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className={`p-2 rounded-lg mb-1 ${!notification.read ? "bg-gray-600 bg-opacity-30" : ""}`}
            >
              <div className="flex items-start">
                <UserCircle size={16} className="text-brandPrimary mt-1 mr-2" />
                <div>
                  <p className="text-sm text-white">
                    <span className="font-medium">{notification.user}</span> {notification.action}
                  </p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <button className="w-full text-center text-brandPrimary text-sm p-2 hover:underline">
          See all notifications
        </button>
      </motion.div>
    );
  };

  return (
    <div className="w-full ">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center  z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="w-8 h-8 text-brandPrimary" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex h-[calc(100vh-6rem)]"
          >
            {/* Enhanced Sidebar */}
            <motion.div
              initial={false}
              animate={{
                width: isSidebarOpen ? (windowWidth < 768 ? "100%" : "16rem") : "0",
                opacity: isSidebarOpen ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`
                fixed md:relative
                h-full
                bg-gray-900
                border-r border-gray-700
                overflow-hidden
                z-40
                ${windowWidth < 768 ? (isSidebarOpen ? 'w-full' : 'w-0') : ''}
              `}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <motion.h1
                    className="text-xl font-bold text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    Team Chat
                  </motion.h1>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-400 hover:text-brandPrimary"
                      onClick={() => setNotifications(prev => !prev)}
                    >
                      <Bell size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-400 hover:text-brandPrimary"
                    >
                      <Plus size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced Channels */}
                <div className="mb-6">
                  <h2 className="text-gray-400 text-sm font-medium mb-2 flex items-center">
                    Channels
                    <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded-full">
                      {channels.length}
                    </span>
                  </h2>
                  {channels.map((channel) => (
                    <motion.div
                      key={channel.id}
                      variants={messageVariants}
                      whileHover={{ x: 5 }}
                      className={`flex items-center p-2 rounded-lg cursor-pointer group
                        ${selectedChannel === channel.name ? 'bg-brandPrimary bg-opacity-20' : 'hover:bg-gray-700'}`}
                      onClick={() => handleChannelSelect(channel.name)}
                    >
                      <Hash
                        size={18}
                        className={`${selectedChannel === channel.name ? 'text-cyan-400' : 'text-gray-400'} 
                          group-hover:text-cyan-400`}
                      />
                      <span className={`ml-2 ${selectedChannel === channel.name ? 'text-cyan-400' : 'text-white'} 
                        group-hover:text-white`}>
                        {channel.name}
                      </span>
                      {channel.unread > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto bg-brandPrimary text-xs px-2 py-1 rounded-full"
                        >
                          {channel.unread}
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Online Members */}
                <div>
                  <h2 className="text-gray-400 text-sm font-medium mb-2">Online</h2>
                  <div className="space-y-2">
                    {["Sarah Parker", "Emily Chen", "David Kim"].map((name, index) => (
                      <motion.div
                        key={index}
                        variants={messageVariants}
                        whileHover={{ x: 5 }}
                        className="flex items-center p-2 rounded-lg hover:bg-gray-700 cursor-pointer group"
                      >
                        <div className="relative">
                          <UserCircle size={20} className="text-gray-400 group-hover:text-cyan-400" />
                          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="ml-2 text-white group-hover:text-white">{name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Enhanced Header */}
              <div className="p-4 flex items-center justify-between border-b border-gray-700 0">
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="mr-4 text-gray-400 hover:text-brandPrimary"
                  >
                    <Menu size={20} />
                  </motion.button>
                  <div className="flex items-center">
                    <h2 className="text-brandPrimary font-medium">#{selectedChannel}</h2>
                    <span className="ml-2 text-gray-400 text-sm">3 online</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative hidden md:block">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages..."
                      className="bg-transparent border border-brandPrimary text-gray-200 px-4 py-2 placeholder:text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-brandPrimary w-64"
                    />
                    <Search size={16} className="absolute left-3 top-3 text-white" />
                    {searchQuery && (
                      <X
                        size={16}
                        className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-200"
                        onClick={() => setSearchQuery("")}
                      />
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-brandPrimary md:hidden">
                    <Search size={20} />
                  </button>
                </div>
              </div>

              {/* Enhanced Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    variants={messageVariants}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start space-x-4 hover:bg-gray-800 p-3 rounded-lg transition-colors group"
                  >
                    <div className="relative">
                      <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full" />
                      <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full 
                        ${msg.status === "online" ? "bg-green-500" : "bg-gray-500"}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-white">{msg.user}</span>
                        <span className="ml-2 text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-white">{msg.message}</p>
                      {msg.hasAttachment && (
                        <div className="mt-2 p-2 bg-gray-800 rounded-lg flex items-center gap-2">
                          <Image size={16} className="text-brandPrimary" />
                          <span className="text-sm text-white">{msg.attachment.name}</span>
                        </div>
                      )}
                      {msg.reactions.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {msg.reactions.map((reaction, index) => (
                            <span key={index} className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                              {reaction}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="flex gap-2"
                    >
                      <button className="text-gray-400 hover:text-brandPrimary">
                        <MessageSquare size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-brandPrimary">
                        <MoreHorizontal size={16} />
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-700 relative">
                <div className="flex items-center space-x-4">
                  <input type="file" ref={fileInputRef} className="hidden" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleFileUpload}
                    className="text-brandPrimary hover:text-brandPrimary"
                  >
                    <Paperclip size={20} />
                  </motion.button>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                    className="flex-1 bg-gray-900 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-0 resize-none border-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-400 hover:text-brandPrimary"
                  >
                    <Smile size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSendMessage}
                    className="bg-brandPrimary text-white p-2 rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
                <AnimatePresence>
                  {showEmojiPicker && <EmojiPicker />}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Panel */}
      <AnimatePresence>
        {notifications.length > 0 && <Notifications />}
      </AnimatePresence>
    </div>
  );
};

export default TeamChat;