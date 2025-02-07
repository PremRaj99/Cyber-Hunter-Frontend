
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const dPersonal = () => {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (



    <motion.div
      className="className='dTeam w-full text-center'"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='text-cyan-400 font-bold text-[1.5rem] underline tracking-wide md:tracking-wider text-center'
      >
        PERSONAL
      </motion.h2>

      <motion.ul className="flex flex-wrap justify-center gap-16 p-6">
        {[
          {
            icon: <AddCircleRoundedIcon />,
            text: "ADD PROJECT",
            path: "/dashboard/profile/addprojects",
          },
          {
            icon: <VisibilityOutlinedIcon />,
            text: "VIEW PROJECT",
            path: "/dashboard/profile/viewProject",
          },
          {
            icon: <VerifiedOutlinedIcon style={{ color: "#06db62" }} />,
            text: "VERIFY ACHIEVEMENT",
            path: "/dashboard/profile/personalachivement",
          },
          {
            icon: <ChatBubbleIcon />,
            text: "COMMENT",
            path: "/comment",
          },
          {
            icon: <SettingsIcon />,
            text: "PERSONAL MANAGEMENT",
            path: "/teamManagement",
          },
        ].map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-8 border-4 border-dashed border-black rounded-2xl md:min-w-[36%] min-w-[100%] md:max-w-[90%] z-10"
          >
            <Link to={item.path} className="flex items-center font-semibold text-[1.2rem] text-white">
              {item.icon}
              {item.text}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>


  )
}

export default dPersonal