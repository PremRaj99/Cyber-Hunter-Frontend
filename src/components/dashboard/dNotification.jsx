import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationItem from "./dNotificationItem";

const DNotification = () => {
  const defaultNotifications = [
    { id: 1, message: "Your Notification", time: "2024-11-25 10:30 AM" },
    { id: 2, message: "Your Notification1", time: "2024-11-25 3:00 PM" },
    { id: 3, message: "Your Notification2", time: "2024-11-24 8:00 PM" },
    { id: 4, message: "Your Notification3", time: "2024-11-24 8:00 PM" },
    { id: 5, message: "Your Notification4", time: "2024-11-24 8:00 PM" },
    { id: 6, message: "Your Notification5", time: "2024-11-24 8:00 PM" },
    { id: 7, message: "Your Notification6", time: "2024-11-24 8:00 PM" },
    { id: 8, message: "Your Notification7", time: "2024-11-24 8:00 PM" },
    { id: 9, message: "Your Notification8", time: "2024-11-24 8:00 PM" },
    { id: 10, message: "Your Notification9", time: "2024-11-24 8:00 PM" },
    { id: 11, message: "Your Notification0", time: "2024-11-24 8:00 PM" },
    { id: 12, message: "Your Notification1", time: "2024-11-24 8:00 PM" },
  ];

  const [noteList, setNoteList] = useState(defaultNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="dNotification mt-2 h-full  grid grid-cols-[1fr_0.01fr_3.3fr] gap-4"
    >
      <div className="dNotList">
        <motion.h4
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-extrabold text-cyan-400 mb-4 uppercase text-base"
        >
          Notifications
        </motion.h4>
        <motion.ul variants={containerVariants} className="w-full flex flex-col gap-4 overflow-y-auto">
          <AnimatePresence>
            {noteList.map((notification) => (
              <motion.li
                key={notification.id}
                variants={itemVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                className="p-4 bg-gray-800 rounded-2xl cursor-pointer bg-white py-2 px-4"
              >
                <NotificationItem
                  notification={notification}
                  onclick={() => handleNotificationClick(notification)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
      <div className="ddivider"></div>
      <motion.div
        className="dmessage m-4 bg-white p-6 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {selectedNotification ? (
            <motion.p
              key="selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-base text-black-400"
            >
              {selectedNotification.message}
            </motion.p>
          ) : (
            <motion.p
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-base text-black-400"
            >
              Select a notification to view details
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DNotification;
